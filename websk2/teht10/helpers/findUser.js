const Student = require('../models/Student.js');

module.exports = function findUser(param, callback) {

    let argument = param;

    Student.find( { $where : argument } , function(err, user) {
        if (err) throw err;

        if(callback !== null) {
            callback(user);
        }

    });
}