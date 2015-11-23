import inputToState from '../../src/factories/inputToState';
import counter, { expect, expectCount } from '../helpers/chaiCounter';

beforeEach(counter.reset);
afterEach(counter.check);

describe('inputToState()', function () {

  it('should copy a value', function () {
    expectCount(2);

    const action = inputToState('node', 'node');

    action({ node: 'test' }, {
      set: function (path, value) {
        expect(path).to.equal('node');
        expect(value).to.equal('test');
      }
    });
  });

  it('should copy a nested value', function () {
    expectCount(2);

    const action = inputToState(['parent', 'node'], 'node');

    action({ parent: { node: 'test' } }, {
      set: function (path, value) {
        expect(path).to.equal('node');
        expect(value).to.equal('test');
      }
    });
  });

});
