"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function (statePath) {
  var onValue = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
  var offValue = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

  return function toggle(input, state) {
    var value = state.get(statePath);
    state.set(statePath, value === onValue ? offValue : onValue);
  };
};

module.exports = exports["default"];