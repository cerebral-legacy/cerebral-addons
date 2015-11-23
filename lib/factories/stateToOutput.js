'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _helpersObjectPath = require('../helpers/objectPath');

exports['default'] = function (statePath, outputPath) {

  if (!outputPath) {
    outputPath = statePath;
  }

  return function copyStateToOutput(input, state, output) {
    var value = state.get(statePath);
    if (typeof value.toJS === 'function') {
      value = value.toJS();
    }
    (0, _helpersObjectPath.setPathValue)(input, outputPath, value);
    output(input);
  };
};

module.exports = exports['default'];