module.exports = function(app) {

  var auth = app.controllers.authentication;

  app.post('/authenticate', auth.authenticate);
  app.post('/register', auth.register);
  app.post('/changePassword', auth.changePassword);

};
