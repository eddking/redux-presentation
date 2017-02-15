
// This is a subset of redux we didnt port to typescript.
// react-redux fails unless we provide it
// Though it isnt used directly

function bindActionCreator(actionCreator: (...args: any[]) => any, dispatch: (action: any) => void) {
  return (...args: any[]) => dispatch(actionCreator(...args))
}

export default function bindActionCreators(actionCreators: any, dispatch: any) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch)
  }

  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error(
      `bindActionCreators expected an object or a function, instead received ${actionCreators === null ? 'null' : typeof actionCreators}. ` +
      `Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?`
    )
  }

  const keys = Object.keys(actionCreators)
  const boundActionCreators = {}
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    const actionCreator = actionCreators[key]
    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch)
    }
  }
  return boundActionCreators
}
