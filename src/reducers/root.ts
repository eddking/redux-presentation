import { slide } from './slide';
import { combineReducers } from '../lib/redux';
import { Actions } from '../actions/actions';

export interface State {
  slide: number;
}

export const rootReducer = combineReducers<State, Actions>({
  slide: slide,
});
