let express = require('express');
let router = express.Router();

const find = require('../controllers/findUser');

// Example - argument
let argument = "this.points == 0";

// Routes
router.get('/', function (req, res) {

    // A basic callback to the find - method, which has been defined at the findUser - file.
    find(argument, function(result) {
        res.json(result);
    });

});

module.exports = router;