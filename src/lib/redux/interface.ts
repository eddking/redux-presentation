export interface Action {
  readonly type: string;
}

export interface Store<S, A extends Action> {
  dispatch: DispatchFunction<A>;
  getState: GetStateFunction<S>;
  subscribe: (listener: StoreListener) => () => void;
}

export interface Reducer<S, A extends Action> {
  (state: S, action: A): S;
}

export type StoreListener = () => void;

export interface DispatchFunction<A extends Action> {
  (a: A): Action;
}

export interface GetStateFunction<S> {
  (): S;
}

export interface StoreCreator<S, A extends Action> {
  (reducer: Reducer<S, A>, preloadedState?: S, enhancer?: StoreEnhancer<S, A>): Store<S, A>;
}

export interface Middleware<S, A extends Action> {
  (args: MiddlewareArgs<S, A>): (a: DispatchFunction<A>) => DispatchFunction<A>;
}

export interface MiddlewareArgs<S, A extends Action> {
  getState: GetStateFunction<S>;
  dispatch: DispatchFunction<A>;
}

export interface StoreEnhancer<S, A extends Action> {
  (createStore: StoreCreator<S, A>): StoreCreator<S, A>;
}
