'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _helpersObjectPath = require('../helpers/objectPath');

exports['default'] = function (inputPath, statePath) {

  return function copyInputToState(input, state) {
    state.set(statePath, (0, _helpersObjectPath.getPathValue)(input, inputPath));
  };
};

module.exports = exports['default'];