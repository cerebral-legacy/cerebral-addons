import getCompiler from 'cerebral-url-scheme-compiler/get'
import isTruthy from '../helpers/isTruthy'
import toDisplayName from '../helpers/toDisplayName'

export default function (...paths) {
  const getters = paths.map(path => getCompiler(path))

  const or = function or (args) {
    const getter = getters.find(getter => isTruthy(getter(args)))
    return getter ? getter(args) : undefined
  }

  or.displayName = `or(${paths.map((path, index) => toDisplayName(path, getters[index])).join(', ')})`

  return or
}
