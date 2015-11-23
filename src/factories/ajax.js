import { getPathValue } from '../helpers/objectPath';

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
  return inputUrlPath ? url + getPathValue(input, inputUrlPath) : url;
}

export default {

  get(url='', inputUrlPath=null) {
    return function ajaxGet(input, state, output, { request }) {
      request
        .get(getUrl(url, input, inputUrlPath))
        .accept('json')
        .end(outputResponse(output));
    };
  },

  post(url='', inputUrlPath=null) {
    return function ajaxPost(input, state, output, { request }) {
      request
        .post(getUrl(url, input, inputUrlPath))
        .accept('json')
        .send(getPathValue(input, 'data'))
        .end(outputResponse(output));
    };
  },

  put(url='', inputUrlPath=null) {
    return function ajaxPut(input, state, output, { request }) {
      request
        .put(getUrl(url, input, inputUrlPath))
        .accept('json')
        .send(getPathValue(input, 'data'))
        .end(outputResponse(output));
    };
  },

  del(url='', inputUrlPath=null) {
    return function ajaxDel(input, state, output, { request }) {
      request
        .del(getUrl(url, input, inputUrlPath))
        .accept('json')
        .end(outputResponse(output));
    };
  }

}
