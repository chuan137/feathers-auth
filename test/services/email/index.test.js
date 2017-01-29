'use strict';

const common = require('../../common');
const app = require('../../../src/app');
const assert = common.assert;

const email = {
  from: process.env.GMAIL,
  to: 'chuan137@gmail.com',
  subject: 'Confirm Signup',
  html: 'test email from feathers'
};

describe('email service', function() {
  it('registered the emails service', () => {
    assert.ok(app.service('emails'));
  });

  it.skip('sent a email via google', () => {
    const emailPromise = app.service('emails').create(email);
    return emailPromise.should.be.fulfilled;
  });
});