module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable('tb_contatos_gls', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      id_cliente: DataTypes.INTEGER,
      msn: DataTypes.STRING,
      tel_residencial: DataTypes.STRING,
      tel_celular: DataTypes.STRING,
      tel_trabalho: DataTypes.STRING,
      e_mail_contato: DataTypes.STRING
    });
    done();
  },
  down: function(migration, DataTypes, done) {
    done()
  }
}
