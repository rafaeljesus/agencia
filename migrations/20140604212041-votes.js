module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable('tb_votos_gls', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      id_enquete: DataTypes.INTEGER,
      id_resposta: DataTypes.INTEGER
    });
    done();
  },
  down: function(migration, DataTypes, done) {
    done()
  }
}
