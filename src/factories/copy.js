import getCompiler from '../helpers/getValue'
import setCompiler from '../helpers/setValue'
import toDisplayName from '../helpers/toDisplayName'

export default function (fromPath, toPath) {
  const getValue = getCompiler(fromPath)
  const setValue = setCompiler(toPath)

  const copy = function copy (args) {
    let value = getValue(args)
    setValue(args, value)
  }

  copy.displayName = `copy(${toDisplayName(fromPath, getValue)}, ${toDisplayName(toPath, setValue)})`

  return copy
}
