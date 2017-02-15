import { Action } from '../lib/redux';

// Action types

interface NextSlide extends Action {
  type: 'NEXT_SLIDE';
}

interface PreviousSlide extends Action {
  type: 'PREVIOUS_SLIDE';
}

interface Click extends Action {
  type: 'CLICK';
}

// Action Creators

export function nextSlide(): NextSlide {
  return {
    type: 'NEXT_SLIDE',
  };
}

export function previousSlide(): PreviousSlide {
  return {
    type: 'PREVIOUS_SLIDE',
  };
}

export function click(): Click {
  return {
    type: 'CLICK',
  };
}

export type Actions = Click | NextSlide | PreviousSlide;
