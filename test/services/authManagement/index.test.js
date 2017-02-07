'use strict';

const assert = require('assert');
const app = require('../../../src/app');
const notifierTest = require('./notifier.test');

describe('authManagement service', function() {
  it('registered the authManagement service', () => {
    assert.ok(app.service('authManagement'));
  });

  notifierTest(app);
});
