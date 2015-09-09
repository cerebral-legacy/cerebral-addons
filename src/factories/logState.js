export default function (statePath) {

  return function logState(input, state) {
    console.log(state.get(statePath));
  };

}
