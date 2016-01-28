import getCompiler from 'cerebral-url-scheme-compiler/get'
import setCompiler from 'cerebral-url-scheme-compiler/set'

export default function (path, onValue = true, offValue = false) {
  const getValue = getCompiler(path)
  const setValue = setCompiler(path)

  const toggleWrite = (args, value, async) => {
    const response = setValue(args, value === onValue ? offValue : onValue)
    if (response && typeof response.then === 'function') {
      response.then(args.output.success).catch(args.output.error)
    } else if (async) {
      args.output.success()
    }
  }

  const toggle = function toggleRead (args) {
    let value = getValue(args)
    if (value && typeof value.then === 'function') {
      value.then(val => toggleWrite(args, val, true)).catch(args.output.error)
    } else {
      toggleWrite(args, value)
    }
  }

  return toggle
}
