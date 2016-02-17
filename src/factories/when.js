import getCompiler from 'cerebral-url-scheme-compiler/get'
import toDisplayName from '../helpers/toDisplayName'
const truthy = Symbol('truthy')
const falsy = Symbol('falsy')
const otherwise = Symbol('otherwise')

function when (path, conditions = { 'true': truthy, 'false': otherwise }) {
  const getValue = getCompiler(path)

  const whenTest = (args, value) => {
    // treat objects with no keys as falsy
    if (value && typeof value === 'object' && Object.keys(value).length === 0) {
      value = false
    }

    let otherwisePath = null
    let outputPath
    let test

    for (let path in conditions) {
      test = conditions[path]
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

  let action = function whenRead (args) {
    let value = getValue(args)
    if (value && typeof value.then === 'function') {
      value.then((val) => whenTest(args, val)).catch((error) => {
        console.error(`${action.displayName} caught an error whilst getting a value to test`, error)
      })
    } else {
      whenTest(args, value)
    }
  }

  action.outputs = Object.keys(conditions)

  action.displayName = `addons.when(${toDisplayName(path, getValue)})`

  return action
}

when.truthy = truthy
when.falsy = falsy
when.otherwise = otherwise

export default when
