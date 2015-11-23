import resetState from '../../src/factories/resetState';
import counter, { expect, expectCount } from '../helpers/chaiCounter';

beforeEach(counter.reset);
afterEach(counter.check);

describe('resetState()', function () {

  it('should reset the store', function () {
    expectCount(1);

    const action = resetState();

    action({}, {
      set: function (value) {
        expect(value).to.eql({
          node: 'test'
        });
      }
    }, {}, {
      initialState: {
        node: 'test'
      }
    });
  });

  it('should reset a store node', function () {
    expectCount(2);

    const action = resetState('node');

    action({}, {
      set: function (path, value) {
        expect(path).to.equal('node');
        expect(value).to.equal('test');
      }
    }, {}, {
      initialState: {
        node: 'test'
      }
    });
  });

});
