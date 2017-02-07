'use strict';

const authManagement = require('feathers-authentication-management');
const hooks = require('./hooks');
const Notifier = require('./notifier');

module.exports = function(){
  const app = this;
  const options = {
    notifier: Notifier(app)
  };

  app.configure(authManagement(options));

  app.service('authManagement').hooks({
    before: hooks.before,
    after: hooks.after
  });
};
