import getCompiler from 'cerebral-url-scheme-compiler/get'
import toDisplayName from '../helpers/toDisplayName'

export default function (path, where) {
  // set compiler is more suited due to the additional param
  const getter = getCompiler(path, 'findWhere')
  const findWhere = args => getter(args, where)

  findWhere.displayName = `findWhere(${toDisplayName(path, getter)}, ${JSON.stringify(where)})`

  return findWhere
}
