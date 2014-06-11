module.exports = function(sequelize, DataTypes){

  var definition = {
    pergunta: DataTypes.STRING
  };

  var Poll = sequelize.define('Poll', definition, {
    classMethods: {
      associate: function(models) {
        Poll.hasMany(models.Answer, { through: models.Votes });
      }
    },
    timestamps: false,
    tableName: 'tb_enquetes_gls'
  });

  return Poll;
};