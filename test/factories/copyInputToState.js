import copyInputToState from '../../src/factories/copyInputToState';
import counter, { expect, expectCount } from '../helpers/chaiCounter';

beforeEach(counter.reset);
afterEach(counter.check);

describe('copyInputToState()', function () {

  it('should copy a value', function () {
    expectCount(2);

    const action = copyInputToState('node', 'node');

    action({ node: 'test' }, {
      set: function (path, value) {
        expect(path).to.equal('node');
        expect(value).to.equal('test');
      }
    });
  });

  it('should copy a nested value', function () {
    expectCount(2);

    const action = copyInputToState(['parent', 'node'], 'node');

    action({ parent: { node: 'test' } }, {
      set: function (path, value) {
        expect(path).to.equal('node');
        expect(value).to.equal('test');
      }
    });
  });

});
