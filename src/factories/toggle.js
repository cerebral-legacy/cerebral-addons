import getCompiler from '../helpers/getValue'
import setCompiler from '../helpers/setValue'

export default function (path, onValue = true, offValue = false) {
  const getValue = getCompiler(path)
  const setValue = setCompiler(path)
  return function toggle (args) {
    let value = getValue(args)
    setValue(args, value === onValue ? offValue : onValue)
  }
}
