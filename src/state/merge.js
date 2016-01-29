import setCompiler from 'cerebral-url-scheme-compiler/set'
import toDisplayName from '../helpers/toDisplayName'

export default function (path) {
  const merge = setCompiler(path, 'merge')

  merge.displayName = `merge(${toDisplayName(path, merge)})`

  return merge
}
