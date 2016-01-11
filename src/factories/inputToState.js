import { getPathValue } from '../helpers/objectPath'

export default function (inputPath, statePath) {
  console.warn('deprecation (cerebral-addons): please use copy() instead of inputToState()')
  if (!statePath) {
    statePath = inputPath
  }

  return function inputToState ({ input, state }) {
    state.set(statePath, getPathValue(input, inputPath))
  }
}
