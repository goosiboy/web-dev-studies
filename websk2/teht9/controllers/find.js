const Student = require('./models/Student.js');

module.exports = function searchDB(args) {

    let searchParam = args || {};

    Student.find(searchParam, function(err, users) {
        if (err) throw err;

        console.log("users: ", users);

    })
}