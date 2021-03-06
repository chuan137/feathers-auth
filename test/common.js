const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const expect = chai.expect;
chai.use(chaiHttp);
chai.use(chaiAsPromised);
chai.should();

const server = require('../src/app');
const feathers = require('feathers/client');
const rest = require('feathers-rest/client');
const hooks = require('feathers-hooks');
const fetch = require('node-fetch');
const authentication = require('feathers-authentication-client');
const LocalStorage = require('node-localstorage').LocalStorage;
const AuthManagement = require('feathers-authentication-management/lib/client');

const port = '3040';
const url = `http://localhost:${port}`;
const localStorage = new LocalStorage('./data');

const restClient = feathers()
  .configure(hooks())
  .configure(rest(url).fetch(fetch))
  .configure(authentication({storage: localStorage}));

const authManagementClient = AuthManagement(restClient);

exports.chai = chai;
exports.assert = chai.assert;
exports.expect = chai.expect;
exports.restClient = restClient;
exports.authClient = authManagementClient;
exports.server = server;
exports.url = url;
exports.port = port;

// const io = require('socket.io-client');
// const socket = io('http://localhost:3030/');
// const socketio = require('feathers-socketio/client');
// .configure(socketio(socket)) // you could use Primus or REST instead
