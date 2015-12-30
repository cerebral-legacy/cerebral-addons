'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _helpersObjectPath = require('../helpers/objectPath');

exports['default'] = function (statePath, outputPath) {

  if (!outputPath) {
    outputPath = statePath;
  }

  return function stateToOutput(_ref) {
    var input = _ref.input;
    var state = _ref.state;
    var output = _ref.output;

    var value = state.get(statePath);
    if (typeof value.toJS === 'function') {
      value = value.toJS();
    } else if (Object.isFrozen(value)) {
      value = JSON.parse(JSON.stringify(value));
    }
    (0, _helpersObjectPath.setPathValue)(input, outputPath, value);
    output(input);
  };
};

module.exports = exports['default'];