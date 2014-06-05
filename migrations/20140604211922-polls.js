module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable('tb_enquetes_gls', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      pergunta: DataTypes.STRING
    });
    done();
  },
  down: function(migration, DataTypes, done) {
    done()
  }
}
