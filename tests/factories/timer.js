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

  timerCanBeCancelled: function (test) {
    test.expect(3);

    var chain = timer.start('test', 1000);

    test.equal(chain.length, 2);

    chain[0]({}, {}, {
      timeout: function () {
      },
      cancel: function () {
        test.ok(true);
      }
    });
    timer.cancel('test')[0]({}, {}, {
      success: function () {
        test.ok(true);
        test.done();
      }
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

    timer.pause('test')[0]({}, {}, {
      success: function () {
        test.ok(true);
        timer.restart('test')[0]({}, {}, {
          success: function () {
            test.ok(true);
          }
        });
      }
    })
  }

};
