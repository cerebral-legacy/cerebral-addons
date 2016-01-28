import setCompiler from 'cerebral-url-scheme-compiler/set'

export default function (path) {
  const push = setCompiler(path, 'push')

  push.displayName = `push`

  return push
}
