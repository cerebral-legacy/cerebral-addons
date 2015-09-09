let timers = {};

export default {

  start(name, time, factoryOutput) {
    let action = function startTimer(input, state, output) {
      let timer = timers[name] = {
        start() {
          clearTimeout(timer.id);
          timer.id = setTimeout(timer.onTimeout, time);
        },
        stop() {
          clearTimeout(timer.id);
        },
        onTimeout() {
          output.timeout();
          delete timers[name];
        },
        cancel(outputData) {
          clearTimeout(timer.id);
          output.cancel(outputData);
          delete timers[name];
        }
      };
      timer.start();
    };
    action.outputs = ['timeout', 'cancel'];
    return [action, {
      timeout: (factoryOutput && factoryOutput.timeout) || [],
      cancel: (factoryOutput && factoryOutput.cancel) || []
    }];
  },

  cancel(name, outputData) {
    return [function cancelTimer(input, state, output) {
      if (timers[name]) {
        timers[name].cancel(outputData);
      }
      output();
    }];
  },

  pause(name) {
    return [function pauseTimer(input, state, output) {
      if (timers[name]) {
        timers[name].stop();
      }
      output();
    }];
  },

  restart(name) {
    return [function restartTimer(input, state, output) {
      if (timers[name]) {
        timers[name].start();
      }
      output();
    }];
  }
}
