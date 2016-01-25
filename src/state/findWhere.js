import setCompiler from 'cerebral-url-scheme-compiler/set'
import toDisplayName from '../helpers/toDisplayName'

export default function (path, where) {
  // set compiler is more suited due to the additional param
  const getter = setCompiler(path, 'merge')
  const findWhere = args => getter(args, where)

  findWhere.displayName = `findWhere(${toDisplayName(path, getter)}, ${JSON.stringify(where)})`

  return findWhere
}
