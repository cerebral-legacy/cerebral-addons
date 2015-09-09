"use strict";

module.exports = function (delay, action) {

  function timeout(input, state, output) {
    setTimeout(output.success, delay);
  }

  return [timeout, {
    success: Array.isArray(action) ? action : [action]
  }];
};