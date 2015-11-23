"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function (statePath) {

  return function unset(input, state) {
    state.unset(statePath);
  };
};

module.exports = exports["default"];