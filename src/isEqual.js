import getCompiler from 'cerebral-url-scheme-compiler/get'
import toDisplayName from './helpers/toDisplayName'

export default function (...paths) {
  const getters = paths.map((path) => getCompiler(path))
  const displayName = `isEqual(${paths.map((path, index) => toDisplayName(path, getters[index])).join(', ')})`
  const firstGetter = getters.shift()

  const isEqual = function isEqual (args) {
    const firstValue = firstGetter(args)
    return getters.every((getter) => firstValue === getter(args))
  }

  isEqual.displayName = displayName

  return isEqual
}
