import getCompiler from 'cerebral-url-scheme-compiler/get'
import isTruthy from '../helpers/isTruthy'

export default function (path) {
  const getter = getCompiler(path)

  const not = function not (args) {
    return !isTruthy(getter(args))
  }

  return not
}
