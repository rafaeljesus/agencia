module.exports = function(sequelize, DataTypes){

  var definition = {
    texto: DataTypes.STRING
  };

  var Answer = sequelize.define('Answer', definition, {
    classMethods: {
      associate: function(models) {
        Answer.hasMany(models.Poll, { through: models.Votes });
      }
    },
    timestamps: false,
    tableName: 'tb_respostas_gls'
  });

  return Answer;

};