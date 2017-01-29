'use strict';

// user-model.js - A sequelize model
// 
// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.

const Sequelize = require('sequelize');

module.exports = function(sequelize) {
  const user = sequelize.define('users', {
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [6, 999]
      }
    },
    roles: {
      type: Sequelize.ARRAY(Sequelize.STRING)
    },
    isVerified: {
      type: Sequelize.BOOLEAN
    },
    verifyToken: {
      type: Sequelize.STRING
    },
    verifyExpires: {
      type: Sequelize.DATE
    },
    verifyChanges: {
      type: Sequelize.JSON
    },
    resetToken: {
      type: Sequelize.STRING
    },
    resetExpires: {
      type: Sequelize.DATE
    }
  }, {
    freezeTableName: true
  });

  user.sync();

  return user;
};