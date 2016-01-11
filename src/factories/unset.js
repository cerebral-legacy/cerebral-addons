import unsetCompiler from '../helpers/getValue'

export default function (path) {
  const unsetValue = unsetCompiler(path, 'unset')
  return function unset (args) {
    unsetValue(args)
  }
}
