import getCompiler from 'cerebral-url-scheme-compiler/get'
import setCompiler from 'cerebral-url-scheme-compiler/set'

export default function (parts, ...paths) {
  const getters = paths.map((path) => getCompiler(path))

  const setPath = function setPath (args, value) {
    return setCompiler(parts.reduce((prev, curr, i) => prev + getters[i - 1](args) + curr))(args, value)
  }

  setPath.displayName = `setPath\`${parts.reduce((prev, curr, i) => prev + "${'" + paths[i - 1] + "'}" + curr)}\``

  return setPath
}
