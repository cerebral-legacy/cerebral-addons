/*global beforeEach,afterEach,describe,it*/
import './helpers/polyfills'
import { expect } from 'chai'
import controller from './helpers/controller'
import copy from '../src/factories/copy'
import and from '../src/operators/and'
import or from '../src/operators/or'
import not from '../src/operators/not'
import isEqual from '../src/operators/isEqual'
import isDeepEqual from '../src/operators/isDeepEqual'

controller.addSignals({
  andTrue: { chain: [copy(and('t1', 't2'), 'output')], sync: true },
  andFalse: { chain: [copy(and('f1', 'f2'), 'output')], sync: true },
  andFalse1: { chain: [copy(and('t1', 'f2'), 'output')], sync: true },
  andFalse2: { chain: [copy(and('f1', 't2'), 'output')], sync: true },
  orTrue: { chain: [copy(or('t1', 't2'), 'output')], sync: true },
  orFalse: { chain: [copy(or('f1', 'f2'), 'output')], sync: true },
  orTrue1: { chain: [copy(or('t1', 'f2'), 'output')], sync: true },
  orTrue2: { chain: [copy(or('f1', 't2'), 'output')], sync: true },
  nestedTrue: { chain: [copy(or('f1', and('t1', or('f2', 't2'))), 'output')], sync: true },
  nestedFalse: { chain: [copy(or('f1', and('t1', 'f2')), 'output')], sync: true },
  not: { chain: [copy(not(or('f1', and('t1', or('f2', 't2')))), 'output')], sync: true },
  isEqual: { chain: [copy(isEqual('eq1', 'eq2'), 'output')], sync: true },
  isNotEqual: { chain: [copy(isEqual('neq1', 'neq2'), 'output')], sync: true },
  isDeepEqual: { chain: [copy(isDeepEqual('deq1', 'deq2'), 'output')], sync: true },
  isNotDeepEqual: { chain: [copy(isDeepEqual('ndeq1', 'ndeq2'), 'output')], sync: true }
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
      eq1: 1, eq2: 1,
      neq1: 1, neq2: 2,
      deq1: { k: 1 }, deq2: { k: 1 },
      ndeq1: { k: 1 }, ndeq2: { k: 2 },
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

  describe('not', function () {
    it('returns false', function () {
      signals.not()
      expect(tree.get(['output'])).to.be.false
    })
  })

  describe('isEqual', function () {
    it('returns true for equal values', function () {
      signals.isEqual()
      expect(tree.get(['output'])).to.be.true
    })

    it('returns false for not equal values', function () {
      signals.isNotEqual()
      expect(tree.get(['output'])).to.be.false
    })
  })

  describe('isDeepEqual', function () {
    it('returns true for equal values', function () {
      signals.isDeepEqual()
      expect(tree.get(['output'])).to.be.true
    })

    it('returns false for not equal values', function () {
      signals.isNotDeepEqual()
      expect(tree.get(['output'])).to.be.false
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
    expect(displayName).to.equal('addons.copy(or(["f1"], and("t1", or("f2", "t2"))), "output")')
  })
})
