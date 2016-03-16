/*global beforeEach,describe,it*/
import throttle from '../../src/factories/throttle'
import { expect } from 'chai'
import controller from '../helpers/controller'

function increaseCount ({ state }) {
  state.set('count', state.get('count') + 1)
}

controller.addSignals({
  increaseImmediateThrottle: {
    chain: [
      throttle(1, [ increaseCount ])
    ], sync: true}
})

const signals = controller.getSignals()
let tree

describe('throttle()', function () {
  beforeEach(function () {
    tree = controller.model.tree
    tree.set({
      count: 0
    })
    tree.commit()
  })

  it('should not call increase more than twice', function (done) {
    signals.increaseImmediateThrottle()
    signals.increaseImmediateThrottle()
    signals.increaseImmediateThrottle()
    signals.increaseImmediateThrottle()
    signals.increaseImmediateThrottle()

    setTimeout(function () {
      expect(tree.get('count')).to.equal(2)
      done()
    }, 10)
  })
})
