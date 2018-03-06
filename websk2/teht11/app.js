let express = require('express');
let app = express();
let db = require('./db');

let search = require('./controllers/SearchController'),
    update = require('./controllers/UpdateController'),
    index = require('./controllers/index');

let UserController = require('./controllers/UserController');
let AuthController = require('./auth/AuthController');

// Routet
app.use('/', index);
app.use('/search', search);
app.use('/update', update);
app.use('/users', UserController);
app.use('/auth', AuthController);

module.exports = app;