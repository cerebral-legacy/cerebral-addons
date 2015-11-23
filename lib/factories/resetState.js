'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _helpersObjectPath = require('../helpers/objectPath');

exports['default'] = function (root) {

  return function resetState(input, state, output, _ref) {
    var initialState = _ref.initialState;

    if (root) {
      state.set(root, (0, _helpersObjectPath.getPathValue)(initialState, root));
    } else {
      state.set(initialState);
    }
  };
};

module.exports = exports['default'];