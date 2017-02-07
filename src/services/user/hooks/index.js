'use strict';

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks-common');
const auth = require('feathers-authentication');
const local = require('feathers-authentication-local');
const verifyHooks = require('feathers-authentication-management').hooks;
const defaultRole = require('./defaultRole');

exports.before = {
  find: [
    auth.hooks.authenticate(['jwt'])
  ],
  create: [
    local.hooks.hashPassword({ passwordField: 'password' }),
    defaultRole('user'),
    verifyHooks.addVerification()
  ]
};

exports.after = {
  all: [hooks.remove('password')],
  find: [],
  get: [],
  create: [ 
    verifyHooks.removeVerification(), // when and what to remove
    globalHooks.sendVerifySignup()
  ],
  update: [],
  patch: [],
  remove: []
};
