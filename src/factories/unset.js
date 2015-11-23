export default function (statePath) {

  return function unset(input, state) {
    state.unset(statePath);
  };

}
