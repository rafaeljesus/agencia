module.exports = function(){

  var db = require('../lib/db_connect')
  , PresentedUser = require('user');

  return db
    .sequelize
    .define('alert', {}, { tableName: 'tb_alerta_gls' })
    .belongsTo(PresentedUser, { foreignKey: 'id_clientes_apresentados', constraints: false });
};