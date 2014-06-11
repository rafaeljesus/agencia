module.exports = function(sequelize, DataTypes) {

  var definition = {
    sexo: DataTypes.INTEGER,
    idade_min: DataTypes.INTEGER,
    idade_max: DataTypes.INTEGER,
    estado: DataTypes.STRING,
    cidade: DataTypes.STRING,
    importancia_cidade: DataTypes.INTEGER,
    localidade: DataTypes.STRING,
    importancia_localidade: DataTypes.INTEGER,
    altura_min: DataTypes.FLOAT,
    altura_max: DataTypes.FLOAT,
    peso_min: DataTypes.INTEGER,
    peso_max: DataTypes.INTEGER,
    estilo_corpo: DataTypes.STRING,
    importancia_estilo_corpo: DataTypes.INTEGER,
    tom_pele: DataTypes.STRING,
    importancia_tom_pele: DataTypes.INTEGER,
    cor_cabelo: DataTypes.STRING,
    importancia_cor_cabelo: DataTypes.INTEGER,
    volume_cabelo: DataTypes.STRING,
    importancia_volume_cabelo: DataTypes.INTEGER,
    trabalha: DataTypes.BOOLEAN,
    estuda: DataTypes.BOOLEAN,
    tem_filhos: DataTypes.BOOLEAN,
    possui_carro: DataTypes.BOOLEAN,
    religiao: DataTypes.STRING,
    importancia_religiao: DataTypes.INTEGER,
    formacao_academica: DataTypes.STRING,
    importancia_formacao_academica: DataTypes.INTEGER,
    gosta_tv: DataTypes.INTEGER,
    gosta_ler: DataTypes.INTEGER,
    importancia_estilo_musica: DataTypes.INTEGER,
    fuma: DataTypes.INTEGER,
    bebida: DataTypes.STRING,
    importancia_bebida: DataTypes.INTEGER,
    como_atua: DataTypes.INTEGER
  };

  var WantedProfile = sequelize.define('WantedProfile', definition, {
    classMethods: {
      associate: function(models){
        WantedProfile.belongsTo(models.User, { foreignKey: 'id_cliente' });
      }
    },
    timestamps: false,
    tableName: 'tb_perfil_procurado_gls'
  });

  return WantedProfile;

};