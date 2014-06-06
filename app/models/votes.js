module.exports = function() {

  var db = require('../../lib/db_connect');

  var Model = {
    id_enquete: db.Sequelize.INTEGER,
    id_resposta: db.Sequelize.INTEGER
  };

  return db
    .sequelize
    .define('votes', Model, { timestamps: false, tableName: 'tb_votos_gls' });
};