'use strict';

const authManagement = require('feathers-authentication-management');
const hooks = require('./hooks');
const notifier = require('./notifier');

module.exports = function(){
  const app = this;

  app.configure(authManagement(notifier(app)));

  app.service('authManagement').hooks({
    before: hooks.before,
    after: hooks.after
  });
};
