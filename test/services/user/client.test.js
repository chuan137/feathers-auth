const common = require('../../common');
const clientApp = common.restClient;
const serverApp = common.server;
const assert = common.assert;

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
          return Promise.resolve(user);
        });
      return promise.should.be.fulfilled;
    });
  });
};