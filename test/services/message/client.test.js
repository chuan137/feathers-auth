const common = require('../../common');
const chai = common.chai;
const assert = common.assert;
const expect = common.expect;
const url = common.url;

let id;

module.exports = function() {

  describe('/messages', () => {
    it('should create message', () => {
      return chai.request(url)
        .post('/messages')
        .set('Accept', 'application/json')
        .send({
          text: 'this is my text'
        })
        .then(res => {
          expect(res).to.have.status(201);
          res.body.should.have.property('id');
          res.body.should.have.property('text');
          res.body.text.should.equal('this is my text');
          id = res.body.id;
        });
    });

    it('should show message', () => {
      return chai.request(url)
        .get(`/messages/${id}`)
        .set('Accept', 'application/json')
        .then(res => {
          res.body.should.have.property('text');
          res.body.text.should.equal('this is my text');
        });
    });
  });
};