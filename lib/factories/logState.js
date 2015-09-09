"use strict";

module.exports = function (statePath) {

  return function logState(input, state) {
    console.log(state.get(statePath));
  };
};