module.exports = function(sequelize, DataTypes){

  var definition = {
    situacao: DataTypes.INTEGER,
    data: DataTypes.DATE,
    afinidade: DataTypes.INTEGER
  };

  var PresentedUsers = sequelize.define('PresentedUsers', definition, {
    classMethods: {
      associate: function(models) {
        PresentedUsers.belongsTo(models.User, { foreignKey: 'id_cliente', constraints: false });
        PresentedUsers.belongsTo(models.User, { foreignKey: 'id_cliente_apresentado', constraints: false });
      }
    },
    createdAt: 'data',
    updatedAt: false,
    tableName: 'tb_clientes_apresentados_gls'
  });

  return PresentedUsers;
};