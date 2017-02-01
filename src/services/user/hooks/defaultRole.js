const checkContext = require('feathers-hooks-common/lib/utils').checkContext;
const getByDot = require('feathers-hooks-common/lib/utils').getByDot;
const setByDot = require('feathers-hooks-common/lib/utils').setByDot;

module.exports = function(role) {
  return (hook) => {
    checkContext(hook, 'before', ['create']);
    let roles = getByDot(hook, 'data.roles');
    if (roles === undefined || roles === []) {
      setByDot(hook, 'data.roles', [role]);
    }
    return Promise.resolve(hook);
  };
};
