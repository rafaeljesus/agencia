module.exports = function(sequelize, DataTypes) {

  var definition = {
    email: DataTypes.STRING,
    msn: DataTypes.STRING,
    tel_residencial: DataTypes.STRING,
    tel_celular: DataTypes.STRING,
    tel_trabalho: DataTypes.STRING,
    e_mail_contato: DataTypes.STRING
  };

  var Contact = sequelize.define('Contact', definition, {
    classMethods: {
      associate: function(models) {
        Contact.belongsTo(models.User, { foreignKey: 'id_cliente' });
      }
    },
    tableName: 'tb_contatos_gls'
  });

  return Contact;
};