import timer from '../../src/factories/timer';
import counter, { expect, expectCount } from '../helpers/chaiCounter';

beforeEach(counter.reset);
afterEach(counter.check);

describe('timer', function () {

  it('should timout', function (done) {
    expectCount(2);

    const chain = timer.start('test', 1);

    expect(chain.length).to.equal(2);

    chain[0]({}, {}, {
      timeout: function () {
        expect(true).to.be.ok;
        done();
      },
      cancel: function () {
      }
    });
  });

  it('should return default action arrays', function () {
    expectCount(2);

    const chain = timer.start('test', 1);

    expect(chain.length).to.equal(2);
    expect(chain[1]).to.eql({
      timeout: [],
      cancel: []
    });
  });

  it('should return canel and timeout actions', function () {
    expectCount(2);

    const chain = timer.start('test', 1, {
      timeout: 'timeout',
      cancel: 'cancel'
    });

    expect(chain.length).to.equal(2);
    expect(chain[1]).to.eql({
      timeout: 'timeout',
      cancel: 'cancel'
    });
  });

  it('can be cancelled', function () {
    expectCount(3);

    const chain = timer.start('test', 1000);

    expect(chain.length).to.equal(2);

    chain[0]({}, {}, {
      timeout: function () {
      },
      cancel: function (input) {
        expect(input.reason).to.equal('becuase');
      }
    });
    timer.cancel('test', { reason: 'becuase' })[0]({}, {}, function () {
      expect(true).to.be.ok;
    });
  });

  it('can be paused and resumed', function (done) {
    expectCount(4);

    const chain = timer.start('test', 1);

    expect(chain.length).to.equal(2);

    chain[0]({}, {}, {
      timeout: function () {
        expect(true).to.be.ok;
        done();
      },
      cancel: function () {
      }
    });

    timer.pause('test')[0]({}, {}, function () {
      expect(true).to.be.ok;
      timer.restart('test')[0]({}, {}, function () {
        expect(true).to.be.ok;
      });
    });
  });

});
