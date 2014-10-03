module.exports = function(app) {

  var picture = app.controllers.picture;

  app.get('/picture/:id', picture.load);
  app.get('/picture/:id/image', picture.displayImage)
  app.post('/picture/upload/firstImage', picture.uploadImage);  //TODO use the same method an route for 3 imagems
};
