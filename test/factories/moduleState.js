/*global beforeEach,afterEach,describe,it*/
import { expect } from 'chai'
import controller from '../helpers/controller'
import copy from '../../src/factories/copy'

controller.addModules({
  mod: (module) => {
    module.addSignals({
      copyAll: { chain: [ copy('state://./', 'output') ], sync: true },
      replaceAll: { chain: [ copy('input:/', 'state://./') ], sync: true }
    })
  }
})
const signals = controller.getSignals()

let tree

describe('module state', function () {
  afterEach(function () {
    controller.reset()
  })

  beforeEach(function () {
    tree = controller.model.tree
    tree.set({
      mod: { val: 'from module' },
      output: null
    })
    tree.commit()
  })

  it('can be copied', function () {
    signals.mod.copyAll()
    expect(tree.get(['output'])).to.eql({ val: 'from module' })
  })

  it('can be replaced', function () {
    signals.mod.replaceAll({ newVal: 'from input' })
    expect(tree.get(['mod'])).to.eql({ newVal: 'from input' })
  })
})
