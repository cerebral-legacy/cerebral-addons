export default function (...statePaths) {

  return function resetStateExcept(input, state, output, { initialState }) {
    const exceptData = statePaths.map(path => { return { path, value: state.get(path) }; });
    state.set(initialState);
    exceptData.forEach(data => state.set(data.path, data.value));
  };

}
