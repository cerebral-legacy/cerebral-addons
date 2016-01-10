import { getPathValue } from './objectPath'
import parseUrl from './parseUrl'

export function compile (path) {
  if (typeof path === 'string') {
    // check if the string is a url
    const url = parseUrl(path)
    if (url) {
      const urlPath = (url.path || '').split('.')
      if (url.scheme === 'input') {
        // get the value from the input object
        return function getInputValue ({ input }) {
          return getPathValue(input, urlPath)
        }
      } else if (url.scheme === 'state') {
        if (url.host === '.') {
          // get the value from the current module
          return function getLocalModuleStateValue ({ module }) {
            return module.get(urlPath)
          }
        } else if (url.host) {
          // get the value from the named module
          return function getModuleStateValue ({ modules }) {
            const module = modules[url.host]
            if (!module) {
              return console.error(`${path} : module was not found.`)
            }
            return module.get(urlPath)
          }
        } else {
          // get the value from the global state
          return function getStateValue ({ state }) {
            return state.get(urlPath)
          }
        }
      } else {
        return console.error(`${path} : scheme is not supported, expect "input" or "state".`)
      }
    }
  }
  // non-strings and non-urls (probably an array) are passed through to state.get
  return function get ({ state }) {
    return state.get(path)
  }
}
