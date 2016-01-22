import setCompiler from '../helpers/setValue'
import toDisplayName from '../helpers/toDisplayName'

export default function (path, value) {
  const setValue = setCompiler(path)

  const set = function set (args) {
    setValue(args, value)
  }

  set.displayName = `set(${toDisplayName(path, setValue)}, ${JSON.stringify(value)})`

  return set
}
