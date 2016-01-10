export default function (statePath) {
  return function unset ({ state }) {
    state.unset(statePath)
  }
}
