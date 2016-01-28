import getCompiler from 'cerebral-url-scheme-compiler/get'
import isTruthy from '../helpers/isTruthy'

export default function (...paths) {
  const getters = paths.map(path => getCompiler(path))

  const or = function or (args) {
    const getter = getters.find(getter => isTruthy(getter(args)))
    return getter ? getter(args) : undefined
  }

  return or
}
