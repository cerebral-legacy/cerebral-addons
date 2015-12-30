import set from '../../src/factories/set';
import counter, { expect, expectCount } from '../helpers/chaiCounter';

beforeEach(counter.reset);
afterEach(counter.check);

describe('set()', function () {

  it('should set a value', function () {
    expectCount(2);

    const action = set('test', 'XYZ');

    action({
      state: {
        set: function (path, value) {
          expect(path).to.equal('test');
          expect(value).to.equal('XYZ');
        }
      }
    });
  });

});
