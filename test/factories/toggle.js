import toggle from '../../src/factories/toggle';
import counter, { expect, expectCount } from '../helpers/chaiCounter';

beforeEach(counter.reset);
afterEach(counter.check);

describe('toggle()', function () {

  it('should toggle true and false', function () {
    expectCount(3);

    const action = toggle('test');

    action({}, {
      get: function (path) {
        expect(path).to.equal('test');
        return false;
      },
      set: function (path, value) {
        expect(path).to.equal('test');
        expect(value).to.equal(true);
      }
    });
  });

  it('should toggle custom values', function () {
    expectCount(3);

    const action = toggle('test', 'ON', 'OFF');

    action({}, {
      get: function (path) {
        expect(path).to.equal('test');
        return 'ON';
      },
      set: function (path, value) {
        expect(path).to.equal('test');
        expect(value).to.equal('OFF');
      }
    });
  });

});
