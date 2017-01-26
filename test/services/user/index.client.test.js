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

describe('API: /users', () => {
  before((done) => {
    this.server = serverApp.listen('3030');
    this.server.once('listening', () => done());
  });

  after((done) => {
    UserApi.remove(id, () => {
      this.server.close();
      done();
    });
  });

  it('create user', () => {
    let promise = UserApi.create(testUser)
      .then(user => {
        id = user.id;
        token = user.token;
        return Promise.resolve(user);
      });
    return promise.should.be.fulfilled;
  });
});