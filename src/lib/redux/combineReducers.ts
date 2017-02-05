import {
  Action,
  Reducer,
} from './interface';
import { ActionTypes } from './createStore';

export type ReducerMap<T, A extends Action> = {
  [P in keyof T]: Reducer<T[P], A>;
}

function getUndefinedStateErrorMessage(key: string, action: Action): string {
  const actionType = action && action.type;
  const actionName = (actionType && `"${actionType.toString()}"`) || 'an action';

  return (
    `Given action ${actionName}, reducer "${key}" returned undefined. ` +
    `To ignore an action, you must explicitly return the previous state. ` +
    `If you want this reducer to hold no value, you can return null instead of undefined.`
  );
}

function assertReducerSanity<S, A extends Action>(reducers: ReducerMap<S, A>): void {
  for (let key in reducers) {
    let reducer = reducers[key];

    const initialState = reducer(undefined, { type: ActionTypes.INIT } as A);
    if (typeof initialState === 'undefined') {
      throw new Error(
        `Reducer "${key}" returned undefined during initialization. ` +
        `If the state passed to the reducer is undefined, you must ` +
        `explicitly return the initial state. The initial state may ` +
        `not be undefined. If you don't want to set a value for this reducer, ` +
        `you can use null instead of undefined.`
      );
    }

    const type = '@@redux/PROBE_UNKNOWN_ACTION_' +
      Math.random().toString(36).substring(7).split('').join('.');

    if (typeof reducer(undefined, { type } as A) === 'undefined') {
      throw new Error(
        `Reducer "${key}" returned undefined when probed with a random type. ` +
        `Don't try to handle ${ActionTypes.INIT} or other actions in "redux/*" ` +
        `namespace. They are considered private. Instead, you must return the ` +
        `current state for any unknown actions, unless it is undefined, ` +
        `in which case you must return the initial state, regardless of the ` +
        `action type. The initial state may not be undefined, but can be null.`
      );
    }
  }
}

export function combineReducers<S, A extends Action>(reducers: ReducerMap<S, A>): Reducer<S, A> {
  let sanityError: Error;
  try {
    assertReducerSanity(reducers);
  } catch (e) {
    sanityError = e;
  }

  return function combination(state: S = {} as S, action: A): S {
    if (sanityError) {
      throw sanityError;
    }

    let hasChanged = false;
    const nextState = {} as S;
    for (let key in reducers) {
      const reducer = reducers[key];
      const previousStateForKey = state[key];
      const nextStateForKey = reducer(previousStateForKey, action);
      if (typeof nextStateForKey === 'undefined') {
        throw new Error(getUndefinedStateErrorMessage(key, action));
      }
      nextState[key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }
    return hasChanged ? nextState : state;
  };
}
