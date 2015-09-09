import { validate as checkEmail } from 'email-validator';
import when from './when';

const getErrorPath = function (statePath) {
  let errorPath = Array.isArray(statePath) ? statePath.slice() : [ statePath ];
  errorPath.push('validation', errorPath.pop());
  return errorPath;
};

const getErrorKey = function (statePath, suffix) {
  if (Array.isArray(statePath)) {
    return statePath[statePath.length - 1] + suffix;
  } else {
    return statePath + suffix;
  }
};

const setError = function (state, errorPath, isError, errorKey) {
  let parentExists = true;
  let parentPath = null;
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

export default {

  email(statePath, {
    errorPath = null,
    errorKey = null
  } = {}) {
    errorPath = errorPath || getErrorPath(statePath);
    errorKey = errorKey || getErrorKey(statePath, 'Invalid');

    return function validateEmail(input, state) {
      const email = state.get(statePath);
      setError(state, errorPath, !checkEmail(email), errorKey);
    };
  },

  required(statePath, {
    errorPath = null,
    errorKey = null
  } = {}) {
    errorPath = errorPath || getErrorPath(statePath);
    errorKey = errorKey || getErrorKey(statePath, 'Required');

    return function validateRequired(input, state) {
      const value = state.get(statePath);
      setError(state, errorPath, value.length === 0, errorKey);
    };
  },

  equal(statePath, compareStatePath, {
    errorPath = null,
    errorKey = null
  } = {}) {
    errorPath = errorPath || getErrorPath(statePath);
    errorKey = errorKey || getErrorKey(statePath, 'NotEqual');

    return function validateEqual(input, state) {
      const value = state.get(statePath);
      const compareValue = state.get(compareStatePath);
      setError(state, errorPath, value !== compareValue, errorKey);
    };
  },

  password(statePath, {
    errorPath = null,
    errorKey = null,
    minLength = 8,
    maxLength = 128,
    minPhraseLength = 20,
    minPassingTests = 3,
    tests = [
      /[a-z]/,
      /[A-Z]/,
      /[0-9]/,
      /[^A-Za-z0-9]/
    ]
  } = {}) {
    errorPath = errorPath || getErrorPath(statePath);
    errorKey = errorKey || getErrorKey(statePath, 'Invalid');

    return function validatePassword(input, state, output, services) {
      const password = state.get(statePath);
      let ok = false;
      // password should be between min and max length and not have 3 or more repeating chars
      if (password.length >= minLength && password.length <= maxLength && !/(.)\1{2,}/.test(password)) {
        if (password.length >= minPhraseLength) {
          // password is phrase
          ok = true;
        } else {
          // password should pass some tests
          ok = minPassingTests <= tests.reduce((total, re) => re.test(password) ? total + 1 : total, 0);
        }
      }

      setError(state, errorPath, !ok, errorKey);
    };
  },

  check(statePath) {
    statePath = Array.isArray(statePath) ? statePath.slice() : [ statePath ];
    statePath.push('validation');
    return when(statePath, 'isInvalid', 'isValid');
  }

};
