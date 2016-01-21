import setCompiler from '../helpers/setValue'

export default function (path, value) {
  const setValue = setCompiler(path)

  const set = function set (args) {
    setValue(args, value)
  }

  set.displayName = `set(${JSON.stringify(path)}, ${JSON.stringify(value)})`

  return set
}
