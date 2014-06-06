module.exports = function(){

  var db = require('../../lib/db_connect')
  , Poll = require('poll')
  , Votes = require('votes');

  var Model = {
    texto: db.Sequelize.STRING
  };

  return db
    .sequelize
    .define('answer', Model, { timestamps: false, tableName: 'tb_respostas_gls' })
    .hasMany(Poll, { through: Votes });
};