import { getPathValue } from './objectPath'
import parseUrl from './parseUrl'

export default function compile (path, fn = 'get') {
  if (typeof path === 'string') {
    // check if the string is a url
    const url = parseUrl(path)
    if (url) {
      const urlPath = (url.path || '').split('.')
      if (url.scheme === 'input' && fn === 'get') {
        // get the value from the input object
        return function getInputValue ({ input }) {
          return getPathValue(input, urlPath)
        }
      } else if (url.scheme === 'state') {
        if (url.host === '.') {
          // get the value from the current module
          return function fnLocalModuleStateValue ({ module }) {
            return module.state[fn](urlPath)
          }
        } else if (url.host) {
          // get the value from the named module
          return function fnModuleStateValue ({ modules }) {
            const module = modules[url.host]
            if (!module) {
              return console.error(`${path} : module was not found.`)
            }
            return module.state[fn](urlPath)
          }
        } else {
          // get the value from the global state
          return function fnStateValue ({ state }) {
            return state[fn](urlPath)
          }
        }
      } else {
        return console.error(`${path} : not supported by state.{fn}().`)
      }
    }
  } else if (typeof path === 'function') {
    return path
  }
  // non-strings and non-urls (probably an array) are passed through to state.get
  return function fnState ({ state }) {
    return state[fn](path)
  }
}
