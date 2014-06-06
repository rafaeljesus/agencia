module.exports = function(){

  var db = require('../../lib/db_connect')
  , User = require('user')
  , Topic = require('topic');

  var Model = {
    assunto: db.Sequelize.STRING,
    mensagem: db.Sequelize.TEXT,
    data: db.Sequelize.DATE
  };

  return db
    .sequelize
    .define('messages', Model, { createdAt: 'data', updatedAt: false, tableName: 'tb_mensagens_gls' })
    .belongsTo(User, { foreignKey: 'id_cliente', constraints: false })
    .belongsTo(Topic, { foreignKey: 'id_topico', constraints: false });
};