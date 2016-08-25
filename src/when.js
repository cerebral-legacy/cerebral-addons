import getCompiler from 'cerebral-url-scheme-compiler/get'
import toDisplayName from './helpers/toDisplayName'
const truthy = Symbol('truthy')
const falsy = Symbol('falsy')
const otherwise = Symbol('otherwise')

function when (path, conditions = { 'true': truthy, 'false': otherwise }) {
  const getValue = getCompiler(path)

  // prepare the output conditions
  let otherwisePath = null
  const outputConditions = {}
  if (Array.isArray(conditions)) {
    conditions.forEach((condition) => {
      outputConditions[condition] = condition
    })
  } else {
    for (let path in conditions) {
      outputConditions[path] = conditions[path]
      otherwisePath = otherwisePath || (conditions[path] === otherwise && path)
    }
  }
  if (!otherwisePath) {
    outputConditions['otherwise'] = otherwise
    otherwisePath = 'otherwise'
  }

  // test the getter returned value
  const whenTest = (args, value) => {
    // treat objects with no keys as falsy
    if (value && typeof value === 'object' && Object.keys(value).length === 0) {
      value = false
    }

    let outputPath

    for (let path in outputConditions) {
      let test = outputConditions[path]
      if (test !== otherwise &&
        ((test === value) || (test === truthy && value) || (test === falsy && !value))) {
        outputPath = path
        break
      }
    }

    args.output[outputPath || otherwisePath]()
  }

  // define the action
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

  action.outputs = Object.keys(outputConditions)

  action.displayName = `addons.when(${toDisplayName(path, getValue)})`

  return action
}

when.truthy = truthy
when.falsy = falsy
when.otherwise = otherwise

export default when
