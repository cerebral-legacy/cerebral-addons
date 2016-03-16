import debounce from './debounce'

export default (time, continueChain, options = null) => debounce(time, continueChain, Object.assign({
  terminateChain: []
}, options, {
  immediate: true,
  throttle: true,
  _displayName: 'throttle'
}))
