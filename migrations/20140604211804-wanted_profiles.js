module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable('tb_perfil_procurado_gls', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      id_cliente: DataTypes.INTEGER(10).UNSIGNED,
      sexo: DataTypes.INTEGER(10).UNSIGNED,
      idade: DataTypes.INTEGER(10).UNSIGNED,
      estado: DataTypes.STRING,
      cidade: DataTypes.STRING,
      importancia_cidade: DataTypes.INTEGER(10).UNSIGNED,
      localidade: DataTypes.STRING,
      importancia_localidade: DataTypes.INTEGER(10).UNSIGNED,
      altura_min: DataTypes.FLOAT,
      altura_max: DataTypes.FLOAT,
      peso_min: DataTypes.INTEGER(10).UNSIGNED,
      peso_max: DataTypes.INTEGER(10).UNSIGNED,
      estilo_corpo: DataTypes.STRING,
      importancia_estilo_corpo: DataTypes.INTEGER(10).UNSIGNED,
      tom_pele: DataTypes.STRING,
      importancia_tom_pele: DataTypes.INTEGER(10).UNSIGNED,
      cor_cabelo: DataTypes.STRING,
      importancia_cor_cabelo: DataTypes.INTEGER(10).UNSIGNED,
      volume_cabelo: DataTypes.STRING,
      importancia_volume_cabelo: DataTypes.INTEGER(10).UNSIGNED,
      trabalha: DataTypes.BOOLEAN,
      estuda: DataTypes.BOOLEAN,
      tem_filhos: DataTypes.BOOLEAN,
      possui_carro: DataTypes.BOOLEAN,
      religiao: DataTypes.STRING,
      importancia_religiao: DataTypes.INTEGER(10).UNSIGNED,
      formacao_academica: DataTypes.STRING,
      importancia_formacao_academica: DataTypes.INTEGER(10).UNSIGNED,
      gosta_tv: DataTypes.INTEGER(10).UNSIGNED,
      gosta_ler: DataTypes.INTEGER(10).UNSIGNED,
      importancia_estilo_musica: DataTypes.INTEGER(10).UNSIGNED,
      fuma: DataTypes.INTEGER(10).UNSIGNED,
      bebida: DataTypes.STRING,
      importancia_bebida: DataTypes.INTEGER(10).UNSIGNED,
      como_atua: DataTypes.INTEGER(10).UNSIGNED
    });
    done();
  },
  down: function(migration, DataTypes, done) {
    done()
  }
}
