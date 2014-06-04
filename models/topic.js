module.exports = function() {

  var db = require('../lib/db_connect');

  var Topic = {    
    user_id: db.Sequelize.INTEGER,
    assunto: db.Sequelize.STRING,
    mensagem: db.Sequelize.TEXT,
    data: db.Sequelize.DATE
  };

  return db.sequelize.define('topics', Topic, { tableName: 'tb_topicos_gls' });

};