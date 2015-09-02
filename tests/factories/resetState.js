var resetState = require('../../factories/resetState');

module.exports = {

  resetStore: function (test) {
    test.expect(1);

    var action = resetState({
      store: {
        reset: function () {
          test.ok(true);
          test.done();
        }
      }
    });

    action();
  },

  resetStoreNode: function (test) {
    test.expect(2);

    var action = resetState({
      store: {
        initialState: {
          node: 'test'
        }
      }
    }, 'node');

    action({}, {
      set: function (path, value) {
        test.equal(path, 'node');
        test.equal(value, 'test');
        test.done();
      }
    });
  }

};
