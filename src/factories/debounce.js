const pending = {}

export default function (time, continueChain, { terminateChain = [], immediate = true }) {
  const id = Symbol('id')

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

  return [
    debounce, {
      continue: continueChain,
      terminate: terminateChain
    }
  ]
}
