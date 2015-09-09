export default function (statePath, value) {

  return function set(input, state) {
    state.set(statePath, value);
  };

}
