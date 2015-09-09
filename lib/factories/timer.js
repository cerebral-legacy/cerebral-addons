'use strict';

var timers = {};

module.exports = {

  start: function start(name, time, factoryOutput) {
    var action = function startTimer(input, state, output) {
      var timer = timers[name] = {
        start: function start() {
          clearTimeout(timer.id);
          timer.id = setTimeout(timer.onTimeout, time);
        },
        stop: function stop() {
          clearTimeout(timer.id);
        },
        onTimeout: function onTimeout() {
          output.timeout();
          delete timers[name];
        },
        cancel: function cancel(outputData) {
          clearTimeout(timer.id);
          output.cancel(outputData);
          delete timers[name];
        }
      };
      timer.start();
    };
    action.outputs = ['timeout', 'cancel'];
    return [action, {
      timeout: factoryOutput && factoryOutput.timeout || [],
      cancel: factoryOutput && factoryOutput.cancel || []
    }];
  },

  cancel: function cancel(name, outputData) {
    return [function cancelTimer(input, state, output) {
      if (timers[name]) {
        timers[name].cancel(outputData);
      }
      output();
    }];
  },

  pause: function pause(name) {
    return [function pauseTimer(input, state, output) {
      if (timers[name]) {
        timers[name].stop();
      }
      output();
    }];
  },

  restart: function restart(name) {
    return [function resumeTimer(input, state, output) {
      if (timers[name]) {
        timers[name].start();
      }
      output();
    }];
  }

};