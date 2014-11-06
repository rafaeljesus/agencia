module.exports = function(app) {

  var Contact = require('../models').Contact;

  var ContactController = {

    load: function(req, res) {
      Contact.load(req.params.id, function(contact) {
        res.json(contact);
      }, function(err) {
        res.json(500, err);
      })
    },

    update: function(req, res) {
      Contact.updateContact(req.body.contact, function(contact){
        res.json(contact);
      },
      function(err){
        res.json(500, err);
      })
    },

    checkMailInUse: function(req, res) {
      var contact = {
        id_cliente: req.session.user.id,
        e_mail_contato: req.query.e_mail_contato
      }
      Contact.checkMailInUse(contact, function(check) {
        res.json(check);
      },
      function(err) {
        res.json(500, err);
      });
    }
  };

  return ContactController;

};
