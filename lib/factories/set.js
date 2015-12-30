"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function (statePath, value) {

  return function set(_ref) {
    var state = _ref.state;

    state.set(statePath, value);
  };
};

module.exports = exports["default"];