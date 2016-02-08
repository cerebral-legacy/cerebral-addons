import getCompiler from 'cerebral-url-scheme-compiler/get'
import isTruthy from '../helpers/isTruthy'
import toDisplayName from '../helpers/toDisplayName'

export default function (...paths) {
  const getters = paths.map((path) => getCompiler(path))

  const and = function and (args) {
    return getters.length && getters.every((getter) => isTruthy(getter(args)))
      ? getters[getters.length - 1](args)
      : undefined
  }

  and.displayName = `and(${paths.map((path, index) => toDisplayName(path, getters[index])).join(', ')})`

  return and
}
