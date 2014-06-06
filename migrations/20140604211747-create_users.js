module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable('tb_clientes_gls', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      primeiro_nome: DataTypes.STRING,
      sobrenome: DataTypes.STRING,
      login: DataTypes.STRING,
      senha: DataTypes.STRING,
      email: DataTypes.STRING,
      msn: DataTypes.STRING,
      tel_residencial: DataTypes.STRING,
      tel_celular: DataTypes.STRING,
      tel_trabalho: DataTypes.STRING,
      ativado: DataTypes.BOOLEAN,
      compromissado: DataTypes.BOOLEAN,
      permissiao: DataTypes.INTEGER(10).UNSIGNED,
      sexo: DataTypes.INTEGER(10).UNSIGNED,
      idade: DataTypes.INTEGER(10).UNSIGNED,
      estado: DataTypes.STRING,
      cidade: DataTypes.STRING,
      altura: DataTypes.FLOAT,
      peso: DataTypes.INTEGER(10).UNSIGNED,
      estilo_corpo: DataTypes.STRING,
      tom_pele: DataTypes.STRING,
      cor_olhos: DataTypes.STRING,
      cor_cabelo: DataTypes.STRING,
      volume_cabelo: DataTypes.STRING,
      trabalha: DataTypes.BOOLEAN,
      estuda: DataTypes.BOOLEAN,
      como_mora: DataTypes.BOOLEAN,
      tem_filhos: DataTypes.BOOLEAN,
      possui_carro: DataTypes.BOOLEAN,
      religiao: DataTypes.STRING,
      formacao_academica: DataTypes.STRING,
      signo: DataTypes.STRING,
      gosta_tv: DataTypes.STRING,
      gosta_ler: DataTypes.STRING,
      estilo_musical1: DataTypes.STRING,
      estilo_musical2: DataTypes.STRING,
      estilo_musical3: DataTypes.STRING,
      estilo_musical4: DataTypes.STRING,
      visual: DataTypes.STRING,
      viagem1: DataTypes.STRING,
      viagem2: DataTypes.STRING,
      fuma: DataTypes.BOOLEAN,
      pratica_exercicio: DataTypes.BOOLEAN,
      bebida: DataTypes.STRING,
      foto: DataTypes.BLOB,
      como_atua: DataTypes.INTEGER(10).UNSIGNED,
      recebe_cadastros: DataTypes.INTEGER(10).UNSIGNED
    });
    done();
  },
  down: function(migration, DataTypes, done) {
    done()
  }
}
