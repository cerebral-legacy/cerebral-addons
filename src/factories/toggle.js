export default function (statePath, onValue=true, offValue=false) {

  return function toggle({ state }) {
    let value = state.get(statePath);
    state.set(statePath, value === onValue ? offValue : onValue);
  };

}
