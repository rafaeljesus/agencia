module.exports = function(sequelize, DataTypes) {

  var definition = {
    msn: DataTypes.STRING,
    tel_residencial: DataTypes.STRING,
    tel_celular: DataTypes.STRING,
    tel_trabalho: DataTypes.STRING,
    e_mail_contato: DataTypes.STRING,
    skype: DataTypes.STRING
  }

  var load = function(id, success, error) {
    return Contact
      .findOrCreate( { id_cliente: id })
      .complete(function(err, contact) {
        if (err) return error(err);
        return success(contact);
      });
  };

  var updateContact = function(options, success, error) {
    sequelize.transaction(function(transaction) {
      var defError = {reason: 'unknown_error', message:'Ocorreu um erro ao salvar o contato'};
      var onCompleteThenCommit = function(err, contact) {
        if (err) {
          transaction.rollback();
          defError.error =  JSON.stringify(err);
          return error(defError);
        }
        transaction.commit();
        success(contact);
      }

      var onCompleteFindByIdCliente = function(err, contact) {
        if (err || !contact) return error(defError);
        return contact.updateAttributes(options).complete(onCompleteThenCommit);
      }

      var onCompleteCheckEmailInUse = function(err, contacts) {
        if (err || ( contacts && contacts[0] )) {
          transaction.rollback();
          defError.error =  JSON.stringify(err);
        }

        if (contacts && !!contacts[0]) {
          return error({
            reason: 'another_contact_with_same_email',
            message: 'O e-mail de contato, '+contacts[0].e_mail_contato+', já está em uso'
          });
        }
        if (err)  return error(defError);
        return Contact
          .find({ where: sequelize.and({ id_cliente: options.id_cliente }) })
          .complete(onCompleteFindByIdCliente);
      }

      return Contact.findAll({
        where: {
          id_cliente: { ne: options.id_cliente  },
          e_mail_contato: options.e_mail_contato
        }
      }).complete(onCompleteCheckEmailInUse);
    });
  };

  var checkMailInUse = function(options, success, error) {
    return Contact.findAll({
      where: {
        id_cliente: { ne: options.id_cliente  },
        e_mail_contato: options.e_mail_contato
      }
    }).complete(function(err, contacts) {
      if (contacts && !!contacts[0]) {
        return error({
          reason: 'another_contact_with_same_email',
          message: 'Outro cliente já está utilizando o e-mail de contato '+contacts[0].e_mail_contato});
      }
      if (err) {
        return error({
          reason: 'unknow_error',
          message:'Ocorreu um erro ao checar uso do e-mail de contato'
        });
      }
      return success();
    });
  };

  var Contact = sequelize.define('Contact', definition, {

    classMethods: {
      associate: function(models) {
        Contact.belongsTo(models.User, { foreignKey: 'id_cliente' });
      },
      load: load,
      updateContact: updateContact,
      checkMailInUse: checkMailInUse
    },
    tableName: 'tb_contatos_gls'
  });

  return Contact;

};
