import getCompiler from 'cerebral-url-scheme-compiler/get'
import toDisplayName from '../helpers/toDisplayName'

export default function (path) {
  const pop = getCompiler(path, 'pop')

  pop.displayName = `pop(${toDisplayName(path, pop)})`

  return pop
}
