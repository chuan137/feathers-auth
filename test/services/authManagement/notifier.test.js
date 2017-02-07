'use strict';
const chaiAsPromised = require('chai-as-promised');
const Notifier = require('../../../src/services/authManagement/notifier');

let user = {
  email: 'chuan137@gmail.com'
};

module.exports = function(app) {
  const notifier = Notifier(app);
  describe('Notifier', () => {
    it.skip('sent email successfully', () => {
      return notifier('resendVerifySignup', user, {}).should.be.fulfilled;
    });
  });
};