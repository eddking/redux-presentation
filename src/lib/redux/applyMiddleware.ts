import { Action, Middleware, StoreEnhancer, DispatchFunction } from './interface';

// A limited implementation of function composition.
// only works with functions of type A -> A
type Func<A> = (a: A) => A;

function compose<A>(funcs: Func<A>[]): Func<A> {
  if (funcs.length === 0) {
    return (arg: any) => arg;
  }
  if (funcs.length === 1) {
    return funcs[0];
  }
  return funcs.reduce((a, b) => (c: A) => a(b(c)));
}

/*
 * This function takes a list of middlewares, and composes them into a Store Enhancer.
 * A store enhancer wraps the createStore function, and so has a chance to modify the
 * returned store. The `applyMiddleware` store enhancer, operates solely on the dispatch
 * function; each middleware is passed the dispatch function from higher up in the chain,
 * and can return a new dispatch function which wraps the old one.
 * For more information see: http://redux.js.org/docs/advanced/Middleware.html
 */
export function applyMiddleware<S, A extends Action>(
  ...middlewares: Middleware<S, A>[]
): StoreEnhancer<S, A> {
  return (createStore) => (reducer, preloadedState, enhancer) => {
    let store = createStore(reducer, preloadedState, enhancer);
    let dispatch: DispatchFunction<A> = store.dispatch;

    const middlewareAPI = {
      getState: store.getState,
      dispatch: (action: A) => dispatch(action),
    };
    let chain = middlewares.map(middleware => middleware(middlewareAPI));
    dispatch = compose(chain)(store.dispatch);

    return { ...store, dispatch };
  };
}
