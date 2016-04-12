import getCompiler from 'cerebral-url-scheme-compiler/get'

export default function (parts, ...paths) {
  const getters = paths.map((path) => getCompiler(path))

  const getPath = function getPath (args) {
    return getCompiler(parts.reduce((prev, curr, i) => prev + getters[i - 1](args) + curr))(args)
  }

  getPath.displayName = `getPath\`${parts.reduce((prev, curr, i) => prev + "${'" + paths[i - 1] + "'}" + curr)}\``

  return getPath
}
