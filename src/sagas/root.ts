import { take, call, put, select } from 'redux-saga/effects'
import { takeEvery, takeLatest, delay } from 'redux-saga';

export function* rootSaga() {
  while(true) {
    let action = yield take('*');
    console.log(action, yield select());
  }
}
