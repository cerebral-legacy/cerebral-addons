var when = require('../../src/factories/when');

module.exports = {

  whenTrueCallsIsTrue: function (test) {
    test.expect(2);

    var action = when('test');

    action({}, {
      get: function (path) {
        test.equal(path, 'test');
        return true;
      }
    }, {
      isTrue: function () {
        test.ok(true);
        test.done();
      },
      isFalse: function () {
      }
    });
  },

  whenFalseCallsIsFalse: function (test) {
    test.expect(2);

    var action = when('test');

    action({}, {
      get: function (path) {
        test.equal(path, 'test');
        return false;
      }
    }, {
      isTrue: function () {
      },
      isFalse: function () {
        test.ok(true);
        test.done();
      }
    });
  },

  whenTrueCallsCustomTrue: function (test) {
    test.expect(2);

    var action = when('test', 'yes', 'no');

    action({}, {
      get: function (path) {
        test.equal(path, 'test');
        return true;
      }
    }, {
      yes: function () {
        test.ok(true);
        test.done();
      },
      no: function () {
      }
    });
  },

  whenFalseCallsCustomFalse: function (test) {
    test.expect(2);

    var action = when('test', 'yes', 'no');

    action({}, {
      get: function (path) {
        test.equal(path, 'test');
        return false;
      }
    }, {
      yes: function () {
      },
      no: function () {
        test.ok(true);
        test.done();
      }
    });
  }

};
