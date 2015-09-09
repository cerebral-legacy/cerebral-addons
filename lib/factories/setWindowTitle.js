"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function (title) {

  return function setWindowTitle() {
    document.title = title;
  };
};

module.exports = exports["default"];