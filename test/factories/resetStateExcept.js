import resetStateExcept from '../../src/factories/resetStateExcept';
import counter, { expect, expectCount } from '../helpers/chaiCounter';

beforeEach(counter.reset);
afterEach(counter.check);

describe('resetStateExcept()', function () {

  it('should not reset all state', function () {
    expectCount(4);

    const action = resetStateExcept('leaveMeAlone');

    action({}, {
      get: function (path) {
        expect(path).to.equal('leaveMeAlone');
        return 'OK';
      },
      set: function (path, value) {
        if (value) {
          expect(path).to.equal('leaveMeAlone');
          expect(value).to.equal('OK');
        } else {
          expect(path).to.eql({
            node: 'test'
          });
        }
      }
    }, {}, {
      initialState: {
        node: 'test'
      }
    });
  });

});
