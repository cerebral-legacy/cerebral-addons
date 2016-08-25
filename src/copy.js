import getCompiler from 'cerebral-url-scheme-compiler/get'
import setCompiler from 'cerebral-url-scheme-compiler/set'
import toDisplayName from './helpers/toDisplayName'

export default function (fromPath, ...toPaths) {
  const getValue = getCompiler(fromPath)
  const setValues = toPaths.map((toPath) => setCompiler(toPath))

  const copyTo = (setters, args, value, async) => {
    if (setters.length === 0) {
      if (async) {
        args.output.success(value)
      }
    } else {
      const response = setters[0](args, value)
      if (response && typeof response.then === 'function') {
        response.then((val) => copyTo(setters.slice(1), args, val, true)).catch(args.output.error)
      } else {
        copyTo(setters.slice(1), args, response, async)
      }
    }
  }

  const copy = function copyFrom (args) {
    let value = getValue(args)
    if (value && typeof value.then === 'function') {
      copy.async = true
      value.then((val) => copyTo(setValues, args, val, true)).catch(args.output.error)
    } else {
      copyTo(setValues, args, value)
    }
  }

  copy.displayName = `addons.copy(${toDisplayName(fromPath, getValue)}, ${toPaths.map((path, index) =>
    toDisplayName(path, setValues[index])).join(', ')})`

  return copy
}
