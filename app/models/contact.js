module.exports = function() {

  var db = require('../lib/db_connect')
  , User = require('user');

  var Model = {
    email: db.Sequelize.STRING,
    msn: db.Sequelize.STRING,
    tel_residencial: db.Sequelize.STRING,
    tel_celular: db.Sequelize.STRING,
    tel_trabalho: db.Sequelize.STRING,
    e_mail_contato: db.Sequelize.STRING
  };

  return
    db
    .sequelize
    .define('contact', Model, { tableName: 'tb_contatos_gls' })
    .belongsTo(User, { foreignKey: 'id_cliente' });
};