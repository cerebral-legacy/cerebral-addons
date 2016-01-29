/*global beforeEach,afterEach,describe,it*/
import './helpers/polyfills'
import { reset, check, expect, expectCount } from './helpers/chaiCounter'
import controller from './helpers/controller'
import copy from '../src/factories/copy'

beforeEach(reset)
afterEach(check)

let output
let resolveTest

const getAsync = args => new Promise(resolve => setTimeout(() => resolve('x'), 1))
const setAsync = (args, value) => new Promise(resolve => setTimeout(() => {
  output = value
  resolve()
}, 1))

controller.addSignals({
  customCopy: { chain: [copy(args => 'x', (args, val) => expect(val).to.equal('x'))], sync: true },
  asyncFromCopy: [
    [
      copy(getAsync, (args, val) => output = val),
      { success: [ () => resolveTest() ], error: [] }
    ]
  ],
  asyncToCopy: [
    [
      copy(args => 'x', setAsync),
      { success: [ () => resolveTest() ], error: [] }
    ]
  ],
  asyncFromToCopy: [
    [
      copy(getAsync, setAsync),
      { success: [ () => resolveTest() ], error: [] }
    ]
  ]
})
const signals = controller.getSignals()

describe('custom operators', function () {
  beforeEach(function () {
    output = null
  })

  it('gets the last', function () {
    expectCount(1)
    signals.customCopy()
  })

  it('should copy from an async source', function (done) {
    expectCount(0)
    resolveTest = () => done(output !== 'x' ? new Error('expected x') : undefined)
    signals.asyncFromCopy()
  })

  it('should copy to an async destination', function (done) {
    expectCount(0)
    resolveTest = () => done(output !== 'x' ? new Error('expected x') : undefined)
    signals.asyncToCopy()
  })

  it('should copy from an async source to an async destination', function (done) {
    expectCount(0)
    resolveTest = () => done(output !== 'x' ? new Error('expected x') : undefined)
    signals.asyncFromToCopy()
  })
})
