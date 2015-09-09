"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = {

  getPathValue: function getPathValue(obj, path) {
    var value = undefined;
    if (obj && path) {
      if (Array.isArray(path)) {
        value = obj;
        path.forEach(function (key) {
          if (value) {
            value = value[key];
          }
        });
      } else {
        value = obj[path];
      }
    }
    return value;
  },

  setPathValue: function setPathValue(obj, path, value) {
    if (obj && path) {
      if (Array.isArray(path)) {
        (function () {
          var node = obj;
          path.forEach(function (key, index) {
            node = node[key] = index + 1 < path.length ? node[key] || {} : value;
          });
        })();
      } else {
        obj[path] = value;
      }
    }
  }

};
module.exports = exports["default"];