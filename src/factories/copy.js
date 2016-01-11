import getCompiler from '../helpers/getValue'
import setCompiler from '../helpers/setValue'

export default function (fromPath, toPath) {
  const getValue = getCompiler(fromPath)
  const setValue = setCompiler(toPath)
  return function copy (args) {
    let value = getValue(args)
    setValue(args, value)
  }
}
