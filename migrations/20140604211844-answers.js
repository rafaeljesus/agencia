module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable('tb_respostas_gls', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      texto: DataTypes.STRING
    });
    done();
  },
  down: function(migration, DataTypes, done) {
    done()
  }
}
