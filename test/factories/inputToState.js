/*global beforeEach,afterEach,describe,it*/
import inputToState from '../../src/factories/inputToState'
import { reset, check, expect, expectCount } from '../helpers/chaiCounter'

beforeEach(reset)
afterEach(check)

describe('inputToState()', function () {
  it('should copy a value', function () {
    expectCount(2)

    const action = inputToState('node', 'node')

    action({
      input: { node: 'test' },
      state: {
        set: function (path, value) {
          expect(path).to.equal('node')
          expect(value).to.equal('test')
        }
      }
    })
  })

  it('should copy a nested value', function () {
    expectCount(2)

    const action = inputToState(['parent', 'node'], 'node')

    action({
      input: { parent: { node: 'test' } },
      state: {
        set: function (path, value) {
          expect(path).to.equal('node')
          expect(value).to.equal('test')
        }
      }
    })
  })
})
