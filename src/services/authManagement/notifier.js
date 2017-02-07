'use strict';

const isProd = process.env.NODE_ENV === 'production';
const path = require('path');
const returnEmail = process.env.COMPLAINT_EMAIL;
const jade = require('jade');
const debug = require('debug')('authManagement:notifier');

module.exports = function(app) {
  function getLink(type, hash) {
    const port = (app.get('port') === '80' || isProd) ? '' : ':' + app.get('port');
    const host = (app.get('host') === 'HOST') ? 'localhost' : app.get('host');
    const protocal = (app.get('protocal') === 'PROTOCAL') ? 'http' : app.get('protocal');
    return `${protocal}://${host}${port}/login/${type}/${hash}`;
  }

  function sendEmail(email) {
    return app.service('emails')
      .create(email)
      .then(function(result) {
        console.log('Sent email', result);
      }).catch(err => {
        console.log('Error sending email', err);
      });
  }

  return {
    notifier: function(type, user, notifierOptions) {
      debug(`-- Preparing email for ${type}`);
      let hashLink;
      let email;
      let emailAccountTemplatesPath = path.join(app.get('src'), 'email-templates', 'account');
      let templatePath;
      let compiledHTML;
      switch (type) {
        case 'resendVerifySignup':
        case 'verifySignup': 
          hashLink = getLink('verify', user.verifyToken);
          templatePath = path.join(emailAccountTemplatesPath, 'verify-email.jade');
          compiledHTML = jade.compileFile(templatePath)({
            logo: '',
            name: user.name || user.email,
            hashLink,
            returnEmail
          });
          email = {
            from: process.env.GMAIL,
            to: user.email,
            subject: 'Confirm Signup',
            html: compiledHTML
          };
          return sendEmail(email);
        // case 'sendResetPwd': // inform that user's email is now confirmed
        //   hashLink = getLink('reset', user.resetToken)
        //   templatePath = path.join(emailAccountTemplatesPath, 'reset-password.jade')
        //   compiledHTML = jade.compileFile(templatePath)({
        //     logo: '',
        //     name: user.name || user.email,
        //     hashLink,
        //     returnEmail
        //   })
        //   email = {
        //     from: process.env.GMAIL,
        //     to: user.email,
        //     subject: 'Reset Password',
        //     html: compiledHTML
        //   }
        //   return sendEmail(email)
        //   break
        // case 'resetPwd': // inform that user's email is now confirmed
        //   hashLink = getLink('reset', user.resetToken)
        //   templatePath = path.join(emailAccountTemplatesPath, 'password-was-reset.jade')
        //   compiledHTML = jade.compileFile(templatePath)({
        //     logo: '',
        //     name: user.name || user.email,
        //     hashLink,
        //     returnEmail
        //   })
        //   email = {
        //     from: process.env.GMAIL,
        //     to: user.email,
        //     subject: 'Your password was reset',
        //     html: compiledHTML
        //   }
        //   return sendEmail(email)
        //   break
        // case 'passwordChange':
        //   templatePath = path.join(emailAccountTemplatesPath, 'password-change.jade')
        //   compiledHTML = jade.compileFile(templatePath)({
        //     logo: '',
        //     name: user.name || user.email,
        //     returnEmail
        //   })
        //   email = {
        //     from: process.env.GMAIL,
        //     to: user.email,
        //     subject: 'Your password was changed',
        //     html: compiledHTML
        //   }
        //   return sendEmail(email)
        //   break
        // case 'identityChange':
        //   hashLink = getLink('verifyChanges', user.verifyToken)
        //   templatePath = path.join(emailAccountTemplatesPath, 'identity-change.jade')
        //   compiledHTML = jade.compileFile(templatePath)({
        //     logo: '',
        //     name: user.name || user.email,
        //     hashLink,
        //     returnEmail,
        //     changes: user.verifyChanges
        //   })
        //   email = {
        //     from: process.env.GMAIL,
        //     to: user.email,
        //     subject: 'Your account was changed. Please verify the changes',
        //     html: compiledHTML
        //   }
        //   return sendEmail(email)
        //   break
        default:
          break;
      }
    }
  };
};