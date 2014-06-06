module.exports = function(){

  var db = require('../../lib/db_connect')
  , User = require('user');

  var Model = {
    valor: db.Sequelize.FLOAT,
    data_inicio: db.Sequelize.DATE,
    data_fim: db.Sequelize.DATE,
    numero: db.Sequelize.STRING,
    data_pagamento: db.Sequelize.DATE,
    situacao: db.Sequelize.INTEGER
  };

  return db
    .sequelize
    .define('payments', Model, { createdAt: 'data_pagamento', updatedAt: false, tableName: 'tb_pagamento_gls' })
    .belongsTo(User, { foreignKey: 'id_cliente', constraints: false });
};