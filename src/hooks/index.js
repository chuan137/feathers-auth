'use strict';

// Add any common hooks you want to share across services in here.
// 
// Below is an example of how a hook is written and exported. Please
// see http://docs.feathersjs.com/hooks/readme.html for more details
// on hooks.

exports.myHook = function(options) {
  return function(hook) {
    console.log('My custom global hook ran. Feathers is awesome!');
  };
};

exports.sendVE = function(options) {
  return function(hook) {
    const app = hook.app;
    const emailService = app.service('emails');
    const authManagementService = app.service('authManagement');

    // authManagementService.create({
    //   action: 'checkUnique',
    //   value: {
    //     email: 'chuan137@gmail.com'
    //   }, // e.g. {email, username}. Props with null or undefined are ignored.
    //   ownId: 'abc',
    //   meta: {
    //     error: 'nothing here'
    //   }, // if return an error.message if not unique
    // }).then(res => console.log(res));

    console.log('send verification email');

    return hook;
  };
};