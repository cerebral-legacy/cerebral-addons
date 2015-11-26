import { getPathValue } from '../helpers/objectPath';

export default function (inputPath, statePath) {

  if (!statePath) {
    statePath = inputPath;
  }

  return function inputToState(input, state) {
    state.set(statePath, getPathValue(input, inputPath));
  };

}
