module.exports = function(app) {

  var profile = app.controllers.profile;

  app.get('/users/:id', profile.load);
  app.put('/profile', profile.update);
  
};
