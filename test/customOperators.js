/*global beforeEach,afterEach,describe,it*/
import { reset, check, expect, expectCount } from './helpers/chaiCounter'
import controller from './helpers/controller'
import copy from '../src/factories/copy'

beforeEach(reset)
afterEach(check)

controller.signalsSync({
  customCopy: [copy(args => 'x', (args, val) => expect(val).to.equal('x'))]
})
const signals = controller.getSignals()

describe('custom operators', function () {
  it('gets the last', function () {
    expectCount(1)
    signals.customCopy()
  })
})
