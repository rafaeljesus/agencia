module.exports = function(app) {

  var fs = require('fs')
  , formidable = require('formidable')
  , Picture =  require('../models').Picture;
  
  var PictureController = {
    
    load: function(req, res) {

      Picture.load(req.params.id, function(contact) {
    			res.json(contact); 			
    	}, function(err) {
       	res.json(500, err);
      }
    )},

    uploadFirstImage: function(req, res){
      var form = new formidable.IncomingForm();
      form.encoding = 'utf-8';
      
      form.parse(req, function(err, fields, files) {
        var foto = {
           id_cliente: req.session.user.id,
           foto1: (files.file || {})._writeStream
        };

        console.log('foto '+JSON.stringify(foto));

        Picture.update(foto, function(foto){
          res.json(foto);
        }, function(err){
          res.json(500, err);
        });

      });
		  console.log('IMAGE UPLOADED');
    }

  };

  return PictureController;
};
