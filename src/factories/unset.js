import unsetCompiler from '../helpers/getValue'

export default function (path) {
  const unsetValue = unsetCompiler(path, 'unset')

  const unset = function unset (args) {
    unsetValue(args)
  }

  unset.displayName = `unset(${JSON.stringify(path)})`

  return unset
}
