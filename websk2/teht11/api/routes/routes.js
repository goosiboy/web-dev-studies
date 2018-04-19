module.exports = function(app) {

  let Student = require('../controllers/studentController.js');
  let AuthController = require('./../controllers/authController.js');

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

  // Uuden käyttäjän rekisteröinti. Login - järjestelmän alustus.
  app.route('/register')
    .post(AuthController.register);

  // Ei hyödynnetä tässä tehtävässä. Tsekkaa authControllerin auth0 - metodi.
  app.route('/auth')
    .get(AuthController.auth);

};