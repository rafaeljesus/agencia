module.exports = function(sequelize, DataTypes) {

  var definition = {
    primeiro_nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sobrenome: DataTypes.STRING,
    login: DataTypes.STRING,
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        max: 30,
        min: 6
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    msn: DataTypes.STRING,
    rg: DataTypes.STRING,
    tel_residencial: DataTypes.STRING,
    tel_celular: DataTypes.STRING,
    tel_trabalho: DataTypes.STRING,
    ativado: DataTypes.BOOLEAN,
    compromissado: DataTypes.BOOLEAN,
    permissiao: DataTypes.INTEGER,
    sexo: DataTypes.INTEGER,
    idade: DataTypes.INTEGER,
    estado: DataTypes.STRING,
    cidade: DataTypes.STRING,
    altura: DataTypes.FLOAT,
    peso: DataTypes.INTEGER,
    estilo_corpo: DataTypes.STRING,
    tom_pele: DataTypes.STRING,
    cor_olhos: DataTypes.STRING,
    cor_cabelo: DataTypes.STRING,
    volume_cabelo: DataTypes.STRING,
    trabalha: DataTypes.BOOLEAN,
    estuda: DataTypes.BOOLEAN,
    como_mora: DataTypes.BOOLEAN,
    tem_filhos: DataTypes.BOOLEAN,
    possui_carro: DataTypes.BOOLEAN,
    religiao: DataTypes.STRING,
    formacao_academica: DataTypes.STRING,
    signo: DataTypes.STRING,
    gosta_tv: DataTypes.STRING,
    gosta_ler: DataTypes.STRING,
    estilo_musical1: DataTypes.STRING,
    estilo_musical2: DataTypes.STRING,
    estilo_musical3: DataTypes.STRING,
    estilo_musical4: DataTypes.STRING,
    visual: DataTypes.STRING,
    viagem1: DataTypes.STRING,
    viagem2: DataTypes.STRING,
    fuma: DataTypes.BOOLEAN,
    pratica_exercicio: DataTypes.BOOLEAN,
    bebida: DataTypes.STRING,
    foto: DataTypes.BLOB,
    como_atua: DataTypes.INTEGER,
    recebe_cadastros: DataTypes.INTEGER
  };

  var User = sequelize.define('User', definition, {
    classMethods: {
      authenticate: function(options) {
        return User.find({
          where: sequelize.and({
            senha: options.password
          }, sequelize.or(
            { login: options.login },
            { email: options.email })
          )
        });
      },
      register: function(options) {
        var attrs = {
          email: options.email,
          senha: options.password,
          primeiro_nome: options.firstName,
          sobrenome: options.lastName
        };
        return User.create(attrs);
      }
    },
    tableName: 'tb_clientes_gls'
  });

  return User;
};
