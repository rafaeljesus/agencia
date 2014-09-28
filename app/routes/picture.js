module.exports = function(app) {

  var picture = app.controllers.picture;

  app.get('/picture/:id', picture.load);
  app.post('/picture/upload/firstImage', picture.uploadImage);  //TODO use the same method an route for 3 imagems
  app.get('/picture/:id/image?picture=foto1', picture.displayImage)
  app.get('/picture/:id/image?picture=foto2', picture.displayImage)
  app.get('/picture/:id/image?picture=foto3', picture.displayImage)
};
