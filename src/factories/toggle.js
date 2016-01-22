import getCompiler from '../helpers/getValue'
import setCompiler from '../helpers/setValue'
import toDisplayName from '../helpers/toDisplayName'

export default function (path, onValue = true, offValue = false) {
  const getValue = getCompiler(path)
  const setValue = setCompiler(path)

  const toggleWrite = (args, value) => {
    const response = setValue(args, value === onValue ? offValue : onValue)
    if (response && response.then) {
      response.then(args.output.success).catch(args.output.error)
    }
  }

  const toggle = function toggleRead (args) {
    let value = getValue(args)
    if (value && value.then === 'function') {
      value.then(val => toggleWrite(args, val)).catch(args.output.error)
    } else {
      toggleWrite(args, value)
    }
  }

  toggle.displayName = `toggle(${toDisplayName(path, getValue)})`

  return toggle
}
