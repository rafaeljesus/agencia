module.exports = function(app) {

  var contact = app.controllers.contact;

  app.get('/contact/:id', contact.load);
  app.put('/contact', contact.update);
  app.get('/contact/check/mail', contact.checkMailInUse);
};
