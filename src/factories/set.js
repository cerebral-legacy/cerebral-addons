import setCompiler from '../helpers/setValue'

export default function (path, value) {
  const setValue = setCompiler(path)
  return function set (args) {
    setValue(args, value)
  }
}
