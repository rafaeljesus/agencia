module.exports = function(app) {

  var picture = app.controllers.picture;

  app.get('/picture/:id', picture.load);
  app.post('/picture/upload/firstImage', picture.uploadFirstImage);  
};
