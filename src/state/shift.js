import getCompiler from 'cerebral-url-scheme-compiler/get'
import toDisplayName from '../helpers/toDisplayName'

export default function (path) {
  const shift = getCompiler(path, 'shift')

  shift.displayName = `shift(${toDisplayName(path, shift)})`

  return shift
}
