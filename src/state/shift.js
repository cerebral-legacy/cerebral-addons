import getCompiler from 'cerebral-url-scheme-compiler/get'

export default function (path) {
  const shift = getCompiler(path, 'shift')

  shift.displayName = `shift`

  return shift
}
