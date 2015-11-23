"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function () {
  for (var _len = arguments.length, statePaths = Array(_len), _key = 0; _key < _len; _key++) {
    statePaths[_key] = arguments[_key];
  }

  return function resetStateExcept(input, state, output, _ref) {
    var initialState = _ref.initialState;

    var exceptData = statePaths.map(function (path) {
      return { path: path, value: state.get(path) };
    });
    state.set(initialState);
    exceptData.forEach(function (data) {
      return state.set(data.path, data.value);
    });
  };
};

module.exports = exports["default"];