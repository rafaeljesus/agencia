module.exports = function() {

  var db = require('../../lib/db_connect');

  var Model = {
    primeiro_nome: db.Sequelize.STRING,
    sobrenome: db.Sequelize.STRING,
    login: db.Sequelize.STRING,
    senha: db.Sequelize.STRING,
    email: db.Sequelize.STRING,
    msn: db.Sequelize.STRING,
    tel_residencial: db.Sequelize.STRING,
    tel_celular: db.Sequelize.STRING,
    tel_trabalho: db.Sequelize.STRING,
    ativado: db.Sequelize.BOOLEAN,
    compromissado: db.Sequelize.BOOLEAN,
    permissiao: db.Sequelize.INTEGER,
    sexo: db.Sequelize.INTEGER,
    idade: db.Sequelize.INTEGER,
    estado: db.Sequelize.STRING,
    cidade: db.Sequelize.STRING,
    altura: db.Sequelize.FLOAT,
    peso: db.Sequelize.INTEGER,
    estilo_corpo: db.Sequelize.STRING,
    tom_pele: db.Sequelize.STRING,
    cor_olhos: db.Sequelize.STRING,
    cor_cabelo: db.Sequelize.STRING,
    volume_cabelo: db.Sequelize.STRING,
    trabalha: db.Sequelize.BOOLEAN,
    estuda: db.Sequelize.BOOLEAN,
    como_mora: db.Sequelize.BOOLEAN,
    tem_filhos: db.Sequelize.BOOLEAN,
    possui_carro: db.Sequelize.BOOLEAN,
    religiao: db.Sequelize.STRING,
    formacao_academica: db.Sequelize.STRING,
    signo: db.Sequelize.STRING,
    gosta_tv: db.Sequelize.STRING,
    gosta_ler: db.Sequelize.STRING,
    estilo_musical1: db.Sequelize.STRING,
    estilo_musical2: db.Sequelize.STRING,
    estilo_musical3: db.Sequelize.STRING,
    estilo_musical4: db.Sequelize.STRING,
    visual: db.Sequelize.STRING,
    viagem1: db.Sequelize.STRING,
    viagem2: db.Sequelize.STRING,
    fuma: db.Sequelize.BOOLEAN,
    pratica_exercicio: db.Sequelize.BOOLEAN,
    bebida: db.Sequelize.STRING,
    foto: db.Sequelize.BLOB,
    como_atua: db.Sequelize.INTEGER,
    recebe_cadastros: db.Sequelize.INTEGER
  };

  return db
    .sequelize
    .define('user', Model, { tableName: 'tb_clientes_gls' });
};
