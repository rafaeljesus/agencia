module.exports = function(sequelize, DataTypes) {

  var definition = {
    id_enquete: DataTypes.INTEGER,
    id_resposta: DataTypes.INTEGER
  };

  var Votes = sequelize.define('Votes', definition, {
    classMethods: {
      associate: function(models) {
        Votes.belongsTo(models.Poll, { foreignKey: 'id_enquete', constraints: false });
        Votes.belongsTo(models.Answer, { foreignKey: 'id_resposta', constraints: false });
      }
    },
    timestamps: false,
    tableName: 'tb_votos_gls'
  });

  return Votes;
};