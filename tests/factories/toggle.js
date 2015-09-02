var toggle = require('../../factories/toggle');

module.exports = {

  toggleTrueFalse: function (test) {
    test.expect(3);

    var action = toggle('test');

    action({}, {
      get: function (path) {
        test.equal(path, 'test');
        return false;
      },
      set: function (path, value) {
        test.equal(path, 'test');
        test.equal(value, true);
        test.done();
      }
    });
  },


  toggleCustomValues: function (test) {
    test.expect(3);

    var action = toggle('test', 'ON', 'OFF');

    action({}, {
      get: function (path) {
        test.equal(path, 'test');
        return 'ON';
      },
      set: function (path, value) {
        test.equal(path, 'test');
        test.equal(value, 'OFF');
        test.done();
      }
    });
  }

};
