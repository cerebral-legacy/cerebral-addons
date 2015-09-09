var copyInputToState = require('../../src/factories/copyInputToState');

module.exports = {

  copyInputValueToState: function (test) {
    test.expect(2);

    var action = copyInputToState('node', 'node');

    action({ node: 'test' }, {
      set: function (path, value) {
        test.equal(path, 'node');
        test.equal(value, 'test');
        test.done();
      }
    });
  },

  copyNestedInputValueToState: function (test) {
    test.expect(2);

    var action = copyInputToState(['parent', 'node'], 'node');

    action({ parent: { node: 'test' } }, {
      set: function (path, value) {
        test.equal(path, 'node');
        test.equal(value, 'test');
        test.done();
      }
    });
  }

};
