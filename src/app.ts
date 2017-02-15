import { createStore, applyMiddleware, Action, combineReducers } from './lib/redux';
import * as React from 'react';
import * as ReactDOM from "react-dom";
import { Root } from "./containers/root";
import { rootSaga } from "./sagas/root";
import { State, rootReducer } from './reducers/root';
import { Actions } from './actions/actions';

require('./styles/css-reset.scss');
require('./styles/main.scss');

import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();

const store = createStore<State, Actions>(
  rootReducer,
  undefined,
  applyMiddleware<State, Action>(sagaMiddleware as any)
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  Root(store),
  document.getElementById("root")
);

if (module.hot) {
    module.hot.accept();
}
