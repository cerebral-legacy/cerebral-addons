/*global beforeEach,afterEach,describe,it*/
import when from '../../src/factories/when'
import { reset, check, expect, expectCount } from '../helpers/chaiCounter'

beforeEach(reset)
afterEach(check)

describe('when()', function () {
  it('should call true when true', function () {
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
        true () {
          expect(true).to.be.ok
        },
        false () {
        }
      }
    })
  })

  it('should call true when input is true', function () {
    expectCount(1)

    const action = when('input:/test')

    action({
      input: {
        test: true
      },
      output: {
        true () {
          expect(true).to.be.ok
        },
        false () {
        }
      }
    })
  })

  it('should call false when false', function () {
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
        true () {
        },
        false () {
          expect(true).to.be.ok
        }
      }
    })
  })

  it('should call false when input is false', function () {
    expectCount(1)

    const action = when('input:/test')

    action({
      input: {
        test: false
      },
      output: {
        true () {
        },
        false () {
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

  it('should call implicitally add otherwise when not supplied', function () {
    expectCount(2)

    const action = when('test', { yes: true })

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
        otherwise () {
          expect(true).to.be.ok
        }
      }
    })
  })

  it('should accept an array of conditions', function () {
    expectCount(2)

    const action = when('test', [ 'yes', 'no' ])

    action({
      state: {
        get (path) {
          expect(path).to.equal('test')
          return 'no'
        }
      },
      output: {
        yes () {
        },
        no () {
          expect(true).to.be.ok
        },
        otherwise () {
        }
      }
    })
  })
})
