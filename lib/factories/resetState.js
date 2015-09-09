"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function (controller, root) {

  return function resetState(input, state) {
    if (root) {
      state.set(root, controller.store.initialState[root]);
    } else {
      controller.store.reset();
    }
  };
};

module.exports = exports["default"];