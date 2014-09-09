module.exports = function(app) {

  var fs = require('fs')
  , formidable = require('formidable')
  , Picture =  require('../models').Picture
  , easyimg = require('easyimage');
  
 
  var PictureController = {

    load: function(req, res) {

      Picture.load(req.params.id, function(contact) {
       res.json(contact);       
      }, function(err) {
        res.json(500, err);
      }
    )},

    uploadFirstImage: function(req, res){
      var defError = {reason: 'unknown_error', message:'Ocorreu um erro ao fazer upload da primeira imagem'};
      var form = new formidable.IncomingForm();
      form.encoding = 'utf-8';

      form.parse(req, function (error, fields, files) {
        if(!files){
           res.json(500, defError);
        }
      
        var filePath = files.file.path+'/'+files.file.name;
        var croppedFile = '/tmp/' + req.session.user.id+'_1.png';
        cropImage(filePath, croppedFile, defError);
        
        var stream = fs.createReadStream(croppedFile);
        var foto = {
           id_cliente: req.session.user.id,
           foto1: stream
        };
        persistImage(foto);  
        fs.unlink(croppedFile);
        res.end();
      });
       
    },
    
    cropImage: function(source, destiny, defError){
      easyimg.crop({
            src: source, dst: destiny,
            cropwidth:128, cropheight:128,  gravity:'North',  x:30, y:50
          },

          function(err, stdout, stderr) {
            if(err) res.json(500, defError);          
          }
      );

    },

    
    persistImage: function(foto){
    	console.log('JSON STRINGIFY PART FOTO 1'+JSON.stringify(foto.foto1));
    	console.log('JSON STRINGIFY PART FOTO 2'+JSON.stringify(foto.foto1));
    	console.log('JSON STRINGIFY PART FOTO 3'+JSON.stringify(foto.foto1));
    	
        Picture.update(foto, function(foto){
          res.json(foto);
        }, function(err){
          res.json(500, err);
        });
    }

  };

  return PictureController;
};
