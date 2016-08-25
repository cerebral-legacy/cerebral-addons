console.warn('cerebral-addons: cerebral 1.1 will no longer support mixed operators and addons.')
console.warn("cerebral-addons: To continue using cerebral-addons, import 'copy', 'set' and")
console.warn("cerebral-addons: 'when' from 'cerebral-addons' instead of 'cerebral/operators'")

module.exports = {
  and: require('./and'),
  compose: require('./compose'),
  copy: require('./copy'),
  findWhere: require('./findWhere'),
  get: require('./get'),
  getPath: require('./getPath'),
  isDeepEqual: require('./isDeepEqual'),
  isEqual: require('./isEqual'),
  literal: require('./literal'),
  merge: require('./merge'),
  not: require('./not'),
  or: require('./or'),
  pop: require('./pop'),
  push: require('./push'),
  set: require('./set'),
  setPath: require('./setPath'),
  shift: require('./shift'),
  unshift: require('./unshift'),
  when: require('./when')
}
