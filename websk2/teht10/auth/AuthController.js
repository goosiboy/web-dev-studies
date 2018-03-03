let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

let User = require('../user/User');

let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');
let config = require('../config');