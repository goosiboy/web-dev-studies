const Student = require('./models/Student.js');

module.exports = function addStudent(studentNumber, studentName, studentEmail, studentPoints, studentCourses) {
    let studentID = studentNumber;
    let name = studentName;
    let email = studentEmail;
    let points = studentPoints || 0; // Not required
    let courses = studentCourses || [];

    let student = new Student({
        studentNumber: studentID,
        name: name,
        email: email,
        points: points,
        courses: courses
    });

    student.save(function(err) {
        if (err) throw err;
        console.log("User saved succesfully!");
    });

};