let express = require('express');
let router = express.Router();

const Student = require('../models/Student');
const update = require('../helpers/update');

router.use(function(req, res, next){
    console.log('Something happened!');
    next();
});

router.get('/', function (req, res) {
    res.json({message: 'Welcome!'});
});

module.exports = router;