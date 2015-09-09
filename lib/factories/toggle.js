"use strict";

module.exports = function (statePath, onValue, offValue) {

  if (!onValue) {
    onValue = true;
  }
  if (!offValue) {
    offValue = false;
  }

  return function toggle(input, state) {
    var value = state.get(statePath);
    state.set(statePath, value === onValue ? offValue : onValue);
  };
};