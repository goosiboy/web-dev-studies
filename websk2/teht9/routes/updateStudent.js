let express = require('express');
let router = express.Router();

// Routes
router.get('/', function (req, res) {
    res.render('index', {title: 'Update a student!'});
});

module.exports = router;