'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _emailValidator = require('email-validator');

var _when = require('./when');

var _when2 = _interopRequireDefault(_when);

var getErrorPath = function getErrorPath(statePath) {
  var errorPath = Array.isArray(statePath) ? statePath.slice() : [statePath];
  errorPath.push('validation', errorPath.pop());
  return errorPath;
};

var getErrorKey = function getErrorKey(statePath, suffix) {
  if (Array.isArray(statePath)) {
    return statePath[statePath.length - 1] + suffix;
  } else {
    return statePath + suffix;
  }
};

var setError = function setError(state, errorPath, isError, errorKey) {
  var parentExists = true;
  var parentPath = null;
  if (Array.isArray(errorPath) && errorPath.length > 1) {
    parentPath = errorPath.slice(0, errorPath.length - 1);
    parentExists = !!state.get(parentPath);
  }
  if (isError) {
    if (!parentExists) {
      state.set(parentPath, {});
    }
    state.set(errorPath, errorKey);
  } else if (parentExists) {
    state.unset(errorPath);
  }
};

exports['default'] = {

  email: function email(statePath) {
    var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var _ref$errorPath = _ref.errorPath;
    var errorPath = _ref$errorPath === undefined ? null : _ref$errorPath;
    var _ref$errorKey = _ref.errorKey;
    var errorKey = _ref$errorKey === undefined ? null : _ref$errorKey;

    errorPath = errorPath || getErrorPath(statePath);
    errorKey = errorKey || getErrorKey(statePath, 'Invalid');

    return function validateEmail(input, state) {
      var email = state.get(statePath);
      setError(state, errorPath, !(0, _emailValidator.validate)(email), errorKey);
    };
  },

  required: function required(statePath) {
    var _ref2 = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var _ref2$errorPath = _ref2.errorPath;
    var errorPath = _ref2$errorPath === undefined ? null : _ref2$errorPath;
    var _ref2$errorKey = _ref2.errorKey;
    var errorKey = _ref2$errorKey === undefined ? null : _ref2$errorKey;

    errorPath = errorPath || getErrorPath(statePath);
    errorKey = errorKey || getErrorKey(statePath, 'Required');

    return function validateRequired(input, state) {
      var value = state.get(statePath);
      setError(state, errorPath, value.length === 0, errorKey);
    };
  },

  equal: function equal(statePath, compareStatePath) {
    var _ref3 = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    var _ref3$errorPath = _ref3.errorPath;
    var errorPath = _ref3$errorPath === undefined ? null : _ref3$errorPath;
    var _ref3$errorKey = _ref3.errorKey;
    var errorKey = _ref3$errorKey === undefined ? null : _ref3$errorKey;

    errorPath = errorPath || getErrorPath(statePath);
    errorKey = errorKey || getErrorKey(statePath, 'NotEqual');

    return function validateEqual(input, state) {
      var value = state.get(statePath);
      var compareValue = state.get(compareStatePath);
      setError(state, errorPath, value !== compareValue, errorKey);
    };
  },

  password: function password(statePath) {
    var _ref4 = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var _ref4$errorPath = _ref4.errorPath;
    var errorPath = _ref4$errorPath === undefined ? null : _ref4$errorPath;
    var _ref4$errorKey = _ref4.errorKey;
    var errorKey = _ref4$errorKey === undefined ? null : _ref4$errorKey;
    var _ref4$minLength = _ref4.minLength;
    var minLength = _ref4$minLength === undefined ? 8 : _ref4$minLength;
    var _ref4$maxLength = _ref4.maxLength;
    var maxLength = _ref4$maxLength === undefined ? 128 : _ref4$maxLength;
    var _ref4$minPhraseLength = _ref4.minPhraseLength;
    var minPhraseLength = _ref4$minPhraseLength === undefined ? 20 : _ref4$minPhraseLength;
    var _ref4$minPassingTests = _ref4.minPassingTests;
    var minPassingTests = _ref4$minPassingTests === undefined ? 3 : _ref4$minPassingTests;
    var _ref4$tests = _ref4.tests;
    var tests = _ref4$tests === undefined ? [/[a-z]/, /[A-Z]/, /[0-9]/, /[^A-Za-z0-9]/] : _ref4$tests;

    errorPath = errorPath || getErrorPath(statePath);
    errorKey = errorKey || getErrorKey(statePath, 'Invalid');

    return function validatePassword(input, state, output, services) {
      var password = state.get(statePath);
      var ok = false;
      // password should be between min and max length and not have 3 or more repeating chars
      if (password.length >= minLength && password.length <= maxLength && !/(.)\1{2,}/.test(password)) {
        if (password.length >= minPhraseLength) {
          // password is phrase
          ok = true;
        } else {
          // password should pass some tests
          ok = minPassingTests <= tests.reduce(function (total, re) {
            return re.test(password) ? total + 1 : total;
          }, 0);
        }
      }

      setError(state, errorPath, !ok, errorKey);
    };
  },

  check: function check(statePath) {
    statePath = Array.isArray(statePath) ? statePath.slice() : [statePath];
    statePath.push('validation');
    return (0, _when2['default'])(statePath, 'isInvalid', 'isValid');
  }

};
module.exports = exports['default'];