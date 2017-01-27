'use strict';

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks-common');
const auth = require('feathers-authentication');
const local = require('feathers-authentication-local');
const checkContext = require('feathers-hooks-common/lib/utils').checkContext;
const getByDot = require('feathers-hooks-common/lib/utils').getByDot;
const setByDot = require('feathers-hooks-common/lib/utils').setByDot;


const defaultRole = (role) => {
  return (hook) => {
    checkContext(hook, 'before', ['create']);
    let roles = getByDot(hook, 'data.roles');
    if (roles === undefined || roles === []) {
      setByDot(hook, 'data.roles', [role]);
    }
    return Promise.resolve(hook);
  };
};

exports.before = {
  find: [
    auth.hooks.authenticate(['jwt'])
  ],
  create: [
    local.hooks.hashPassword({ passwordField: 'password' }),
    defaultRole('user')
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
