import { setPathValue } from '../helpers/objectPath';

export default function (statePath, outputPath) {

  if (!outputPath) {
    outputPath = statePath;
  }

  return function copyStateToOutput(input, state, output) {
    let value = state.get(statePath);
    if (typeof value.toJS === 'function') {
      value = value.toJS();
    }
    setPathValue(input, outputPath, value);
    output(input);
  };

}
