'use strict';

const Notifier = require('../services/authManagement/notifier');
const debug=require('debug')('MyApp:globalHooks:sendVerifySignup');

module.exports = function(options) {
  return function(hook) {
    const app = hook.app;
    const data = hook.data;
    const notifier = Notifier(app);

    debug(data);
    
    notifier('sendVerifySignup', data)
      .then(() => {
        return hook;
      });
  };
};