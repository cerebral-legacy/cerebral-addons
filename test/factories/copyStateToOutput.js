import copyStateToOutput from '../../src/factories/copyStateToOutput';
import counter, { expect, expectCount } from '../helpers/chaiCounter';

beforeEach(counter.reset);
afterEach(counter.check);

describe('copyStateToOutput()', function () {

  it('should add a value from state into the output', function () {
    expectCount(2);

    const action = copyStateToOutput('node', 'newNode');

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

    const action = copyStateToOutput(['parent', 'node'], ['parent', 'child']);

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
