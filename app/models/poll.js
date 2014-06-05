module.exports = function(){

  var db = require('../lib/db_connect')
  , Answer = require('answer')
  , Votes = require('votes');

  var Model = {
    pergunta: db.Sequelize.STRING
  };

  return db
    .sequelize
    .define('poll', Model, { timestamps: false, tableName: 'tb_enquetes_gls' })
    .hasMany(Answer, { through: Votes });
};