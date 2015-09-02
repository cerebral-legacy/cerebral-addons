module.exports = function (controller, root) {

  return function resetState(input, state) {
    if (root) {
      state.set(root, controller.store.initialState[root]);
    }
    else {
      controller.store.reset();
    }
  };

};
