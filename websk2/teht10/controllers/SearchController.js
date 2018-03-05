let express = require('express');
let router = express.Router();
var bodyParser = require('body-parser');
let User = require('../models/User');

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

const findUser = require('../helpers/findUser');

let jwt = require('jsonwebtoken');
let config = require('../config');

// Example - argument
// let argument = "this.id !== undefined";

// Routes
router.post('/', function (req, res) {

    let argument = req.body.argument;

    // A basic callback to the find - method, which has been defined at the findUser - file.
    findUser(argument, function(result) {
        res.json(result);
    });

});

module.exports = router;