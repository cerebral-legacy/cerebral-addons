import resetState from '../../src/factories/resetState';
import counter, { expect, expectCount } from '../helpers/chaiCounter';

beforeEach(counter.reset);
afterEach(counter.check);

describe('resetState()', function () {

  it('should reset the store', function () {
    expectCount(1);

    const action = resetState({
      store: {
        reset: function () {
          expect(true).to.be.ok;
        }
      }
    });

    action();
  });


  it('should reset a store node', function () {
    expectCount(2);

    const action = resetState({
      store: {
        initialState: {
          node: 'test'
        }
      }
    }, 'node');

    action({}, {
      set: function (path, value) {
        expect(path).to.equal('node');
        expect(value).to.equal('test');
      }
    });
  });

});
