'use strict';

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks-common');
const auth = require('feathers-authentication');
const local = require('feathers-authentication-local');

exports.before = {
  find: [
    auth.hooks.authenticate(['jwt'])
  ],
  create: [
    local.hooks.hashPassword({ passwordField: 'password' })
  ]
};

exports.after = {
  all: [hooks.remove('password')],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
};
