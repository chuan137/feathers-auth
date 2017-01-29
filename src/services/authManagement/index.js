'use strict';

const authManagement = require('feathers-authentication-management');
const hooks = require('./hooks');

module.exports = function(){
  const app = this;

  app.configure(authManagement());

  app.service('authManagement').hooks({
    before: hooks.before,
    after: hooks.after
  });
};
