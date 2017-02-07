const checkContext = require('feathers-hooks-common/lib/utils').checkContext;
const getByDot = require('feathers-hooks-common/lib/utils').getByDot;
const setByDot = require('feathers-hooks-common/lib/utils').setByDot;
const debug = require('debug')('users:hooks:defaultRole');

module.exports = function(role) {
  return (hook) => {
    checkContext(hook, 'before', ['create']);
    let roles = hook.data.roles;
    if (roles instanceof Array) {
      hook.data.roles = roles.concat([role]);
    } else {
      hook.data.roles = [role];
    }
    return Promise.resolve(hook);
  };
};