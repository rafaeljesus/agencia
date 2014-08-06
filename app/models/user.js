module.exports = function(sequelize, DataTypes) {

  var crypto = require('crypto');

  var definition = {
    primeiro_nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sobrenome: DataTypes.STRING,
    login: DataTypes.STRING,
    senha: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
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
    como_mora: DataTypes.STRING,
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
      authenticate: function(options, success, error) {
        var shaSum = crypto.createHash('sha256');
        shaSum.update(options.password);
        return User.find({
          where: sequelize.and({
            senha: shaSum.digest('hex')
          }, sequelize.or(
            { login: options.loginOrEmail },
            { email: options.loginOrEmail })
          )
        }).complete(function(err, user){
          if (err || !user) {
            error({ error: 'forbidden', reason: 'not_authenticated' });
            return;
          }
          success(user);
        });
      },
      register: function(options, success, error) {
        var shaSum = crypto.createHash('sha256');
        shaSum.update(options.password);
        var attrs = {
          email: options.email,
          senha: shaSum.digest('hex'),
          primeiro_nome: options.firstName,
          sobrenome: options.lastName
        };
        return User.create(attrs).complete(function(err, user) {
          if (err) {
            error(err);
            return;
          }
          success(user);
        });
      },
      changePassword: function(options, success, error) {
        var shaSum = crypto.createHash('sha256');
        shaSum.update(options.password);
        return User.find(options.id).complete(function(err, user) {
          if (err) {
            error(error);
            return;
          }
          user
            .updateAttributes({ password: shaSum.digest('hex') })
            .complete(function(err, user) {
              if (err) {
                error(error);
                return;
              }
              success(user);
            });
        });
      },
      load: function(id, success, error) {
        return User.find(id).complete(function(err, user) {
          if (err) {
            error(error);
            return;
          }
          return success(user);            
        });
      },
      updateProfile: function(options, success, error){
        sequelize.transaction(function(transaction) {
           
          //init of onCompleteFindUser 
          var onCompleteFindUser = function(err, user){
            
            if (err) {
              error(error);
              transaction.rollback();
              return;
            }
           
            user
             .updateAttributes(options)
              .complete(function(err, user) {
                  
                if (err) {
                    error(error);
                    transaction.rollback();
                    return;
                }
                
                //commit
                transaction.commit();
                success(user);
              });
          };
          //end of onCompleteFindUser
           
           
           
          //init onCompleteFindAll
          var onCompleteFindAll = function(err, user){
            
             if(err){
               error(err);
               transaction.rollback();
               return;
             }
             
             console.log('userID founded: '+user.id);
             console.log('userID sent: '+options.id);
             
             if(user){
               transaction.rollback();
               error({ error: 'error', reason: 'another_user_with_same_email' });
               return;
             }
             
             User.find(options.id).complete(onCompleteFindUser);
          };
          //end of onCompleteFindAll
           
           
          return User.findAll({
             where: {
               id: { ne: options.id  },
               email: options.email
             }
          }).complete(onCompleteFindAll);//end complete findall
           
             
        });//end of transaction     
      }//end updateProfile
      
    },
    tableName: 'tb_clientes_gls'
  });

  return User;
};
