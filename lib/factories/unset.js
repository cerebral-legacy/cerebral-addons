"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function (statePath) {

  return function unset(_ref) {
    var state = _ref.state;

    state.unset(statePath);
  };
};

module.exports = exports["default"];