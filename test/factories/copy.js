/*global beforeEach,afterEach,describe,it*/
import copy from '../../src/factories/copy'
import { reset, check, expect, expectCount } from '../helpers/chaiCounter'

beforeEach(reset)
afterEach(check)

describe('copy()', function () {
  it('should copy a value', function () {
    expectCount(3)

    const action = copy('from', 'to')

    action({
      state: {
        get (path) {
          expect(path).to.equal('from')
          return 'test'
        },
        set (path, value) {
          expect(path).to.equal('to')
          expect(value).to.equal('test')
        }
      }
    })
  })

  it('should copy a nested value', function () {
    expectCount(3)

    const action = copy(['parent', 'node'], 'to')

    action({
      state: {
        get (path) {
          expect(path).to.eql(['parent', 'node'])
          return 'test'
        },
        set (path, value) {
          expect(path).to.equal('to')
          expect(value).to.equal('test')
        }
      }
    })
  })

  it('should add a value from state into the output', function () {
    expectCount(2)

    const action = copy('node', 'output:/newNode')

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

    const action = copy(['parent', 'node'], 'output:/parent.child')

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

  it('should copy a nested value from a url', function () {
    expectCount(2)

    const action = copy('state:/parent.node', 'output:/parent.child')

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

  it('chains outputs', function () {
    expectCount(3)
    const double = (args, value) => value * 2
    const action = copy('from', double, 'to')

    action({
      state: {
        get (path) {
          expect(path).to.equal('from')
          return 2
        },
        set (path, value) {
          expect(path).to.equal('to')
          expect(value).to.equal(4)
        }
      }
    })
  })
})
