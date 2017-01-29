'use strict';

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks-common');


exports.before = {
  all: [
    hooks.disable('external')
  ],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
};

exports.after = {
  all: [],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
};
