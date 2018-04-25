module.exports = function(app) {

  let Student = require('../controllers/studentController.js');
  let AuthController = require('./../controllers/authController.js');

  app.route('/add')
    .put(Student.addStudent);

  app.route('/remove')
    .post(Student.removeUser);

  app.route('/findAll')
    .get(Student.findAllStudents);

  app.route('/find')
    .post(Student.findStudent);

  app.route('/findByPoints')
    .post(Student.findByPoints);

  app.route('/modifyInfo')
    .put(Student.modifyInfo);

  app.route('/addCourse')
    .post(Student.addCourse);
  
  app.route('/modCourse')
    .post(Student.modCourse);

  app.route('/register')
    .post(AuthController.register);

  app.route('/auth')
    .post(AuthController.auth);

};