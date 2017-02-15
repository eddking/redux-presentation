import { Actions } from '../actions/actions';
import { State } from './root';

export function slide(state = 0, action: Actions): number {
  switch(action.type) {
    case 'NEXT_SLIDE':
      return state + 1;
    case 'PREVIOUS_SLIDE':
      if (state === 0) { // cant go negative
        return state;
      }
      return state - 1;
    default:
      return state;
  }
}

export const currentSlide = (state: State) => state.slide;
