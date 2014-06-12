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
            name: user.name,
            email: user.email
          }
          res.send(req.session.user);
        });
    }
  };

  return AuthController;
};