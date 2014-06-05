module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable('tb_pagamento_gls', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      id_cliente: DataTypes.INTEGER,
      valor: DataTypes.FLOAT,
      data_inicio: DataTypes.DATE,
      data_fim: DataTypes.DATE,
      situacao: DataTypes.INTEGER,
      data_pagamento: DataTypes.DATE
    });
    done();
  },
  down: function(migration, DataTypes, done) {
    done()
  }
}
