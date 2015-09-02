var timers = {};

module.exports = {

  start: function (name, time, onTimeout, onCancel) {
    var action = function startTimer(input, state, output) {
      var timer = timers[name] = {
        start: function () {
          clearTimeout(timer.id);
          timer.id = setTimeout(timer.onTimeout, time);
        },
        stop: function () {
          clearTimeout(timer.id);
        },
        onTimeout: function () {
          output.timeout();
          delete timers[name];
        },
        cancel: function () {
          clearTimeout(timer.id);
          output.cancel();
          delete timers[name];
        }
      };
      timer.start();
    };
    action.outputs = ['timeout', 'cancel'];
    return [action, {
      timeout: onTimeout || [],
      cancel: onCancel || []
    }];
  },

  cancel: function (name) {
    return [function cancelTimer(input, state, output) {
      if (timers[name]) {
        timers[name].cancel();
      }
      output.success();
    }, { success: [] }];
  },

  pause: function (name) {
    return [function pauseTimer(input, state, output) {
      if (timers[name]) {
        timers[name].stop();
      }
      output.success();
    }, { success: [] }];
  },

  restart: function (name) {
    return [function resumeTimer(input, state, output) {
      if (timers[name]) {
        timers[name].start();
      }
      output.success();
    }, { success: [] }];
  }

};
