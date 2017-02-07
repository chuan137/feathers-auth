'use strict';

const _ = require('lodash');
const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks-common');
const auth = require('feathers-authentication');
const local = require('feathers-authentication-local');
const verifyHooks = require('feathers-authentication-management').hooks;
const addDefaultRole = require('./addDefaultRole');

const isRoleSet = (hook) =>
  hook.data.roles && hook.data.roles instanceof Array && hook.data.roles.length > 0;
const isNotRoleSet = (hook) => !isRoleSet(hook);
const isAdmin = (hook) =>
  hook.data.roles && hook.data.roles instanceof Array && _.includes(hook.data.roles, 'admin');
const isNotAdmin = (hook) => !isAdmin(hook);

exports.before = {
  find: [
    auth.hooks.authenticate(['jwt'])
  ],
  create: [
    local.hooks.hashPassword({
      passwordField: 'password'
    }),
    hooks.iff(isNotRoleSet, addDefaultRole('user')),
    verifyHooks.addVerification()
  ]
};

exports.after = {
  all: [hooks.remove('password')],
  find: [],
  get: [],
  create: [
    verifyHooks.removeVerification(), // when and what to remove
    hooks.iff(isNotAdmin, globalHooks.sendVerifySignup())
  ],
  update: [],
  patch: [],
  remove: []
};