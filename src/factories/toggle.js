import getCompiler from '../helpers/getValue'
import setCompiler from '../helpers/setValue'
import toDisplayName from '../helpers/toDisplayName'

export default function (path, onValue = true, offValue = false) {
  const getValue = getCompiler(path)
  const setValue = setCompiler(path)

  const toggle = function toggle (args) {
    let value = getValue(args)
    setValue(args, value === onValue ? offValue : onValue)
  }

  toggle.displayName = `toggle(${toDisplayName(path, getValue)})`

  return toggle
}
