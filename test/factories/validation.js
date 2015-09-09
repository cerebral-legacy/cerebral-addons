import counter, { expect, expectCount } from '../helpers/chaiCounter';
import validate from '../../src/factories/validation';

beforeEach(counter.reset);
afterEach(counter.check);

describe('validation', function () {

  describe('validate.email()', function () {

    it('should unset error state when email valid', function () {
      expectCount(3);

      const action = validate.email('email');

      action({}, {
        get(path) {
          if (Array.isArray(path)) {
            expect(path).to.eql(['validation']);
            return {};
          } else {
            expect(path).to.equal('email');
            return 'test@test.com';
          }
        },
        unset(path) {
          expect(path).to.eql(['validation', 'email']);
        }
      });
    });

    it('should set error state when email invalid', function () {
      expectCount(3);

      const action = validate.email('email', { errorPath: 'error' });

      action({}, {
        get(path) {
          expect(path).to.equal('email');
          return 'test@test';
        },
        set(path, value) {
          expect(path).to.equal('error');
          expect(value).to.equal('emailInvalid');
        }
      });
    });

  });

  describe('validate.required()', function () {

    it('should unset error state when present', function () {
      expectCount(3);

      const action = validate.required('email');

      action({}, {
        get(path) {
          if (Array.isArray(path)) {
            expect(path).to.eql(['validation']);
            return {};
          } else {
            expect(path).to.equal('email');
            return 'test@test.com';
          }
        },
        unset(path) {
          expect(path).to.eql(['validation', 'email']);
        }
      });
    });

    it('should set error state when missing', function () {
      expectCount(3);

      const action = validate.required('email', { errorPath: 'error', errorKey: 'errorKey' });

      action({}, {
        get(path) {
          expect(path).to.equal('email');
          return '';
        },
        set(path, value) {
          expect(path).to.equal('error');
          expect(value).to.equal('errorKey');
        }
      });
    });

  });

  describe('validate.equal()', function () {

    it('should unset error state when the same', function () {
      expectCount(4);

      const action = validate.equal('email1', 'email2');

      action({}, {
        get(path) {
          if (Array.isArray(path)) {
            expect(path).to.eql(['validation']);
            return {};
          } else {
            expect(['email1', 'email2']).to.include(path);
            return 'test@test.com';
          }
        },
        unset(path, value) {
          expect(path).to.eql(['validation', 'email1']);
        }
      });
    });

    it('should set error state when different', function () {
      expectCount(4);

      const action = validate.equal('email1', 'email2', { errorPath: 'error' });

      action({}, {
        get(path) {
          expect(['email1', 'email2']).to.include(path);
          return path === 'email1' ? 'test1@test.com' : 'test2@test.com';
        },
        set(path, value) {
          expect(path).to.equal('error');
          expect(value).to.equal('email1NotEqual');
        }
      });
    });

  });

  describe('validate.password()', function () {

    it('should unset error state when password is strong', function () {
      expectCount(3);

      const action = validate.password('password');

      action({}, {
        get(path) {
          if (Array.isArray(path)) {
            expect(path).to.eql(['validation']);
            return {};
          } else {
            expect(path).to.equal('password');
            return 'Aa8*i£sv';
          }
        },
        unset(path) {
          expect(path).to.eql(['validation', 'password']);
        }
      });
    });

    it('should set error state when password is too short', function () {
      expectCount(4);

      const action = validate.password('password', {
        minLength: 9
      });

      action({}, {
        get(path) {
          if (Array.isArray(path)) {
            expect(path).to.eql(['validation']);
            return {};
          } else {
            expect(path).to.equal('password');
            return 'Aa8*i£sv';
          }
        },
        set(path, value) {
          expect(path).to.eql(['validation', 'password']);
          expect(value).to.equal('passwordInvalid');
        }
      });
    });

    it('should set error state when password phrase is too short', function () {
      expectCount(4);

      const action = validate.password('password', {
        minPhraseLength: 33
      });

      action({}, {
        get(path) {
          if (Array.isArray(path)) {
            expect(path).to.eql(['validation']);
            return {};
          } else {
            expect(path).to.equal('password');
            return 'this password is not long enough';
          }
        },
        set(path, value) {
          expect(path).to.eql(['validation', 'password']);
          expect(value).to.equal('passwordInvalid');
        }
      });
    });

    it('should unset error state when password phrase is long enough', function () {
      expectCount(3);

      const action = validate.password('password', {
        minPhraseLength: 28
      });

      action({}, {
        get(path) {
          if (Array.isArray(path)) {
            expect(path).to.eql(['validation']);
            return {};
          } else {
            expect(path).to.equal('password');
            return 'this password is long enough';
          }
        },
        unset(path) {
          expect(path).to.eql(['validation', 'password']);
        }
      });
    });

    it('should set error state when password has repeating chars', function () {
      expectCount(4);

      const action = validate.password('password');

      action({}, {
        get(path) {
          if (Array.isArray(path)) {
            expect(path).to.eql(['validation']);
            return {};
          } else {
            expect(path).to.equal('password');
            return 'this password haaas repeating chars';
          }
        },
        set(path, value) {
          expect(path).to.eql(['validation', 'password']);
          expect(value).to.equal('passwordInvalid');
        }
      });
    });

    it('should set error state when password is not complex', function () {
      expectCount(4);

      const action = validate.password('password', {
        minPassingTests: 2
      });

      action({}, {
        get(path) {
          if (Array.isArray(path)) {
            expect(path).to.eql(['validation']);
            return {};
          } else {
            expect(path).to.equal('password');
            return 'testpassword';
          }
        },
        set(path, value) {
          expect(path).to.eql(['validation', 'password']);
          expect(value).to.equal('passwordInvalid');
        }
      });
    });

    it('should unset error state when password is complex enough', function () {
      expectCount(3);

      const action = validate.password('password', {
        minPassingTests: 2
      });

      action({}, {
        get(path) {
          if (Array.isArray(path)) {
            expect(path).to.eql(['validation']);
            return {};
          } else {
            expect(path).to.equal('password');
            return 'testpassword1';
          }
        },
        unset(path) {
          expect(path).to.eql(['validation', 'password']);
        }
      });
    });

  });

});
