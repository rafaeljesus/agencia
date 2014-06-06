module.exports = function() {

  var db = require('../../lib/db_connect')
  , User = require('user');

  var Model = {
    sexo: db.Sequelize.INTEGER,
    idade_min: db.Sequelize.INTEGER,
    idade_max: db.Sequelize.INTEGER,
    estado: db.Sequelize.STRING,
    cidade: db.Sequelize.STRING,
    importancia_cidade: db.Sequelize.INTEGER,
    localidade: db.Sequelize.STRING,
    importancia_localidade: db.Sequelize.INTEGER,
    altura_min: db.Sequelize.FLOAT,
    altura_max: db.Sequelize.FLOAT,
    peso_min: db.Sequelize.INTEGER,
    peso_max: db.Sequelize.INTEGER,
    estilo_corpo: db.Sequelize.STRING,
    importancia_estilo_corpo: db.Sequelize.INTEGER,
    tom_pele: db.Sequelize.STRING,
    importancia_tom_pele: db.Sequelize.INTEGER,
    cor_cabelo: db.Sequelize.STRING,
    importancia_cor_cabelo: db.Sequelize.INTEGER,
    volume_cabelo: db.Sequelize.STRING,
    importancia_volume_cabelo: db.Sequelize.INTEGER,
    trabalha: db.Sequelize.BOOLEAN,
    estuda: db.Sequelize.BOOLEAN,
    tem_filhos: db.Sequelize.BOOLEAN,
    possui_carro: db.Sequelize.BOOLEAN,
    religiao: db.Sequelize.STRING,
    importancia_religiao: db.Sequelize.INTEGER,
    formacao_academica: db.Sequelize.STRING,
    importancia_formacao_academica: db.Sequelize.INTEGER,
    gosta_tv: db.Sequelize.INTEGER,
    gosta_ler: db.Sequelize.INTEGER,
    importancia_estilo_musica: db.Sequelize.INTEGER,
    fuma: db.Sequelize.INTEGER,
    bebida: db.Sequelize.STRING,
    importancia_bebida: db.Sequelize.INTEGER,
    como_atua: db.Sequelize.INTEGER
  };

  return db
    .sequelize
    .define('wantedProfile', Model, { timestamps: false, tableName: 'tb_perfil_procurado_gls' })
    .belongsTo(User, { foreignKey: 'id_cliente' });
};
