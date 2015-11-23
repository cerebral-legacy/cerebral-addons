import stateToOutput from '../../src/factories/stateToOutput';
import counter, { expect, expectCount } from '../helpers/chaiCounter';

beforeEach(counter.reset);
afterEach(counter.check);

describe('stateToOutput()', function () {

  it('should add a value from state into the output', function () {
    expectCount(2);

    const action = stateToOutput('node', 'newNode');

    action({ node: 'test' }, {
      get(path) {
        expect(path).to.equal('node');
        return '123';
      }
    }, function (output) {
      expect(output).to.eql({ node: 'test', newNode: '123' });
    });
  });

  it('should copy a nested value', function () {
    expectCount(2);

    const action = stateToOutput(['parent', 'node'], ['parent', 'child']);

    action({}, {
      get(path) {
        expect(path).to.eql(['parent', 'node']);
        return {
          node: 'value'
        };
      }
    }, function (output) {
      expect(output).to.eql({
        parent: {
          child: {
            node: 'value'
          }
        }
      });
    });
  });

});
