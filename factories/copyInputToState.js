module.exports = function (statePath, inputPath) {

  return function copyInputToState(input, state) {
    if (Array.isArray(inputPath)) {
      var value = input;
      inputPath.forEach(function (key) {
        if (value) {
          value = value[key];
        }
      });
      state.set(statePath, value);
    } else {
      state.set(statePath, input[inputPath])
    }
  };

};