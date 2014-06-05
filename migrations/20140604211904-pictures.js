module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable('tb_fotos_gls', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      id_cliente: DataTypes.INTEGER,
      foto1: DataTypes.BLOB,
      foto2: DataTypes.BLOB,
      foto3: DataTypes.BLOB
    });
    done();
  },
  down: function(migration, DataTypes, done) {
    done()
  }
}
