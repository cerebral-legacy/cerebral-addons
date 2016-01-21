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
    let outputPath
    let test

    for (let path in outputs) {
      test = outputs[path]
      if (test === otherwise) {
        otherwisePath = path
      } else {
        if ((test === value) ||
            (test === truthy && value) ||
            (test === falsy && !value)) {
          outputPath = path
          break
        }
      }
    }

    args.output[outputPath || otherwisePath]()
  }

  action.outputs = Object.keys(outputs)

  action.displayName = `when(${JSON.stringify(path)})`

  return action
}

when.truthy = truthy
when.falsy = falsy
when.otherwise = otherwise

export default when
