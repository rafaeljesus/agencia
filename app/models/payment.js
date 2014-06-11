module.exports = function(sequelize, DataTypes){

  var definition = {
    valor: DataTypes.FLOAT,
    data_inicio: DataTypes.DATE,
    data_fim: DataTypes.DATE,
    numero: DataTypes.STRING,
    data_pagamento: DataTypes.DATE,
    situacao: DataTypes.INTEGER
  };

  var Payment = sequelize.define('Payment', definition, {
      classMethods: {
        associate: function(models) {
          Payment.belongsTo(models.User, { foreignKey: 'id_cliente', constraints: false });
        }
      },
      createdAt: 'data_pagamento',
      updatedAt: false,
      tableName: 'tb_pagamento_gls'
    });

  return Payment;
};