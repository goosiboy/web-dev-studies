const Student = require('./../models/Student');
const AuthController = require('./../controllers/authController.js');
let auth = AuthController.auth0;

module.exports = {
    removeUser: function(req, res) {

        console.log("REQUEST BODY: ", req.body);

        let searchParam = req.body || {};
        let token = req.headers['x-access-token'] || null;

        auth(token, function(response) {
            if(response === true) {
                Student.findOne(searchParam, function (err, users) {
                    if (err)
                        throw err;
        
                    let user = users;
        
                    if (isEmpty(searchParam)) {
                        throw "User was not specified. Cannot remove unspecified user. Aborting."
                    } else {
                        if (user !== null) {
                            user.remove(function (err) {
                                    res.json("User removed!");
                                });
                        } else {
                            throw "User doesnt exist."
                        }
                    }
                })
            } else {
                res.json(response);
            }
        });

    },
    addStudent: function(req, res) {

        let request = req.body;
        let token = req.headers['x-access-token'] || null;

        auth(token, function(response) {
            if(response === true) {
                if(request !== null) {
                    let studentID = request.id;
                    let name = request.name;
                    let email = request.email;
                    let points = request.points || 0; // Not required
                    let courses = request.courses || []; // Not required

                    let student = new Student({
                            studentNumber: studentID,
                            name: name,
                            email: email,
                            points: points,
                            courses: courses
                        });

                    student.save(function (err) {
                        if (err)
                            throw err;
                        console.log("User saved succesfully!");
                    });
                    res.send(student);
                }
            } else {
                res.send(response);
            }
        }); 

    },
    searchDB: function(req, res) {

        let searchParam = req.body || {};
        let token = req.headers['x-access-token'] || null;

        auth(token, function(response) {
            if(response === true) {
                Student.find(searchParam, function (err, users) {
                    if (err)
                        throw err;
        
                    res.send(users);
        
                });
            } else {
                res.send(response);
            }
        });

    },
    findStudent: function(req, res) {

        let token = req.headers['x-access-token'] || null;

        auth(token, function(response) {
            if(response === true) {
                Student
                .findOne(req.body, 'studentNumber name email', function (err, user) {
                    if (err)
                        throw err;
    
                    res.send(user);
    
                });
            } else {
                res.send(response);
            }
        });
    },
    findByPoints : function (req, res) {

        let _points = req.body.points;
        let token = req.headers['x-access-token'] || null;

        auth(token, function (response) {
            if(response === true) {
                Student
                .find({})
                .where('points').lt(_points) // Where less than given amount of points
                .exec(function (err, users) { // Execute callback
                    let userMap = {};
    
                    users.forEach(function (user) {
                        userMap[user._id] = user;
                    });
    
                    res.send(userMap);
                });
            } else {
                res.send(response);
            }
        });
    },
    modifyName: function(req, res) {}, // reserved
    modifyEmail: function(req, res) {}, // reserved
    modifyInfo: function(req, res) {

        let token = req.headers['x-access-token'] || null;
        let stNum = {
            studentNumber: req.body.studentNumber
        }
        let newName = req.body.name;
        let newMail = req.body.email;

        console.log("stNum: ", stNum);
        console.log("newName: ", newName);
        console.log("newMail: ", newMail);

        auth(token, function(response) {
            if(response === true) {
                Student
                .findOne(stNum)
                .exec(function (err, user) {
                    if (err) { 
                        console.log("err: ", err);
                        throw err;
                    };
                    console.log("user: ", user.name, " | mail: ", user.email);
                    user.name = newName;
                    user.email = newMail;
                    user.save();
                    console.log("user: ", user.name, " | mail: ", user.email);
                    res.json("Info changed succesfully!");
                });
            } else {
                res.json(response);
            }
        });

    },
    updatePoints: function(req, res) {

        let token = req.headers['x-access-token'] || null;
        let userData = req.body.user;
        let userPoints = req.body.data;

        auth(token, function(response) {
            if(response === true) {
                Student
                .findOne(
                    userData,
                    function (err, user) {
                    if (err) throw err;
    
                    user.points = userPoints;
                    user.save();
                    res.send(user);
                });
            } else {
                res.send(response);
            }
        });
    },
    findAllStudents: function(req, res) {

        Student
            .find({}, function(error, users) {
                let userMap = [];

                users.forEach(function (user) {
                    userMap.push(user);
                });                
                res.send(userMap);
            });
    
    },
    addCourse: function(req, res) {

        let token = req.headers['x-access-token'] || null;
        let param = req.body.param;
        let courseData = req.body.course;

        auth(token, function(response) {
            if(response === true) {
                Student
                .findOne(
                    param,
                    function (err, user) {
                        if (err) throw err;
    
                        user.courses.push(courseData);
                        user.save();
                        res.send(user);
                    });
            } else {
                res.send(response);
            }
        });
    },

    modCourse: function(req, res) {

        let token = req.headers['x-access-token'] || null;
        let studentNumber = req.body.id;
        let courseID = req.body.courseID._id;
        let params = req.body.params.name;

        auth(token, function(response) {
            if(response === true) {
                Student
                .findOne(
                    studentNumber,
                    function(err, user) {
                        if (err) throw err;
                        for(let i = 0; i < user.courses.length; i++) {
                            if(user.courses[i]._id == courseID) {
                                user.courses[i].name = params;
                                user.save();
                                res.send(user);
                                break;
                            }
                        }
                    }
                );
            } else {
                res.send(response);
            }
        });
    }
}

// Helper function. Checks if empty.
function isEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
        }
    return true;
}