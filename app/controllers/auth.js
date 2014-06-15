module.exports = function(app){

  var User = require('../models').User;

  var AuthController = {

    authenticate: function(req, res){
      var options = {
        email: req.body.email,
        login: req.body.login,
        password: req.body.password
      };
      User
        .authenticate(options)
        .complete(function(err, user){
          if (!!err) {
            res.send(401);
            return;
          }
          req.session.user = {
            firstName: user.primeiro_nome,
            email: user.email
          }
          res.send(req.session.user);
        });
    },

    register: function(req, res){
      var options = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
      };
      User
        .register(options)
        .complete(function(err, user){
          if (!!err) {
            res.send(401);
            return;
          }
          req.session.user = {
            firstName: user.primeiro_nome,
            email: user.email
          }
          res.send(req.session.user);
        });
    },

    changePassword: function(req, res){
     var options = { email: req.body.email, password: req.body.password };
      User
        .resetPassword(options)
        .complete(function(err, user){
          res.send(200);
        });
    }
  };

  return AuthController;
};