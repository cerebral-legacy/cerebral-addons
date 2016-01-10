/*global beforeEach,afterEach,describe,it*/
import unset from '../../src/factories/unset'
import { reset, check, expect, expectCount } from '../helpers/chaiCounter'

beforeEach(reset)
afterEach(check)

describe('unset()', function () {
  it('should unset a value', function () {
    expectCount(1)

    const action = unset('test')

    action({
      state: {
        unset (path) {
          expect(path).to.equal('test')
        }
      }
    })
  })
})
