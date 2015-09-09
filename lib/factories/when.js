'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function (statePath) {
  var truePath = arguments.length <= 1 || arguments[1] === undefined ? 'isTrue' : arguments[1];
  var falsePath = arguments.length <= 2 || arguments[2] === undefined ? 'isFalse' : arguments[2];

  var action = function when(input, state, output) {
    var value = state.get(statePath);
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
};

module.exports = exports['default'];