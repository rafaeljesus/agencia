module.exports = function(sequelize, DataTypes){

  var definition = {
    foto1: DataTypes.BLOB,
    foto2: DataTypes.BLOB,
    foto3: DataTypes.BLOB
  };

  var Picture = sequelize.define('Picture', definition, {
    classMethods: {
      associate: function(models) {
        Picture.belongsTo(models.User, { foreignKey: 'id_cliente', constraints: false });
      }
    },
    timestamps: false,
    tableName: 'tb_fotos_gls'
  });

  return Picture;
};