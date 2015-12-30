export default function (statePath, value) {

  return function set({ state }) {
    state.set(statePath, value);
  };

}
