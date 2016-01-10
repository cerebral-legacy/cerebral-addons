/*global beforeEach,afterEach,describe,it*/
import { compile } from '../src/helpers/getValue'
import { reset, check, expect, expectCount } from './helpers/chaiCounter'

beforeEach(reset)
afterEach(check)

describe('getValue', function () {
  it('should get a value from input', function () {
    expectCount(2)

    const getValue = compile('input:/some.key')

    expect(getValue.name).to.equal('getInputValue')

    const value = getValue({
      input: {
        some: {
          key: 'inputValue'
        }
      }
    })

    expect(value).to.equal('inputValue')
  })

  it('should get a value from state when given an array', function () {
    expectCount(3)

    const getValue = compile(['state', 'key'])

    expect(getValue.name).to.equal('get')

    const value = getValue({
      state: {
        get (path) {
          expect(path).to.eql(['state', 'key'])
          return 'stateValue'
        }
      }
    })

    expect(value).to.equal('stateValue')
  })

  it('should get a value from state when given a url', function () {
    expectCount(3)

    const getValue = compile('state:/state.key')

    expect(getValue.name).to.equal('getStateValue')

    const value = getValue({
      state: {
        get (path) {
          expect(path).to.eql(['state', 'key'])
          return 'stateValue'
        }
      }
    })

    expect(value).to.equal('stateValue')
  })

  it('should get a value from module state', function () {
    expectCount(3)

    const getValue = compile('state://module/state.key')

    expect(getValue.name).to.equal('getModuleStateValue')

    const value = getValue({
      modules: {
        module: {
          get (path) {
            expect(path).to.eql(['state', 'key'])
            return 'stateValue'
          }
        }
      }
    })

    expect(value).to.equal('stateValue')
  })

  it('should get a value from current module state', function () {
    expectCount(3)

    const getValue = compile('state://./state.key')

    expect(getValue.name).to.equal('getLocalModuleStateValue')

    const value = getValue({
      module: {
        get (path) {
          expect(path).to.eql(['state', 'key'])
          return 'stateValue'
        }
      }
    })

    expect(value).to.equal('stateValue')
  })
})
