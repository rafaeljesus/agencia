module.exports = function(app){

  var User = require('../models').User;

  var AuthController = {
    authenticate: function(req, res) {
      var options = {
        loginOrEmail: req.body.loginOrEmail,
        password: req.body.password
      };
      User.authenticate(options, function(user) {
        req.session.user = {
          id: user.id,
          firstName: user.primeiro_nome,
          email: user.email
        }
        res.json(req.session.user);
      }, function(err) {
        res.json(403, err);
      });
    },
    register: function(req, res) {
      var options = {
        id: req.body.user.id,
        firstName: req.body.user.firstName,
        lastName: req.body.user.lastName,
        email: req.body.user.email,
        password: req.body.user.password
      };
      User.register(options, function(user) {
        req.session.user = {
          id: user.id,
          firstName: user.primeiro_nome,
          email: user.email
        }
        res.json(req.session.user);
      }, function(err) {
        res.json(401);
      });
    },
    changePassword: function(req, res) {
     var options = {
        id: req.body.user.id,
        password: req.body.user.password
      };
      User.changePassword(options, function(user) {
        res.json(200);
      }, function(err) {
        res.json(err);
      });
    }
  };

  return AuthController;
};