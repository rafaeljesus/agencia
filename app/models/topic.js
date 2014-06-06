module.exports = function() {

  var db = require('../../lib/db_connect')
  , User = require('user');

  var Model = {
    assunto: db.Sequelize.STRING,
    mensagem: db.Sequelize.TEXT,
    data: db.Sequelize.DATE
  };

  return db
    .sequelize
    .define('topics', Model, { createdAt: 'data', updatedAt: false, tableName: 'tb_topicos_gls' })
    .belongsTo(User, { foreignKey: 'id_cliente', constraints: false });
};