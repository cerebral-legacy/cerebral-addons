const truthy = Symbol('truthy')
const falsy = Symbol('falsy')
const otherwise = Symbol('otherwise')

function when (statePath, outputs = { isTrue: truthy, isFalse: otherwise }, emptyObjectsAreFalse = true) {
  let action = function when ({ state, output }) {
    let value = state.get(statePath)

    // treat objects with no keys as falsy
    if (emptyObjectsAreFalse && value && typeof value === 'object' && Object.keys(value).length === 0) {
      value = false
    }

    let otherwisePath = null
    let path = Object.keys(outputs).find(path => {
      let test = outputs[path]
      if (test === otherwise) {
        otherwisePath = path
        return false
      } else {
        return (test === value) ||
        (test === truthy && value) ||
        (test === falsy && !value)
      }
    })

    output[path || otherwisePath]()
  }

  action.outputs = Object.keys(outputs)
  return action
}

when.truthy = truthy
when.falsy = falsy
when.otherwise = otherwise

export default when
