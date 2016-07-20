/*global beforeEach,afterEach,describe,it*/
import { expect } from 'chai'
import controller from './helpers/controller'
import copy from 'cerebral/operators/copy'
import {
  findWhere,
  merge,
  pop,
  push,
  shift,
  unshift
} from '..'

controller.addSignals({
  findWhere: { chain: [copy(findWhere('array', { value: 'c' }), 'output')], immediate: true },
  merge: { chain: [copy('input:value', merge('output'))], immediate: true },
  pop: { chain: [copy(pop('array'), 'output')], immediate: true },
  push: { chain: [copy('input:value', push('array'))], immediate: true },
  shift: { chain: [copy(shift('array'), 'output')], immediate: true },
  unshift: { chain: [copy('input:value', unshift('array'))], immediate: true }
})
const signals = controller.getSignals()

let tree

describe('state', function () {
  afterEach(function () {
    controller.reset()
  })

  beforeEach(function () {
    tree = controller.model.tree
    tree.set({
      array: [{ value: 'a' }, { value: 'b' }, { value: 'c', other: 2 }, { value: 'd' }],
      output: null
    })
    tree.commit()
  })

  describe('findWhere', function () {
    it('finds the item', function () {
      signals.findWhere()
      expect(tree.get(['output'])).to.eql({ value: 'c', other: 2 })
    })
  })

  describe('merge', function () {
    it('merges state', function () {
      tree.set('output', { before: 1 })
      tree.commit()
      signals.merge({ value: { merged: 'yes' } })
      expect(tree.get(['output'])).to.eql({ before: 1, merged: 'yes' })
    })
  })

  describe('pop', function () {
    it('pops state', function () {
      signals.pop()
      expect(tree.get(['output'])).to.eql({ value: 'd' })
    })
  })

  describe('push', function () {
    it('push to state', function () {
      signals.push({ value: { new: 'value' } })
      const array = tree.get(['array'])
      expect(array[array.length - 1]).to.eql({ new: 'value' })
    })
  })

  describe('shift', function () {
    it('shifts state', function () {
      signals.shift()
      expect(tree.get(['output'])).to.eql({ value: 'a' })
    })
  })

  describe('unshift', function () {
    it('unshift to state', function () {
      signals.unshift({ value: { new: 'value' } })
      expect(tree.get(['array'])[0]).to.eql({ new: 'value' })
    })
  })
})
