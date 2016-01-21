import getCompiler from '../helpers/getValue'
import isTruthy from '../helpers/isTruthy'

export default function (...paths) {
  const getters = paths.map(path => getCompiler(path))

  return function and (args) {
    const getter = getters.find(getter => isTruthy(getter(args)))
    return getter || (() => undefined)
  }
}
