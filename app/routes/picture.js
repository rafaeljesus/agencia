module.exports = function(app) {

  var picture = app.controllers.picture;

  app.get('/picture/:id', picture.load);
  app.get('/picture/:id/image?photoParam=foto1', picture.displayImage)
  app.get('/picture/:id/image?photoParam=foto2', picture.displayImage)
  app.get('/picture/:id/image?photoParam=foto3', picture.displayImage)

  app.post('/picture/upload/firstImage', picture.uploadImage);  //TODO use the same method an route for 3 imagems
};
