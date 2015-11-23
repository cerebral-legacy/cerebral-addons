import { getPathValue } from '../helpers/objectPath';

export default function (root) {

  return function resetState(input, state, output, { initialState }) {
    if (root) {
      state.set(root, getPathValue(initialState, root));
    } else {
      state.set(initialState);
    }
  };

}
