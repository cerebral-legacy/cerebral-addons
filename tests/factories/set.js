var set = require('../../factories/set');

module.exports = {

  setValue: function (test) {
    test.expect(2);

    var action = set('test', 'XYZ');

    action({}, {
      set: function (path, value) {
        test.equal(path, 'test');
        test.equal(value, 'XYZ');
        test.done();
      }
    });
  }

};
