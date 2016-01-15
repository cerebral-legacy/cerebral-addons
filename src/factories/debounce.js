let nextId = 1
const pending = {}

export default function (time, continueChain, terminateChain = []) {
  const id = nextId++

  const debounce = function debounch ({ output }) {
    if (pending[id]) {
      pending[id].terminate()
    } else {
      pending[id] = {
        timeout: setTimeout(() => {
          pending[id].continue()
          delete pending[id]
        }, time)
      }
    }
    pending[id].continue = output.continue
    pending[id].terminate = output.terminate
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
