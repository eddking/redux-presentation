import { createStore, applyMiddleware, Action, combineReducers } from './lib/redux';
import { take, call, put } from 'redux-saga/effects'
import { takeEvery, takeLatest, delay } from 'redux-saga';
import * as React from 'react';
import * as ReactDOM from "react-dom";
import { Root } from "./containers/root";

import createSagaMiddleware from 'redux-saga';

interface TestAction extends Action {
  type: 'TEST_ACTION',
}

interface Tick extends Action {
  type: 'TICK',
}

type Actions = TestAction | Tick; 

interface State {
  test: boolean;
  counter: number;
}

const sagaMiddleware = createSagaMiddleware();

function testReducer(state = false, action: Actions) {
  switch(action.type) {
    case 'TEST_ACTION':
      return true;
    default:
      return state;
  }
}

function tickCounter(state = 0, action: Actions) {
  switch(action.type) {
    case 'TICK':
      return state + 1;
    default:
      return state;
  }
}

const store = createStore<State, Actions>(
  combineReducers<State, Actions>({
    test: testReducer,
    counter: tickCounter,
  }),
  undefined,
  applyMiddleware<State, Action>(sagaMiddleware as any)
);

function* mySaga() {
  let action = yield take('TEST_ACTION');
  console.log('saga captured action', action);

  while(true) {
    yield delay(1000);
    yield put({ type: 'TICK' });
    console.log('tick: ', store.getState());
  }
}

sagaMiddleware.run(mySaga);

console.log('state: ', store.getState());

store.dispatch({ type: 'TEST_ACTION' });

console.log('state: ', store.getState());

ReactDOM.render(
  Root(),
  document.getElementById("root")
);
