'use strict';

module.exports = function (statePath, truePath, falsePath) {

  truePath = truePath || 'isTrue';
  falsePath = falsePath || 'isFalse';

  var action = function when(input, state, output) {
    if (state.get(statePath)) {
      output[truePath]();
    } else {
      output[falsePath]();
    }
  };

  action.outputs = [truePath, falsePath];

  return action;
};