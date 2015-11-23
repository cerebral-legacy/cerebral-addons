import when from '../../src/factories/when';
import counter, { expect, expectCount } from '../helpers/chaiCounter';

beforeEach(counter.reset);
afterEach(counter.check);

describe('when()', function () {

  it('should call isTrue when true', function () {
    expectCount(2);

    const action = when('test');

    action({}, {
      get(path) {
        expect(path).to.equal('test');
        return true;
      }
    }, {
      isTrue() {
        expect(true).to.be.ok;
      },
      isFalse() {
      }
    });
  });

  it('should call isFalse when false', function () {
    expectCount(2);

    const action = when('test');

    action({}, {
      get(path) {
        expect(path).to.equal('test');
        return false;
      }
    }, {
      isTrue() {
      },
      isFalse() {
        expect(true).to.be.ok;
      }
    });
  });

  it('should call customTrue when true', function () {
    expectCount(2);

    const action = when('test', { yes: true, no: when.otherwise });

    action({}, {
      get(path) {
        expect(path).to.equal('test');
        return true;
      }
    }, {
      yes() {
        expect(true).to.be.ok;
      },
      no() {
      }
    });
  });

  it('should call customFalse when false', function () {
    expectCount(2);

    const action = when('test', { yes: true, no: when.otherwise });

    action({}, {
      get(path) {
        expect(path).to.equal('test');
        return false;
      }
    }, {
      yes() {
      },
      no() {
        expect(true).to.be.ok;
      }
    });
  });

});
