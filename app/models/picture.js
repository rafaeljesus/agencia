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
      },

      load: function(id, success, error) {
        return Picture.findOrCreate( { id_cliente: id })
        .complete(function(err, contact) {
          if (!!err) {
            return error(err);
          }
          return success(contact);            
        });
      },

      update: function(options, success, error){
        var defError = {reason: 'unknown_error', message:'Ocorreu um erro ao salvar suas fotos. Desculpe... Tente novamente mais tarde'};
        

        var onCompletePictureFind = function(error, picture){
          if (!!error) {
             defError.error =  JSON.stringify(err);
             return error(defError);
           }

           picture.updateAttributes({
              foto1: options.foto1
           }).on('success', function(picture){
              success(picture);
           }).on('failure', function(error){
              error(error);
           });
        };
        
        return Picture.find({
            where: {
              id_cliente: options.id_cliente,             
           }                    
        }).complete(onCompletePictureFind);
      }

    },
    timestamps: false,
    tableName: 'tb_fotos_gls'
  });

  return Picture;
};