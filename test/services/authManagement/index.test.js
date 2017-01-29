'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('authManagement service', function() {
  it('registered the authManagement service', () => {
    assert.ok(app.service('authManagement'));
  });
});
