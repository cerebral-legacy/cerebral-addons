/*global beforeEach,afterEach,describe,it*/
import stateToOutput from '../../src/factories/stateToOutput'
import { reset, check, expect, expectCount } from '../helpers/chaiCounter'

beforeEach(reset)
afterEach(check)

describe('stateToOutput()', function () {
  it('should add a value from state into the output', function () {
    expectCount(2)

    const action = stateToOutput('node', 'newNode')

    action({
      input: { node: 'test' },
      state: {
        get (path) {
          expect(path).to.equal('node')
          return '123'
        }
      },
      output (output) {
        expect(output).to.eql({ node: 'test', newNode: '123' })
      }
    })
  })

  it('should copy a nested value', function () {
    expectCount(2)

    const action = stateToOutput(['parent', 'node'], ['parent', 'child'])

    action({
      input: {},
      state: {
        get (path) {
          expect(path).to.eql(['parent', 'node'])
          return {
            node: 'value'
          }
        }
      },
      output (output) {
        expect(output).to.eql({
          parent: {
            child: {
              node: 'value'
            }
          }
        })
      }
    })
  })
})
