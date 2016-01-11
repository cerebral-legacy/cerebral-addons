import getCompiler from '../helpers/getValue'
const truthy = Symbol('truthy')
const falsy = Symbol('falsy')
const otherwise = Symbol('otherwise')

function when (path, outputs = { isTrue: truthy, isFalse: otherwise }, emptyObjectsAreFalse = true) {
  const getValue = getCompiler(path)
  let action = function when (args) {
    let value = getValue(args)

    // treat objects with no keys as falsy
    if (emptyObjectsAreFalse && value && typeof value === 'object' && Object.keys(value).length === 0) {
      value = false
    }

    let otherwisePath = null
    let outputPath = Object.keys(outputs).find(path => {
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

    args.output[outputPath || otherwisePath]()
  }

  action.outputs = Object.keys(outputs)
  return action
}

when.truthy = truthy
when.falsy = falsy
when.otherwise = otherwise

export default when
