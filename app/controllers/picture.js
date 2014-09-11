module.exports = function(app) {

  var fs = require('fs')
  , formidable = require('formidable')
  , Picture =  require('../models').Picture
  , path = require('path')
  , easyimg = require('easyimage');
  

 var defError = {reason: 'unknown_error', message:'Ocorreu um erro ao fazer upload da imagem'};

 var persistImage =  function(croppedFile, res){
     var readFile = fs.readFileSync(croppedFile);
     var stream = new Buffer(readFile).toString('base64');
     var foto = {
        id_cliente: req.session.user.id,
        foto1: stream
      };
           
     Picture.update(foto, function(foto){
         fs.unlink(croppedFile);
         res.json(foto);
      }, function(err){
        res.json(500, err);
      });
  }; 
  
  
  var PictureController = {

    load: function(req, res) {
      defError.message = 'Ocorreu um erro ao carregar fotos do cliente';
      Picture.load(req.params.id, function(picture) {
       res.json(picture);       
      }, function(err) {
        res.json(500, defError);
      }
    )},

    displayImage: function(req, res){
      defError.message = 'Ocorreu um erro ao carregar a primeira foto do cliente';
      Picture.load(req.params.id, function(picture) {
        res.writeHead(200, { 'Content-Type': 'image/png' });
        res.end(new Buffer(picture.foto1));
      }, function(err) {
        res.json(500, defError);
      }
    )}, 

    uploadImage: function(req, res){
      var form = new formidable.IncomingForm();
      form.encoding = 'utf-8';
      form.parse(req, function (error, fields, files) {
        if(!files){
           res.json(500, defError);
        }
        var directory = path.dirname(files.file.path);
        var croppedFile = directory + '/'+req.session.user.id+'_1.png';
        easyimg.crop({
            src: files.file.path, dst: croppedFile,
            cropwidth:400, cropheight:600,  
            gravity:'North', x:30, y:400
        }).then(function(image){  persistImage(croppedFile, res);  },
            function(err) {  res.json(500, defError);  }
        );      
      });//end of form       
    }//end of uploadFirstImage

  };

  return PictureController;
};
