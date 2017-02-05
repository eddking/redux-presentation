import {
  Action,
  Store,
  Reducer,
  StoreEnhancer,
  StoreListener,
} from './interface';

// Action types reserved by redux. This shouldn't be referenced outside the library

/* tslint:disable:variable-name */
export const ActionTypes = {
  INIT: '@@redux/INIT',
};
/* tslint:enable:variable-name */

export function createStore<S, A extends Action>(
  reducer: Reducer<S, A>,
  preloadedState?: S,
  enhancer?: StoreEnhancer<S, A>
): Store<S, A> {
  // The original implementation of redux supports omiting the preloadedState
  // positional argument. so you can call it like: `createStore(reducer, enhancer)`
  // we don't allow that. In this case you should do: `createStore(reducer, undefined, enhancer)`

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.');
    }
    const enhancedCreateStore = enhancer(createStore);
    return enhancedCreateStore(reducer, preloadedState);
  }

  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.');
  }

  let currentReducer = reducer;
  let currentState = preloadedState;
  let currentListeners: StoreListener[] = [];
  let nextListeners = currentListeners;
  let isDispatching = false;

  // This function creates a copy of the current listeners,
  // so that when notifying listeners the current listener array
  // isn't mutated
  function ensureCanMutateNextListeners(): void {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }

  function getState(): S {
    return currentState;
  }

  function subscribe(listener: StoreListener): () => void {
    if (typeof listener !== 'function') {
      throw new Error('Expected listener to be a function.');
    }
    let isSubscribed = true;

    ensureCanMutateNextListeners();
    nextListeners.push(listener);

    return function unsubscribe(): void {
      if (!isSubscribed) {
        return;
      }
      isSubscribed = false;

      ensureCanMutateNextListeners();
      const index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
    };
  }

  function dispatch(action: A): Action {
    if (!isPlainObject(action)) {
      throw new Error(
        'Actions must be plain objects. ' +
        'Use custom middleware for async actions.'
      );
    }

    if (typeof action.type === 'undefined') {
      throw new Error(
        'Actions may not have an undefined "type" property. ' +
        'Have you misspelled a constant?'
      );
    }

    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.');
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    const listeners = currentListeners = nextListeners;
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i];
      listener();
    }
    return action;
  }

  // We dont care that the INIT action isnt going to be type safe.
  // The pattern for initialising state in reducers is to provide a default value
  // for state. the action object itself isn't utilised. If you need to react
  // to an init event, you can fire your own one after initialising the store
  dispatch({ type: ActionTypes.INIT } as A);

  // We dont need to implement the `replaceReducer` or observable functionality
  return {
    dispatch, getState, subscribe,
  };
}

/*
 * The original implementation of Redux uses an `isPlainObject` function from lodash.
 * This implementation differs from that one, in that it doesn't care about whether
 * `Symbol.toStringTag` has been monkeypatched, we're not going to do that ;)
 */
const hasOwnProperty = Object.prototype.hasOwnProperty;
const toString = Object.prototype.toString;
const funcToString = Function.prototype.toString;
const objectCtorString = funcToString.call(Object);

function isObjectLike(value: any): boolean {
  return value != null && typeof value === 'object';
}

function isPlainObject(value: any): boolean {
  if (!isObjectLike(value) || toString.call(value) !== '[object Object]') {
    return false;
  }
  const proto = Object.getPrototypeOf(value);
  if (proto === null) {
    return true;
  }
  const ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof ctor === 'function'
    && ctor instanceof ctor
    && funcToString.call(ctor) === objectCtorString;
}
