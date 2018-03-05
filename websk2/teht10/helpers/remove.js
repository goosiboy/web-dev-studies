const Student = require('../models/Student.js');

module.exports = function removeUser(args, callback) {

    let searchParam = args || {};

    Student.findOne(searchParam, function (err, users) {
        if (err) throw err;

        let user = users;

            console.log("USER: ", users);

            if(isEmpty(searchParam)) {
                throw "User was not specified. Cannot remove unspecified user. Aborting."
            } else {
                if(user !== null) {
                    user.remove(function(err) {
                        callback("User removed!");
                    });
                } else {
                    callback("User doesnt exist");
                }
            }
    })
}

function isEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
        }
    return true;
}