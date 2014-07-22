module.exports = function(app) {

  var User = require('../models').User;

  var ProfileController = {
    load: function(req, res) {
    	User.load(req.params.id, function(user) {
    			res.json(user); 			
    		}, 
    		function(err) {
        	res.json(401);
      	}
    )},

    update: function(req, res){
      User.updateProfile(req.body.profile, function(user){
        res.json(user);
      },
      function(err){
        res.json(500);
      }
    )}

  };

  return ProfileController;
};
