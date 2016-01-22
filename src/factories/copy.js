import getCompiler from '../helpers/getValue'
import setCompiler from '../helpers/setValue'
import toDisplayName from '../helpers/toDisplayName'

export default function (fromPath, toPath) {
  const getValue = getCompiler(fromPath)
  const setValue = setCompiler(toPath)

  const copyTo = (args, value) => {
    const response = setValue(args, value)
    if (response && response.then) {
      response.then(args.output.success).catch(args.output.error)
    }
  }

  const copy = function copyFrom (args) {
    let value = getValue(args)
    if (value && value.then === 'function') {
      value.then(val => copyTo(args, val)).catch(args.output.error)
    } else {
      copyTo(args, value)
    }
  }

  copy.displayName = `copy(${toDisplayName(fromPath, getValue)}, ${toDisplayName(toPath, setValue)})`

  return copy
}
