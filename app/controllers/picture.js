module.exports = function(app) {

  var fs = require('fs')
  , formidable = require('formidable')
  , Picture =  require('../models').Picture
  //, easyimg = require('easyimage'); to crop

  
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
      
      form.on('file', function(name, file) {
      	if(!file){
      	   res.json(500, err);
      	}
      	var stream = fs.createReadStream(file.path);
      	var foto = {
           id_cliente: req.session.user.id,
           foto1: stream;
        };
        persistImage(foto);
      	
      });
     
      form.on('error', function(err) {
     	alert('Ocorreu um erro ao executar o upload ') 
     	res.json(500, err);
      });
     
      form.on('end', function(err) {
     	alert('Upload finalizado'); 
     	res.json(500, err);
      });
     
      form.on('progress', function(bytesReceived, bytesExpected) {
     	alert('Recebendo bytes '+bytesReceived '/'+bytesExpected); 
      });
    
      form.on('end', function(err) {
       console.log('IMAGE UPLOADED');
      });
      
    };
    
    persistImage: function(foto){
    	console.log('JSON STRINGIFY PART FOTO 1'+JSON.stringify(foto.foto1));
    	console.log('JSON STRINGIFY PART FOTO 2'+JSON.stringify(foto.foto1));
    	console.log('JSON STRINGIFY PART FOTO 3'+JSON.stringify(foto.foto1));
    	
        Picture.update(foto, function(foto){
          res.json(foto);
        }, function(err){
          res.json(500, err);
        });
    };

  };

  return PictureController;
};
