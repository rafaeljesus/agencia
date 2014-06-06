module.exports = function(){

  var db = require('../../lib/db_connect')
  , User = require('user');

  var Model = {
    foto1: db.Sequelize.BLOB,
    foto2: db.Sequelize.BLOB,
    foto3: db.Sequelize.BLOB
  };

  return db
    .sequelize
    .define('picture', Model, { timestamps: false, tableName: 'tb_fotos_gls' })
    .belongsTo(User, { foreignKey: 'id_cliente', constraints: false })''
};