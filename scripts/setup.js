const feathers = require('feathers/client');
const hooks = require('feathers-hooks');
const rest = require('feathers-rest/client');
const fetch = require('node-fetch');
const authentication = require('feathers-authentication-client');
const LocalStorage = require('node-localstorage').LocalStorage;
const AuthManagement = require('feathers-authentication-management/lib/client');


const localStorage = new LocalStorage('./data');
const app = feathers();

const url = "http://localhost:3030";
const adminMail = 'admin@feathers.js';
const adminUser = 'admin';
const adminPass = 'adminissecure';

app.configure(hooks());
app.configure(rest(url).fetch(fetch));
app.configure(authentication({
  storage: localStorage
}));

const authManagement = new AuthManagement(app);
const Users = app.service('users');

Users.create({
    email: adminMail,
    username: adminUser,
    password: adminPass,
    roles: ['admin']
  })
  .then(() =>
    app.authenticate({
      strategy: 'local',
      email: adminMail,
      password: adminPass
    })
  )
  .then(() =>  
    Users.find({
      query: {
        email: adminMail
      }
    })
  )
  .then((users) => {
    if (users.total == 0) {
      return Promise.reject('No user found')
    }
    let token = users.data[0].verifyToken;
    return authManagement.verifySignupLong(token);
  })
  .then(res => console.log(res))
  .catch(err => console.log(err.message));