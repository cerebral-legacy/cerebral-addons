import unsetCompiler from 'cerebral-url-scheme-compiler/get'

export default function (path) {
  const unsetValue = unsetCompiler(path, 'unset')

  const unset = function unset (args) {
    unsetValue(args)
  }

  unset.displayName = `unset(${JSON.stringify(path)})`

  return unset
}
