import getCompiler from 'cerebral-url-scheme-compiler/get'

export default function (path) {
  const get = getCompiler(path)

  get.displayName = `get(${path})`

  return get
}
