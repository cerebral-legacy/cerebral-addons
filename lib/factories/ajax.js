'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _helpersObjectPath = require('../helpers/objectPath');

function outputResponse(output) {
  return function (err, res) {
    if (err) {
      output.error(res.body);
    } else {
      output.success(res.body);
    }
  };
}

function getUrl(url, input, inputUrlPath) {
  return inputUrlPath ? url + (0, _helpersObjectPath.getPathValue)(input, inputUrlPath) : url;
}

exports['default'] = {

  get: function get() {
    var url = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
    var inputUrlPath = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

    return function ajaxGet(input, state, output, _ref) {
      var request = _ref.request;

      request.get(getUrl(url, input, inputUrlPath)).accept('json').end(outputResponse(output));
    };
  },

  post: function post() {
    var url = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
    var inputUrlPath = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

    return function ajaxPost(input, state, output, _ref2) {
      var request = _ref2.request;

      request.post(getUrl(url, input, inputUrlPath)).accept('json').send((0, _helpersObjectPath.getPathValue)(input, 'data')).end(outputResponse(output));
    };
  },

  put: function put() {
    var url = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
    var inputUrlPath = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

    return function ajaxPut(input, state, output, _ref3) {
      var request = _ref3.request;

      request.put(getUrl(url, input, inputUrlPath)).accept('json').send((0, _helpersObjectPath.getPathValue)(input, 'data')).end(outputResponse(output));
    };
  },

  del: function del() {
    var url = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
    var inputUrlPath = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

    return function ajaxDel(input, state, output, _ref4) {
      var request = _ref4.request;

      request.del(getUrl(url, input, inputUrlPath)).accept('json').end(outputResponse(output));
    };
  }

};
module.exports = exports['default'];