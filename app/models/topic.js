module.exports = function(sequelize, DataTypes) {

  var definition = {
    assunto: DataTypes.STRING,
    mensagem: DataTypes.TEXT,
    data: DataTypes.DATE
  };

  var Topic = sequelize.define('Topic', definition, {
    classMethods: {
      associate: function(models) {
        Topic.belongsTo(models.User, { foreignKey: 'id_cliente', constraints: false });
      }
    },
    createdAt: 'data',
    updatedAt: false,
    tableName: 'tb_topicos_gls'
  });

  return Topic;
};