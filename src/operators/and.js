import getCompiler from '../helpers/getValue'
import isTruthy from '../helpers/isTruthy'

export default function (...paths) {
  const getters = paths.map(path => getCompiler(path))

  const and = function and (args) {
    return getters.length && getters.every(getter => isTruthy(getter(args)))
      ? getters[getters.length - 1](args)
      : undefined
  }

  and.displayName = `and(${paths.map((path, index) => typeof path === 'function'
    ? getters[index].displayName || getters[index].name
    : JSON.stringify(path)).join(', ')})`

  return and
}
