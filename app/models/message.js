module.exports = function(sequelize, DataTypes){

  var definition = {
    assunto: DataTypes.STRING,
    mensagem: DataTypes.TEXT,
    data: DataTypes.DATE
  };

  var Message = sequelize.define('Message', definition, {
    classMethods: {
      associate: function(models) {
        Message.belongsTo(models.User, { foreignKey: 'id_cliente', constraints: false });
        Message.belongsTo(models.Topic, { foreignKey: 'id_topico', constraints: false });
      }
    },
    createdAt: 'data',
    updatedAt: false,
    tableName: 'tb_mensagens_gls'
  });

  return Message;
};