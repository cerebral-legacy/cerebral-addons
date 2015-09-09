export default function (statePath, truePath='isTrue', falsePath='isFalse') {

  let action = function when(input, state, output) {
    let value = state.get(statePath);
    // treat objects with no keys as falsy
    if (value && typeof value === 'object' && Object.keys(value).length === 0) {
      value = false;
    }
    if (value) {
      output[truePath]();
    } else {
      output[falsePath]();
    }
  };
  action.outputs = [truePath, falsePath];
  return action;

}
