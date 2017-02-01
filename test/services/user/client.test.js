const common = require('../../common');
const clientApp = common.restClient;
const auth = common.authClient;
// const serverApp = common.server;
const assert = common.assert;
const expect = common.expect;

let id;
let token;

const testUser = {
  email: 'testUser@feathers.js',
  password: 'secretkey'
};

const UserApi = clientApp.service('users');

module.exports = function() {
  describe('/users', () => {
    after((done) => {
      UserApi.remove(id, () => done());
    });

    it('create user', () => {
      let promise = UserApi.create(testUser)
        .then(user => {
          id = user.id;
          token = user.verifyToken;
          return Promise.resolve(user);
        });
      return promise.should.be.fulfilled;
    });

    it.skip('email not verified', () =>
      clientApp.authenticate({
        strategy: 'local',
        email: testUser.email,
        password: testUser.password
      })
      .should.be.rejectedWith(
        'User\'s email is not yet verified')
    );

    it('verified email', () =>
      auth.verifySignupLong(token).should.be.fulfilled
    );

    it('authenticated', () =>
      expect(
        clientApp.authenticate({
          strategy: 'local',
          email: testUser.email,
          password: testUser.password
        })
      ).to.eventually.have.property('accessToken')
    );
  });
};