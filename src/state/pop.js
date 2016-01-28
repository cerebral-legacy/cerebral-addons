import getCompiler from 'cerebral-url-scheme-compiler/get'

export default function (path) {
  const pop = getCompiler(path, 'pop')

  pop.displayName = `pop`

  return pop
}
