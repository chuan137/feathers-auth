'use strict';

const auth = require('feathers-authentication');
const local = require('feathers-authentication-local');
const jwt = require('feathers-authentication-jwt');
const authManagement = require('feathers-authentication-management');

module.exports = function () {
	const app = this;

	let config = app.get('auth');

	app.configure(auth(config))
		.configure(local())
		.configure(jwt());

	app.service('authentication').hooks({
		before: {
			create: [
				authManagement.hooks.isVerified(),
				auth.hooks.authenticate(['jwt', 'local'])
			],
			remove: [
				auth.hooks.authenticate('jwt')
			]
		}
	});
};
