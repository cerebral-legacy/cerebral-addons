"use strict";

module.exports = function (title) {

  return function setWindowTitle() {
    document.title = title;
  };
};