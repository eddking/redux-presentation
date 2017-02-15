import { createStore, combineReducers } from '../../lib/redux';

interface AddTodo {
  type: 'ADD_TODO';
  id: string;
  message: string;
}

interface ToggleTodo {
  type: 'TOGGLE_TODO';
  id: string;
}

const exampleAction =

// begin:actionExample
{
  type: 'ADD_TODO',
  message: "do a thing",
  id: '1'
};
// end:actionExample

// begin:actionCreator
let currId = 0;

function addTodo(message: string): AddTodo {
  currId += 1;
  return {
    type: 'ADD_TODO',
    message: message,
    id: `${currId}`,
  };
}
// end:actionCreator

type Dictionary<T> = { [key: string]: T; };

type Reducer<S, A> =
  // begin:reducertype
  (state: S, action: A) => S
  // end:reducertype

type Actions = AddTodo | ToggleTodo;

interface Todo {
  message: string;
  id: string;
  done: boolean;
}

interface TodoState {
  [key: string]: Todo
}

// begin:todoReducer
function todoReducer(
  state = {},
  action: Actions
): TodoState {
  switch(action.type) {
    case 'ADD_TODO':
      return {
          ...state,
        [action.id]: {
          id: action.id,
          message: action.message,
          done: false,
        }
      };
    default:
      return state;
  }
}
// end:todoReducer

// begin:todoListReducer
type TodoListState = string[];

function todoListReducer(
  state: string[] = [],
  action: Actions
): TodoListState {
  switch(action.type) {
    case 'ADD_TODO':
      return [...state, action.id]
    default:
      return state;
  }
}
// end:todoListReducer

// just to shut up the type checker
// I dont want to use the actual types, a simplified version is sufficient
type Store<S,A> = {};
type Middleware = {};

/*
// begin:createStoreType
function createStore<S, A>(
  reducer: Reducer<S,A>,
  initialState?: S,
  middleware?: Middleware
): Store<S,A> {
// end:createStoreType
  return null;
}
*/

// begin:store
interface State {
  todos: TodoState;
  todoList: TodoListState;
}

const store = createStore<State, Actions>(
  combineReducers({
    todos: todoReducer,
    todoList: todoListReducer,
  })
)
// end:store


// begin:dispatch
store.subscribe(() => {
  console.log(store.getState())
});

store.dispatch(addTodo('Write Tests!'));
// end:dispatch

type FetchData = { type: 'FETCH', payload: any }
const Api: any = null;

// begin:saga-example
import { call, put } from 'redux-saga/effects'

export function* fetchData(action: FetchData) {
  try {
    const data = yield call(
      Api.fetchUser,
      action.payload.url
    )
    yield put({type: "FETCH_SUCCEEDED", data})
  } catch (error) {
    yield put({type: "FETCH_FAILED", error})
  }
}
// end:saga-example

/*
// begin:selector-example
const shopItems = state => state.shop.items
const taxPercent = state => state.shop.taxPercent

const subtotal= selector(
  shopItems,
  items => items.reduce(
    (acc, item) => acc + item.value,
    0
  )
)

const tax = selector(
  subtotal,
  taxPercent,
  (sub, taxPercent) => subtotal * (taxPercent / 100)
)

export const total = selector(
  subtotal,
  tax,
  (subtotal, tax) => ({ total: subtotal + tax })
)
// end:selector-example
*/
