module.exports = function(app) {

  let Student = require('../controllers/studentController.js');

  app.route('/add')
    .post(Student.addStudent);

  app.route('/remove')
    .post(Student.removeUser);

  app.route('/findAll')
    .get(Student.findAllStudents);

  app.route('/find')
    .post(Student.findStudent);

  app.route('/findByPoints')
    .post(Student.findByPoints);

  app.route('/modifyName')
    .post(Student.modifyName);

  app.route('/addCourse')
    .post(Student.addCourse);
  
  app.route('/modCourse')
    .post(Student.modCourse);

};