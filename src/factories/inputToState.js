import { getPathValue } from '../helpers/objectPath';

export default function (inputPath, statePath) {

  return function copyInputToState(input, state) {
    state.set(statePath, getPathValue(input, inputPath));
  };

}
