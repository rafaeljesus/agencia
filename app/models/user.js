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
    pais: DataTypes.STRING,
    
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
            return error({ reason: 'not_authenticated', message: 'Senha ou usuário informados estão inválidos' });
          }
          success(user);
        });
      },
      
      register: function(options, success, error) {
        var defError = {reason: 'unknown_error', message:'Ocorreu um erro ao salvar dados do seu perfil'};
        var shaSum = crypto.createHash('sha256');
        shaSum.update(options.password);
        var attrs = {
          email: options.email,
          senha: shaSum.digest('hex'),
          primeiro_nome: options.firstName,
          sobrenome: options.lastName
        };

        //checando se email ja em uso antes de salvar
        sequelize.transaction(function(transaction) {

           //Init register user 
          var onCompleteRegisterUser = function(err, user) {
              if (err) {
                  transaction.rollback();
                  return error(defError);
              }
              
              //commit
              transaction.commit();
              success(user);
          };
          //end register user

          //init onCompleteFindByMail
          var onCompleteFindByMail = function(err, users){
             if(err || ( users && users[0] ) ){
               transaction.rollback();
             }
             
             if( users && users[0] ){  return error({ reason: 'another_user_with_same_email', message: 'O e-mail '+users[0].email+' já está em uso' }); }
             if(err){  return error(defError); }

             User.create(attrs).complete(onCompleteRegisterUser);             
             
          }; //end of onCompleteFindByMail
         
          return User.findAll({
             where: {
               email: attrs.email
             }
          }).complete(onCompleteFindByMail);//end complete findall

        });//end of transaction

      },//end of register

      
      resetPassword: function(options, success, error) {
        var shaSum = crypto.createHash('sha256');
        shaSum.update(options.password);
        return User.find(options.id).complete(function(err, user) {
          if (err) {
            return error(err);
          }
          user
            .updateAttributes({ password: shaSum.digest('hex') })
            .complete(function(err, user) {
              if (err) {
                return error(err);
              }
              success(user);
            });
        });
      },
      
      load: function(id, success, error) {
        return User.find(id).complete(function(err, user) {
          if (err) {
            return error(err);
          }
          
          return success(user);            
        });
      },
      
      updateProfile: function(options, success, error){
        var defError = {reason: 'unknown_error', message:'Ocorreu um erro ao salvar dados do seu perfil'};
        sequelize.transaction(function(transaction) {
          //init of onCompleteUpdateAttributes
          var onCompleteUpdateAttributes = function(err, user) {
              if (err) {
                  transaction.rollback();
                  return error(defError);
              }
              
              //commit
              transaction.commit();
              success(user);
          };
          //end of onCompleteUpdateAttributes
        
          //init of onCompleteFindUser 
          var onCompleteFindUser = function(err, user){
            
            if (err) {
              transaction.rollback();
              return error(defError);
            }
           
            user
             .updateAttributes(options)
              .complete(onCompleteUpdateAttributes);
          };
          //end of onCompleteFindUser
           
          //init onCompleteFindAll
          var onCompleteFindAll = function(err, users){
             if(err || ( users && users[0] ) ){
               transaction.rollback();
             }

             if( users && users[0] ){  return error({ reason: 'another_user_with_same_email', message: 'O e-mail '+users[0].email+' já está em uso' }); }
             if(err){  return error(defError); }
             
             User.find(options.id).complete(onCompleteFindUser);
          }; //end of onCompleteFindAll
         
          return User.findAll({
             where: {
               id: { ne: options.id  },
               email: options.email
             }
          }).complete(onCompleteFindAll);//end complete findall
        });//end of transaction     
      },//end updateProfile
      
      changePassword: function(options, success, error){
        var shaOldPassword = crypto.createHash('sha256'); 
        shaOldPassword.update(options.oldPassword);
        var shaNewPassword = crypto.createHash('sha256'); 
        shaNewPassword.update(options.newPassword);

        var onCompleteChangePassword = function(err, user) {
          if (err) {
            return error(err);
          }
          user
            .updateAttributes({ senha: shaNewPassword.digest('hex') })
            .complete(function(err, user) {
              if (err) {
                return error(err);
              }
              success(user);
            });
        };
       
        return User.findAll({
             where: {
               id: options.id,
               senha: shaOldPassword.digest('hex')
             }
          }).complete(function(err, users){

               if(err || users == undefined || users[0] == undefined){
                 return error({reason: 'password_invalid', message: 'Senha fornecida não confere' });
               }
               User.find(options.id).complete(onCompleteChangePassword);
          });
      },//end change password
      
      checkMailInUse: function(options, success, error){
          return User.findAll({
             where: {
               id: { ne: options.id  },
               email: options.email
             }
          }).complete(function(err, users){
             if(users && users[0]){  return error({ reason: 'another_user_with_same_email', message: 'O e-mail '+users[0].email+' já está em uso' }); }
             if(err) {return error(err);}
             
            return success();
          });
          
      },//end of checkMailInUse
      
    },
    
    
    tableName: 'tb_clientes_gls'
  });

  return User;
};
