import setTitle from '../../src/factories/setWindowTitle';
import { expect } from 'chai';

describe('setWindowTitle()', function () {

  beforeEach(function () {
    global.document = {};
  });

  afterEach(function () {
    delete global.document;
  });

  it('should set the window title', function () {
    const action = setTitle('Home - My App');

    action();

    expect(document.title).to.equal('Home - My App');
  });

});
