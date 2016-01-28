import setCompiler from 'cerebral-url-scheme-compiler/set'

export default function (path) {
  const merge = setCompiler(path, 'merge')

  merge.displayName = `merge`

  return merge
}
