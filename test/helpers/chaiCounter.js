import test from 'chai'
const chai = test.expect

let expected = null
let actual = 0

export function expect (target) {
  actual++
  return chai(target)
}

export function expectCount (count) {
  expected = count
}

export function reset () {
  expected = null
  actual = 0
}

export function check () {
  if (this.currentTest.state === 'failed' || expected === null || expected === actual) { return }
  let err = new Error(`expected ${expected} assertions, got ${actual}`)
  this.currentTest.emit('error', err)
}
