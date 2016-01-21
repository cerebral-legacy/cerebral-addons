/*global beforeEach,afterEach,describe,it*/
import { expect } from 'chai'
import controller from './helpers/controller'
import copy from '../src/factories/copy'
import and from '../src/operators/and'
import or from '../src/operators/or'

controller.signalsSync({
  andTrue: [copy(and('t1', 't2'), 'output')],
  andFalse: [copy(and('f1', 'f2'), 'output')],
  andFalse1: [copy(and('t1', 'f2'), 'output')],
  andFalse2: [copy(and('f1', 't2'), 'output')],
  orTrue: [copy(or('t1', 't2'), 'output')],
  orFalse: [copy(or('f1', 'f2'), 'output')],
  orTrue1: [copy(or('t1', 'f2'), 'output')],
  orTrue2: [copy(or('f1', 't2'), 'output')],
  nestedTrue: [copy(or('f1', and('t1', or('f2', 't2'))), 'output')],
  nestedFalse: [copy(or('f1', and('t1', 'f2')), 'output')]
})
const signals = controller.getSignals()

let tree

describe('operators', function () {
  afterEach(function () {
    controller.reset()
  })

  beforeEach(function () {
    tree = controller.model.tree
    tree.set({
      t1: 1, t2: 2,
      f1: '', f2: {},
      output: null
    })
    tree.commit()
  })

  describe('and', function () {
    it('gets the last', function () {
      signals.andTrue()
      expect(tree.get(['output'])).to.equal(2)
    })

    it('returns undefined when all false', function () {
      signals.andFalse()
      expect(tree.get(['output'])).to.be.undefined
    })

    it('returns undefined when second false', function () {
      signals.andFalse1()
      expect(tree.get(['output'])).to.be.undefined
    })

    it('returns undefined when first false', function () {
      signals.andFalse2()
      expect(tree.get(['output'])).to.be.undefined
    })
  })

  describe('or', function () {
    it('gets the first', function () {
      signals.orTrue()
      expect(tree.get(['output'])).to.equal(1)
    })

    it('returns undefined when all false', function () {
      signals.orFalse()
      expect(tree.get(['output'])).to.be.undefined
    })

    it('returns true when first false', function () {
      signals.orTrue1()
      expect(tree.get(['output'])).to.equal(1)
    })

    it('returns true when second false', function () {
      signals.orTrue2()
      expect(tree.get(['output'])).to.equal(2)
    })
  })

  it('returns true for nested operators', function () {
    signals.nestedTrue()
    expect(tree.get(['output'])).to.equal(2)
  })

  it('returns undefined for nested operators', function () {
    signals.nestedFalse()
    expect(tree.get(['output'])).to.be.undefined
  })

  it('shows full details in the displayName', function () {
    const displayName = copy(or(['f1'], and('t1', or('f2', 't2'))), 'output').displayName
    expect(displayName).to.equal('copy(or(["f1"], and("t1", or("f2", "t2"))), "output")')
  })
})
