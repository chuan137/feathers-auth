'use strict';

const assert = require('assert');
const request = require('request');
const app = require('../src/app');
const common = require('./common');
const server = common.server;
const chai = common.chai;
const userApiTest = require('./services/user/client.test');
const msgApiTest = require('./services/message/client.test');

describe('Feathers application tests', function() {
  before(function(done) {
    this.server = app.listen(common.port);
    this.server.once('listening', () => done());
  });

  after(function(done) {
    this.server.close(done);
  });

  describe('Server', function() {
    it('starts and shows the index page', function() {
      return chai.request(common.url)
        .get('/')
        .then(res => {
          assert.ok(res.text.indexOf('<html>') !== -1);
        });
    });
  });

  describe('404', function() {
    before(function() {
      this.skip();
    });

    it('shows a 404 HTML page', function(done) {
      request({
        url: `${common.url}/path/to/nowhere`,
        headers: {
          'Accept': 'text/html'
        }
      }, function(err, res, body) {
        assert.equal(res.statusCode, 404);
        assert.ok(body.indexOf('<html>') !== -1);
        done(err);
      });
    });

    it('shows a 404 JSON error without stack trace', function(done) {
      request({
        url: `${common.url}/path/to/nowhere`,
        json: true
      }, function(err, res, body) {
        assert.equal(res.statusCode, 404);
        assert.equal(body.code, 404);
        assert.equal(body.message, 'Page not found');
        assert.equal(body.name, 'NotFound');
        done(err);
      });
    });
  });

  describe('REST api', () => {
    userApiTest();
    msgApiTest();
  });
});