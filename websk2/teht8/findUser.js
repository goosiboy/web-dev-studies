const Student = require('./Student.js');

module.exports = function findUser() {
    Student.find( { $where : "this.points <= 100" } , function(err, user) {
        if (err) throw err;

        console.log("user: ", user);

    });
}