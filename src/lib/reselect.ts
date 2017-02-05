type Dictionary<T> = { [key: string]: T; };

type TransformFunc<I extends Object, O> = (input: I) => O;

type MemoizeFunction<I, O, B extends TransformFunc<I, O>> = (func: B) => B;

export interface Selector<S, A> {
  (state: S): A;
}

export interface MemoizedSelector<S, A, T> extends Selector<S, A> {
  resultFunc: TransformFunc<T, A>;
  recomputations: () => number;
  resetRecomputations: () => void;
}

type SelectorMap<T, S> = {
  [P in keyof T]: Selector<S, T[P]>;
}

type EqualityCheck<T> = (a: T, b: T) => boolean;

function basicEqualityCheck<I>(a: I, b: I): boolean {
  return a === b;
}

function objectEqualityCheck<I>(a: I, b: I): boolean {
  let keys = Object.keys(a).concat(Object.keys(b)) as (keyof I)[];
  for (let key of keys) {
    if (a[key] !== b[key]) {
      return false;
    }
  }
  return true;
}

function listEqualityCheck<I>(a: I[], b: I[]): boolean {
  if (a.length !== b.length) {
    return false;
  }
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
}

/*
 * This memoize function only remembers the last set of arguments
 * since this is all thats needed to mitigate the main inefficiency of computing derived data
 * from the redux store
 */
function defaultMemoize<I, O>(
  func: TransformFunc<I, O>,
  equalityCheck: EqualityCheck<I>
): TransformFunc<I, O> {
  let lastInput: I = null;
  let lastResult: O = null;

  let memoizedFunc = (input: I) => {
    if (lastInput === null || !equalityCheck(input, lastInput)) {
      lastResult = func(input);
    }
    lastInput = input;
    return lastResult;
  };
  return memoizedFunc;
}

// TODO: there is some duplication between:
// createSelector, createListSelector, createMapSelector
// see if it can be pulled out

export function createSelector<T, S, O>(
  dependency: Selector<S, T>,
  transform: TransformFunc<T, O>
): MemoizedSelector<S, O, T> {
  let recomputations = 0;

  const memoizedResultFunc = defaultMemoize(
    (input: T) => {
      recomputations++;
      return transform(input);
    },
    basicEqualityCheck
  );
  const selector = ((state: S) => {
    return memoizedResultFunc(dependency(state));
  }) as MemoizedSelector<S, O, T>;

  selector.resultFunc = transform;
  selector.recomputations = () => recomputations;
  selector.resetRecomputations = () => { recomputations = 0; };
  return selector;
}

export function createMapSelector<T, S, O>(
  dependencies: SelectorMap<T, S>,
  transform: TransformFunc<T, O>
): MemoizedSelector<S, O, T> {
  let recomputations = 0;

  const memoizedResultFunc = defaultMemoize(
    (input: T) => {
      recomputations++;
      return transform(input);
    },
    objectEqualityCheck
  );

  const selector = ((state: S) => {
    let input: T = {} as T;
    for (let key in dependencies) {
      input[key] = dependencies[key](state);
    }
    return memoizedResultFunc(input);
  }) as MemoizedSelector<S, O, T>;

  selector.resultFunc = transform;
  selector.recomputations = () => recomputations;
  selector.resetRecomputations = () => { recomputations = 0; };
  return selector;
}

export function createListSelector<T, S, O>(
  dependencies: Selector<S, T>[],
  transform: TransformFunc<T[], O>
): MemoizedSelector<S, O, T[]> {
  let recomputations = 0;

  const memoizedResultFunc = defaultMemoize(
    (input: T[]) => {
      recomputations++;
      return transform(input);
    },
    listEqualityCheck
  );

  const selector = ((state: S) => {
    let input = dependencies.map((dep) => dep(state));
    return memoizedResultFunc(input);
  }) as MemoizedSelector<S, O, T[]>;

  selector.resultFunc = transform;
  selector.recomputations = () => recomputations;
  selector.resetRecomputations = () => { recomputations = 0; };
  return selector;
}

/*
 * Takes a dictionary selector and a transform function,
 * returns a selector which uses the transform function on every key
 * of the dictionary. But is careful only to re-compute the transform
 * function if the value under that key has changed
 */
export function createDictionarySelector<S, T, O>(
  map: Selector<S, Dictionary<T>>,
  transform: TransformFunc<T, O>
): Selector<S, Dictionary<O>> {
  let selectorCache: Dictionary<Selector<S, O>> = {};
  let lastResult: Dictionary<O> = null;
  let lastMap: Dictionary<T> = null;
  return (state: S) => {
    let mapVal = map(state);
    // If the map didnt change then we dont
    // need to reconstruct the map, exit early
    if (lastMap === mapVal && lastMap !== null) {
      return lastResult;
    }
    let result: Dictionary<O> = {};
    // create a selector for each key of the map
    // then if only one element changes, we only re-calculate
    // the transform for that element.
    for (let key in mapVal) {
      if (!selectorCache[key]) {
        selectorCache[key] = createSelector(
          (s: S) => map(s)[key],
          transform
        );
      }
      result[key] = selectorCache[key](state);
    }
    lastMap = mapVal;
    lastResult = result;
    return result;
  };
}

/*
 * Takes an index selector and a map selector, returns a selector that accesses
 * the map selector for every value in the index selector
 */
export function materialize<S, T>(
  indexSelector: Selector<S, string[]>,
  mapSelector: Selector<S, Dictionary<T>>
): Selector<S, T[]> {
  return createMapSelector({ index: indexSelector, map: mapSelector }, ({ index, map }) => {
    let result: T[] = [];
    for (let key of index) {
      result.push(map[key]);
    }
    return result;
  });
}

// Turns a selector of a selector of T into a selector of T
export function lift<S, T>(selector: Selector<S, Selector<S, T>>): Selector<S, T> {
  return (state: S) => selector(state)(state);
}

// Turns a selector of a list of selectors of T into a selector of list of T
export function liftList<S, T>(selector: Selector<S, Selector<S, T>[]>): Selector<S, T[]> {
  return (state: S) => selector(state).map((select) => select(state));
}

// Turns a selector of a dictionary of selectors of T into a selector of dictionary of T
export function liftMap<S, T>(selector: Selector<S, SelectorMap<T, S>>): Selector<S, T> {
  return (state: S) => {
    let selectorMap = selector(state);
    let result = {} as T;
    for (let key in selectorMap) {
      result[key] = selectorMap[key](state);
    }
    return result;
  };
}
