import getCompiler from 'cerebral-url-scheme-compiler/get'
import isTruthy from '../helpers/isTruthy'
import toDisplayName from '../helpers/toDisplayName'

export default function (path) {
  const getter = getCompiler(path)

  const not = function not (args) {
    return !isTruthy(getter(args))
  }

  not.displayName = `not(${toDisplayName(path, getter)})`

  return not
}
