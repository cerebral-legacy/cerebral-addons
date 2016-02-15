import getCompiler from 'cerebral-url-scheme-compiler/get'
import isEqual from 'lodash/isEqual'
import toDisplayName from '../helpers/toDisplayName'

export default function (...paths) {
  const getters = paths.map((path) => getCompiler(path))
  const displayName = `isDeepEqual(${paths.map((path, index) => toDisplayName(path, getters[index])).join(', ')})`
  const firstGetter = getters.shift()

  const isDeepEqual = function isDeepEqual (args) {
    const firstValue = firstGetter(args)
    return getters.every((getter) => isEqual(firstValue, getter(args)))
  }

  isDeepEqual.displayName = displayName

  return isDeepEqual
}
