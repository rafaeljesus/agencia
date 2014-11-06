module.exports = function(app) {

  var fs = require('fs')
    , formidable = require('formidable')
    , Picture =  require('../models').Picture
    , path = require('path')
    , easyimg = require('easyimage')
    , defError = {reason: 'unknown_error', message:'Ocorreu um erro ao fazer upload da imagem'};

  var persistImage = function(croppedFile, photoParam, req, res){
    var imageData = fs.readFileSync(croppedFile);
    var foto = { id_cliente: req.session.user.id }
    foto[photoParam] = imageData;
    Picture.update(foto, function(foto){
      fs.unlinkSync(croppedFile);
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
      })
    },

    displayImage: function(req, res) {
      defError.message = 'Ocorreu um erro ao carregar a primeira foto do cliente';
      var photoParam = req.query.photoParam;
      Picture.load(req.params.id, function(picture) {
        if (!picture || !picture[photoParam]) {
          return res.json(500, defError);
        }
        var decodedImage = new Buffer(picture[photoParam], 'binary');
        res.writeHead(200, { 'Content-Type': 'image/png' });
        res.write(decodedImage);
        res.end();
      }, function(err) {
        res.json(500, defError);
      })
    },

    uploadImage: function(req, res){
      var form = new formidable.IncomingForm();
      form.encoding = 'utf-8';
      form.parse(req, function (error, fields, files) {
        var width = fields.w;
        var height = fields.h;
        var axisX = fields.x;
        var axisY =  fields.y;
        var photoParam = fields.photoParam;

        if (!files) res.json(500, defError);

        var directory = path.dirname(files.file.path);
        var croppedFile = directory + '/'+req.session.user.id+'_1.png';

        easyimg.rescrop({
          src: files.file.path, dst: croppedFile,
          width:500, height:400,
          cropwidth: width, cropheight: height,
          gravity:'North', x: axisX, y: axisY
        }).then(function(image) {
          persistImage(croppedFile, photoParam, req, res);
        }, function(err) {
          res.json(500, defError);
        });
      });
    }
  };

  return PictureController;

};
