var timer = require('../../factories/timer');

module.exports = {

  timerWillTimeout: function (test) {
    test.expect(2);

    var chain = timer.start('test', 1);

    test.equal(chain.length, 2);

    chain[0]({}, {}, {
      timeout: function () {
        test.ok(true);
        test.done();
      },
      cancel: function () {
        test.done();
      }
    });
  },

  timerReturnsDefaultActionArrays: function (test) {
    test.expect(2);

    var chain = timer.start('test', 1);

    test.equal(chain.length, 2);
    test.deepEqual(chain[1], {
      timeout: [],
      cancel: []
    });
    test.done();
  },

  timerReturnsTimerAndTimeoutActions: function (test) {
    test.expect(2);

    var chain = timer.start('test', 1, {
      timeout: 'timeout',
      cancel: 'cancel'
    });

    test.equal(chain.length, 2);
    test.deepEqual(chain[1], {
      timeout: 'timeout',
      cancel: 'cancel'
    });
    test.done();
  },

  timerCanBeCancelled: function (test) {
    test.expect(3);

    var chain = timer.start('test', 1000);

    test.equal(chain.length, 2);

    chain[0]({}, {}, {
      timeout: function () {
      },
      cancel: function (input) {
        test.equal(input.reason, 'becuase');
      }
    });
    timer.cancel('test', { reason: 'becuase' })[0]({}, {}, function () {
      test.ok(true);
      test.done();
    });
  },

  timerCanBePausedAndRestarted: function (test) {
    test.expect(4);

    var chain = timer.start('test', 1);

    test.equal(chain.length, 2);

    chain[0]({}, {}, {
      timeout: function () {
        test.ok(true);
        test.done();
      },
      cancel: function () {
      }
    });

    timer.pause('test')[0]({}, {}, function () {
      test.ok(true);
      timer.restart('test')[0]({}, {}, function () {
        test.ok(true);
      });
    })
  }

};
