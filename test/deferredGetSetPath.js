/*global beforeEach,afterEach,describe,it*/
import './helpers/polyfills'
import { reset, check, expect, expectCount } from './helpers/chaiCounter'
import controller from './helpers/controller'
import set from '../src/factories/set'
import copy from '../src/factories/copy'
import setPath from '../src/operators/setPath'
import getPath from '../src/operators/getPath'

beforeEach(reset)
afterEach(check)

controller.addSignals({
  setTodoViaSetPath: { chain: [
    set(setPath`state:/todos.${'input:/todoId'}`, 'newValue')
  ], immediate: true },
  copyTodoViaGetPath: { chain: [
    copy(getPath`state:/todos.${'input:/todoId'}`, 'state:/output')
  ], immediate: true }
})
const signals = controller.getSignals()
let tree

describe('operators that generate their via other state', function () {
  afterEach(function () {
    controller.reset()
  })

  beforeEach(function () {
    tree = controller.model.tree
    tree.set({
      todos: {
        '1': 'test'
      },
      output: null
    })
    tree.commit()
  })

  it('sets the todo with id given on input', function () {
    expectCount(1)
    signals.setTodoViaSetPath({ todoId: 9 })
    expect(tree.get(['todos', '9'])).to.equal('newValue')
  })

  it('gets the todo with id given on input', function () {
    expectCount(1)
    signals.copyTodoViaGetPath({ todoId: 1 })
    expect(tree.get(['output'])).to.equal('test')
  })
})
