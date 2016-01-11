/*global beforeEach,afterEach,describe,it*/
import when from '../../src/factories/when'
import { reset, check, expect, expectCount } from '../helpers/chaiCounter'

beforeEach(reset)
afterEach(check)

describe('when()', function () {
  it('should call isTrue when true', function () {
    expectCount(2)

    const action = when('test')

    action({
      state: {
        get (path) {
          expect(path).to.equal('test')
          return true
        }
      },
      output: {
        isTrue () {
          expect(true).to.be.ok
        },
        isFalse () {
        }
      }
    })
  })

  it('should call isTrue when input is true', function () {
    expectCount(1)

    const action = when('input:/test')

    action({
      input: {
        test: true
      },
      output: {
        isTrue () {
          expect(true).to.be.ok
        },
        isFalse () {
        }
      }
    })
  })

  it('should call isFalse when false', function () {
    expectCount(2)

    const action = when('test')

    action({
      state: {
        get (path) {
          expect(path).to.equal('test')
          return false
        }
      },
      output: {
        isTrue () {
        },
        isFalse () {
          expect(true).to.be.ok
        }
      }
    })
  })

  it('should call isFalse when input is false', function () {
    expectCount(1)

    const action = when('input:/test')

    action({
      input: {
        test: false
      },
      output: {
        isTrue () {
        },
        isFalse () {
          expect(true).to.be.ok
        }
      }
    })
  })

  it('should call customTrue when true', function () {
    expectCount(2)

    const action = when('test', { yes: true, no: when.otherwise })

    action({
      state: {
        get (path) {
          expect(path).to.equal('test')
          return true
        }
      },
      output: {
        yes () {
          expect(true).to.be.ok
        },
        no () {
        }
      }
    })
  })

  it('should call customFalse when false', function () {
    expectCount(2)

    const action = when('test', { yes: true, no: when.otherwise })

    action({
      state: {
        get (path) {
          expect(path).to.equal('test')
          return false
        }
      },
      output: {
        yes () {
        },
        no () {
          expect(true).to.be.ok
        }
      }
    })
  })
})
