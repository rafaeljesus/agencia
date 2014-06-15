module.exports = function(app){

  var User = require('../models').User;

  var AuthController = {

    authenticate: function(req, res){
      var options = {
        email: req.body.user.email,
        login: req.body.user.login,
        password: req.body.user.password
      };
      User
        .authenticate(options)
        .complete(function(err, user){
          if (!!err) {
            res.json(401);
            return;
          }
          req.session.user = {
            id: user.id,
            firstName: user.primeiro_nome,
            email: user.email
          }
          res.json(req.session.user);
        });
    },

    register: function(req, res){
      var options = {
        id: req.body.user.id,
        firstName: req.body.user.firstName,
        lastName: req.body.user.lastName,
        email: req.body.user.email,
        password: req.body.user.password
      };
      User
        .register(options)
        .complete(function(err, user){
          if (!!err) {
            res.json(401);
            return;
          }
          req.session.user = {
            id: user.id,
            firstName: user.primeiro_nome,
            email: user.email
          }
          res.json(req.session.user);
        });
    },

    changePassword: function(req, res){
     var options = {
        id: req.body.user.id,
        password: req.body.user.password
      };
      User
        .changePassword(options)
        .complete(function(err, user){
          res.json(200);
        });
    }
  };

  return AuthController;
};