let express = require('express');
let router = express.Router();

// Routes
router.get('/', function (req, res) {
    res.render('index', { title: 'Search for student!' });
});

module.exports = router;