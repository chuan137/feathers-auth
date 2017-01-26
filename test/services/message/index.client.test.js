const common = require('../../common');
const clientApp = common.restClient;
const serverApp = common.server;
const assert = common.assert;

let id;

describe('message api', () => {
  before((done) => {
    this.server = serverApp.listen('3030');
    this.server.once('listening', () => {
      clientApp.service('messages').create({
        text: 'this is my text'
      }).then((msg) => {
        id = msg.id;
        done();
      });
    });
  });

  after((done) => {
    clientApp.service('messages').remove(id, () => {
      this.server.close();
      done();
    });
  });

  it('is successful', () => {
    assert.ok(true);
  });
});