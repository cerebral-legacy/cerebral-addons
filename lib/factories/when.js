'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var truthy = Symbol('truthy');
var falsy = Symbol('falsy');
var otherwise = Symbol('otherwise');

function when(statePath) {
  var outputs = arguments.length <= 1 || arguments[1] === undefined ? { isTrue: truthy, isFalse: otherwise } : arguments[1];
  var emptyObjectsAreFalse = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];

  var action = function when(input, state, output) {
    var value = state.get(statePath);

    // treat objects with no keys as falsy
    if (emptyObjectsAreFalse && value && typeof value === 'object' && Object.keys(value).length === 0) {
      value = false;
    }

    var otherwisePath = null;
    var path = Object.keys(outputs).find(function (path) {
      var test = outputs[path];
      if (test === otherwise) {
        otherwisePath = path;
        return false;
      } else {
        return test === value || test === truthy && value || test === falsy && !value;
      }
    });

    output[path || otherwisePath]();
  };

  action.outputs = Object.keys(outputs);
  return action;
}

when.truthy = truthy;
when.falsy = falsy;
when.otherwise = otherwise;

exports['default'] = when;
module.exports = exports['default'];