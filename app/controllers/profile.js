module.exports = function(app) {

  var User = require('../models').User
    , fs = require('fs')
    , formidable = require('formidable');

  var ProfileController = {

    load: function(req, res) {
      User.load(req.params.id, function(user) {
        res.json(user);
      },
      function(err) {
        res.json(500, err);
      })
    },

    update: function(req, res) {
      User.updateProfile(req.body.profile, function(user) {
        res.json(user);
      },
      function(err) {
        res.json(500, err);
      })
    },

    changePassword: function(req, res) {
      User.changePassword(req.body.profile, function(user) {
        res.json(user);
      },
      function(err) {
        res.json(500, err);
      })
    },

    checkMailInUse: function(req, res) {
      var profile = {
        email: req.query.email,
        id: req.session.user.id
      }
      User.checkMailInUse(profile, function(check) {
        res.json(check);
      },
      function(err) {
        res.json(500, err);
      })
    }
  };

  return ProfileController;

};


