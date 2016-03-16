const pending = {}

export default function (time, continueChain, options = null) {
  const id = Symbol('id')

  if (options === null) {
    console.warn('cerebral-addons: calling debounce() without options has been temporarily deprecated. https://gist.github.com/garth/c1ff94b9cb41ad1b107d')
  }

  const {
    terminateChain = [],
    immediate = true,
    throttle = true,
  } = (options || {})

  const timeout = function debounceTimeout () {
    if (pending[id].continue) {
      // continue the final signal
      pending[id].continue()
      // immediate debounce should wait until time before sending immediate again
      if (immediate) {
        pending[id] = {
          timeout: setTimeout(timeout, time)
        }
      } else {
        delete pending[id]
      }
    } else {
      // no pending signals
      delete pending[id]
    }
  }

  const debounce = function debounce ({ output }) {
    if (pending[id]) {
      // not first time
      if (pending[id].terminate) {
        // terminate the previous signal
        pending[id].terminate()

        // convert from throttle to a debounce
        // todo: this flag should eventually be removed
        if (!throttle) {
          clearTimeout(pending[id].timeout)
          pending[id] = {
            timeout: setTimeout(timeout, time)
          }
        }
      }
      // replace previous signal with this one
      pending[id].continue = output.continue
      pending[id].terminate = output.terminate
    } else {
      // first time
      pending[id] = {
        timeout: setTimeout(timeout, time)
      }
      if (!immediate) {
        // queue the signal
        pending[id].continue = output.continue
        pending[id].terminate = output.terminate
      } else {
        // continue the signal
        output.continue()
      }
    }
  }

  debounce.outputs = [
    'continue',
    'terminate'
  ]

  debounce.displayName = `addons.debounce(${time}, ...)`

  return [
    debounce, {
      continue: continueChain,
      terminate: terminateChain
    }
  ]
}
