module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable('tb_alerta_gls', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      id_clientes_apresentados: DataTypes.INTEGER,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    });
    done();
  },
  down: function(migration, DataTypes, done) {
    done();
  }
}
