import getCompiler from '../helpers/getValue'
import isTruthy from '../helpers/isTruthy'

export default function (...paths) {
  const getters = paths.map(path => getCompiler(path))

  const and = function and (args) {
    if (getters.length && getters.every(getter => isTruthy(getter(args)))) {
      return getters[getters.length - 1]
    } else {
      return () => undefined
    }
  }

  and.displayName = `and(${paths.map((path, index) => typeof path === 'function'
    ? getters[index].displayName
    : JSON.stringify(path)).join(', ')})`

  return and
}
