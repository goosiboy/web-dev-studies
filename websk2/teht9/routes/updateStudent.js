let express = require('express');
let router = express.Router();

const Student = require('../models/Student');
const update = require('../controllers/update');
const add = require('../controllers/add');
const remove = require('../controllers/remove');

// Routes
router.get('/', function (req, res) {
    //res.render('update', {title: 'Update'});
    res.json({message: "update"});
});

router.get('/add', function (req, res) {
    //res.render('update', {title: 'Add'});
    add({
        studentNumber: 4,
        studentName: "Mikko",
        studentEmail: "mikonemail@email.com"
    }, function(result) {
        res.json({result: result});
    });

});

router.get('/remove', function (req, res) {
    //res.render('update', {title: 'Remove'});
    remove({studentNumber: 4}, function(result){
        res.json({result: result});
    });
});

router.get('/modify', function (req, res) {
    //res.render('update', {title: 'Modify'});
    update.updatePoints({studentNumber: 4}, 4, function(result){
        res.json({message: result});
    });

});

module.exports = router;