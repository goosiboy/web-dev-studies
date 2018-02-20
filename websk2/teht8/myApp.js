const addStudent = require('./add.js');
const removeUser = require('./remove.js');
const Student = require('./Student.js');
const findUser = require('./findUser.js');
const updateMethods = require('./update.js');

const updatePoints = updateMethods.updatePoints;
const addCourse = updateMethods.addCourse;
const changeGrade = updateMethods.changeGrade;

//addStudent(1, "dsadasdasd", "asdasdad");
//addStudent(2, "asdasd", "asdasdad");
//addStudent(3, "asdasd", "asdasdad");

//findUser();

//removeUser({studentNumber: 3});

//updatePoints({ studentNumber: 2 }, 87);

/*
addCourse({ studentNumber: 2 }, {
    name: "Outo kurssi",
    size: 10,
    grade: 5
});
*/

changeGrade(
    { studentNumber: 2 },
    { name: "Outo kurssi" },
    3
);
