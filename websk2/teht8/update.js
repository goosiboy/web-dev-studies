const Student = require('./Student.js');

module.exports = {
    updatePoints: function(user, data) {

        let userData = user;
        let userPoints = data;

        Student
            .findOne(
                userData,
                function (err, user) {
                if (err) throw err;

                user.points = userPoints;

                console.log("User: ", user);

            });
    },
    addCourse: function(user, data) {

        let userData = user;
        let courseData = data;

        Student
            .findOne(
                userData,
                function (err, user) {
                if (err) throw err;

                user.courses.push(courseData);

                console.log("User: ", user);

                user.save();

            });

    },

    // KESKEN!!!!
    changeGrade: function(user, data, grade) {

    let userData = user;
    let courseName = data;
    let courseGrade = grade;

    Student
        .findOne(
            userData,
            function (err, user) {
                if (err) throw err;

                user.courses.find(function(element) {
                    if(element.name === courseName) {
                        element.grade = courseGrade;
                        console.log("Course grade changed!");

                        element.save();
                        user.save();
                    }
                });
        });

    }
}