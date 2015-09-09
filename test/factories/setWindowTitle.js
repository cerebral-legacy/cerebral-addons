var setTitle = require('../../src/factories/setWindowTitle');

module.exports = {

  setUp: function (callback) {
    global.document = {};
    callback();
  },

  tearDown: function (callback) {
    delete global.document;
    callback();
  },

  setTitle: function (test) {
    var action = setTitle('Home - My App');

    action();

    test.equal(document.title, 'Home - My App');
    test.done();
  }

};
