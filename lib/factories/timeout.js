"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function (delay, action) {

  function timeout(input, state, output) {
    setTimeout(output.success, delay);
  }

  return [timeout, {
    success: Array.isArray(action) ? action : [action]
  }];
};

module.exports = exports["default"];