"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function (statePath) {

  return function logState(input, state) {
    console.log(state.get(statePath));
  };
};

module.exports = exports["default"];