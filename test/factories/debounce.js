/*global beforeEach,afterEach,describe,it*/
import debounce from '../../src/factories/debounce'
import { reset, check, expect, expectCount } from '../helpers/chaiCounter'
import controller from '../helpers/controller'

function increaseCount ({ state }) {
  state.set('count', state.get('count') + 1)
}

controller.addSignals({
  increaseImmediate: {chain: [debounce(1, [increaseCount])], sync: true},
  increaseNotImmediate: {chain: [debounce(1, [increaseCount], {
    immediate: false
  })], sync: true}
})

const signals = controller.getSignals()
let tree

beforeEach(reset)
afterEach(check)

describe('debounce()', function () {
  beforeEach(function () {
    tree = controller.model.tree
    tree.set({
      count: 0
    })
    tree.commit()
  })

  it('should not call increase more than twice when immediate', function (done) {
    signals.increaseImmediate()
    signals.increaseImmediate()
    signals.increaseImmediate()
    signals.increaseImmediate()
    signals.increaseImmediate()

    setTimeout(function () {
      expect(tree.get('count')).to.equal(2)
      done()
    }, 10)
  })

  it('should not call increase more than once when not immediate', function (done) {
    signals.increaseNotImmediate()
    signals.increaseNotImmediate()
    signals.increaseNotImmediate()
    signals.increaseNotImmediate()
    signals.increaseNotImmediate()

    setTimeout(function () {
      expect(tree.get('count')).to.equal(1)
      done()
    }, 10)
  })

  it('should not call output more than twice when immediate', function (done) {
    expectCount(1)
    let terminated = 0
    let continued = 0

    const chain = debounce(10, [], { immediate: true })

    const args = {
      output: {
        continue () {
          continued++
          if (continued === 2) {
            expect(terminated).to.equal(3)
            done()
          }
        },
        terminate () {
          terminated++
        }
      }
    }

    chain[0](args)
    chain[0](args)
    chain[0](args)
    chain[0](args)
    chain[0](args)
  })

  it('should not call output again after timeout when immediate', function (done) {
    expectCount(1)
    let terminated = 0
    let continued = 0

    const chain = debounce(10, [], { immediate: true })

    const args = {
      output: {
        continue () {
          continued++
          if (continued === 3) {
            expect(terminated).to.equal(3)
            done()
          }
        },
        terminate () {
          terminated++
        }
      }
    }

    chain[0](args)
    chain[0](args)
    chain[0](args)
    setTimeout(() => {
      chain[0](args)
      chain[0](args)
      chain[0](args)
    }, 15)
  })

  it('should not call output more than once', function (done) {
    expectCount(1)
    let terminated = 0

    const chain = debounce(10, [], { immediate: false })

    const args = {
      output: {
        continue () {
          expect(terminated).to.equal(4)
          done()
        },
        terminate () {
          terminated++
        }
      }
    }

    chain[0](args)
    chain[0](args)
    chain[0](args)
    chain[0](args)
    chain[0](args)
  })

  it('should call output again after timeout', function (done) {
    expectCount(1)
    let terminated = 0
    let continued = 0

    const chain = debounce(10, [], { immediate: false })

    const args = {
      output: {
        continue () {
          continued++
          if (continued === 2) {
            expect(terminated).to.equal(4)
            done()
          }
        },
        terminate () {
          terminated++
        }
      }
    }

    chain[0](args)
    chain[0](args)
    chain[0](args)
    setTimeout(() => {
      chain[0](args)
      chain[0](args)
      chain[0](args)
    }, 15)
  })

  it('should respect defaults', function (done) {
    expectCount(1)
    let terminated = 0
    let continued = 0

    const chain = debounce(10, [])

    const args = {
      output: {
        continue () {
          continued++
          if (continued === 2) {
            expect(terminated).to.equal(3)
            done()
          }
        },
        terminate () {
          terminated++
        }
      }
    }

    chain[0](args)
    chain[0](args)
    chain[0](args)
    chain[0](args)
    chain[0](args)
  })
})
