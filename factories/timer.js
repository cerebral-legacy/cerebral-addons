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
        cancel: function (outputData) {
          clearTimeout(timer.id);
          output.cancel(outputData);
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

  cancel: function (name, outputData) {
    return [function cancelTimer(input, state, output) {
      if (timers[name]) {
        timers[name].cancel(outputData);
      }
      output();
    }];
  },

  pause: function (name) {
    return [function pauseTimer(input, state, output) {
      if (timers[name]) {
        timers[name].stop();
      }
      output();
    }];
  },

  restart: function (name) {
    return [function resumeTimer(input, state, output) {
      if (timers[name]) {
        timers[name].start();
      }
      output();
    }];
  }

};
