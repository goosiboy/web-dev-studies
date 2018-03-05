const Student = require('../models/Student.js');

module.exports = function addStudent(paramObject, callback) {
    let studentID = paramObject.studentNumber;
    let name = paramObject.studentName;
    let email = paramObject.studentEmail;
    let points = paramObject.studentPoints || 0; // Not required
    let courses = paramObject.studentCourses || [];

    let student = new Student({
        studentNumber: studentID,
        name: name,
        email: email,
        points: points,
        courses: courses
    });

    student.save(function(err) {
        if (err){
            callback("Error ", err);
        } else {
            callback("User added!");
        }
    });

};