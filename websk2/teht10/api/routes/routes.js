module.exports = function(app) {

  let Student = require('../controllers/studentController.js');
  let AuthController = require('./../controllers/authController.js');

  // RESTful - ajatusten mukaisesti pyrtiään hyödyntämään kaikkia http - metodeja (POST, PUT, DELETE, GET).
  // Eri metodien hyödyt eivät tule minulle täysin selväksi. GET ja POST hoitavat hommat yhtälailla. 
  // Jonkinlaisen korkeamman tason optimointi - hömpötyksiä. 
  app.route('/add')
    .put(Student.addStudent);

  app.route('/remove')
    .delete(Student.removeUser);

  app.route('/findAll')
    .get(Student.findAllStudents);

  app.route('/find')
    .post(Student.findStudent);

  app.route('/findByPoints')
    .post(Student.findByPoints);

  app.route('/modifyName')
    .put(Student.modifyName);

  app.route('/addCourse')
    .put(Student.addCourse);
  
  app.route('/modCourse')
    .put(Student.modCourse);

  // Uuden käyttäjän rekisteröinti. Login - järjestelmän alustus.
  app.route('/register')
    .post(AuthController.register);

  // Ei hyödynnetä tässä tehtävässä. Tsekkaa authControllerin auth0 - metodi.
  app.route('/auth')
    .get(AuthController.auth);

};