import setCompiler from 'cerebral-url-scheme-compiler/set'
import toDisplayName from '../helpers/toDisplayName'

export default function (path) {
  const push = setCompiler(path, 'push')

  push.displayName = `push(${toDisplayName(path, push)})`

  return push
}
