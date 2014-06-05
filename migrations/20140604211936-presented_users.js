module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable('tb_clientes_apresentados_gls', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      id_cliente: DataTypes.INTEGER,
      id_cliente_apresentado: DataTypes.INTEGER,
      situacao: DataTypes.INTEGER,
      data: DataTypes.DATE,
      afinidade: DataTypes.INTEGER
    });
    done();
  },
  down: function(migration, DataTypes, done) {
    done()
  }
}
