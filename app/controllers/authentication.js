module.exports = function(app){

  var User = require('../models').User;

  var AuthController = {

    authenticate: function(req, res) {
      User.authenticate(req.body.user, function(user) {
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
      User.register(req.body.user, function(user) {
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

    resetPassword: function(req, res) {
     var options = {
        id: req.body.user.id,
        password: req.body.user.password
      }
      User.resetPassword(options, function(user) {
        res.json(200);
      }, function(err) {
        res.json(err);
      });
    }
  };

  return AuthController;

};
