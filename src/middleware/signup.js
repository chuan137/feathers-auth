'use strict';

module.exports = function(app) {
  return function(req, res, next) {
    app.service('users').create({
      email: req.body.email,
      password: req.body.password
    })
    .then(user => {
      res.send(user);
    })
    .catch(next);
  };
};
