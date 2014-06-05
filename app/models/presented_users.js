module.exports = function(){

  var db = require('../lib/db_connect')
  , User = require('user')
  , PresentedUser = require('user');

  var Model = {
    situacao: db.Sequelize.INTEGER,
    data: db.Sequelize.DATE,
    afinidade: db.Sequelize.INTEGER
  };

  return db
    .sequelize
    .define('presentedUsers', Model, { createdAt: 'data', updatedAt: false, tableName: 'tb_clientes_apresentados_gls' })
    .belongsTo(User, { foreignKey: 'id_cliente', constraints: false })
    .belongsTo(PresentedUser, { foreignKey: 'id_cliente_apresentado', constraints: false });
};