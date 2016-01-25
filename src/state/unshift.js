import setCompiler from 'cerebral-url-scheme-compiler/set'
import toDisplayName from '../helpers/toDisplayName'

export default function (path) {
  const unshift = setCompiler(path, 'unshift')

  unshift.displayName = `unshift(${toDisplayName(path, unshift)})`

  return unshift
}
