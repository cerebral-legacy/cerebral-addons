import setCompiler from 'cerebral-url-scheme-compiler/set'

export default function (path) {
  const unshift = setCompiler(path, 'unshift')

  unshift.displayName = `unshift`

  return unshift
}
