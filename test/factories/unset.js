import unset from '../../src/factories/unset';
import counter, { expect, expectCount } from '../helpers/chaiCounter';

beforeEach(counter.reset);
afterEach(counter.check);

describe('unset()', function () {

  it('should unset a value', function () {
    expectCount(1);

    const action = unset('test');

    action({
      state: {
        unset: function (path) {
          expect(path).to.equal('test');
        }
      }
    });
  });

});
