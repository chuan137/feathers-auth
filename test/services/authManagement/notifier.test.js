'use strict';
const chaiAsPromised = require('chai-as-promised');
const notifierGenerator = require('../../../src/services/authManagement/notifier');

let user = {
  email: 'chuan137@gmail.com'
};

module.exports = function(app) {
  const notifier = notifierGenerator(app).notifier;
  describe('Notifier', () => {
    it('sent email successfully', () => {
      return notifier('resendVerifySignup', user, {}).should.be.fulfilled;
    });
  });
};