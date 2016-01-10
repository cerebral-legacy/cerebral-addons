/*global beforeEach,afterEach,describe,it*/
import set from '../../src/factories/set'
import { reset, check, expect, expectCount } from '../helpers/chaiCounter'

beforeEach(reset)
afterEach(check)

describe('set()', function () {
  it('should set a value', function () {
    expectCount(2)

    const action = set('test', 'XYZ')

    action({
      state: {
        set: function (path, value) {
          expect(path).to.equal('test')
          expect(value).to.equal('XYZ')
        }
      }
    })
  })
})
