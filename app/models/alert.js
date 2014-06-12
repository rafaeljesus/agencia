module.exports = function(sequelize, DataTypes){

  var Alert = sequelize.define('Alert', {}, {
    classMethods: {
      associate: function(models){
        Alert.belongsTo(models.PresentedUsers, { foreignKey: 'id_clientes_apresentados', constraints: false });
      }
    },
    tableName: 'tb_alerta_gls'
  });

  return Alert;
};