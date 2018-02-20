const Student = require('./Student.js');

module.exports = function removeUser(args) {

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
                        console.log("User removed!");
                    });
                } else {
                    throw "User doesnt exist."
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