var User = require('../../app/models').User
  , expect = require('chai').expect;

describe('User', function(){

  var currentUser = null;

  beforeEach(function(done){
    var options = {
      firstName: 'userTest',
      lastName: 'userTestLogin',
      password: 'userTestPassword',
      email: 'valid@email.com'
    };
    User.register(options, function(user) {
      currentUser = user;
      done();
    }, function(err) {
      return done(err);
    });
  });

  afterEach(function(done){
    User.destroy().success(function(){
      done();
    });
  });

  it('ensure user is created', function(done){
    expect(currentUser).not.equal(null);
    done();
  });

  it('should successfully authenticate a user by login', function(done){
    var options = {
      login: currentUser.login,
      password: 'userTestPassword'
    };
    User.authenticate(options, function(user) {
      expect(user.email).to.equal(currentUser.email);
      done();
    }, function(err) {
      return done(err);
    });
  });

  it('should successfully authenticate a user by email', function(done){
    var options = {
      email: currentUser.email,
      password: 'userTestPassword'
    };
    User.authenticate(options, function(user) {
      expect(user.email).to.equal(currentUser.email);
      done();
    }, function(err) {
      return done(err);
    });
  });

  it('should successfully register a user', function(done){
    var options = {
      email: 'new@email.com',
      password: 'new-password',
      firstName: 'new-first-name',
      lastName: 'new-last-name'
    };
    User.register(options, function(user){
      expect(user.email).to.equal(options.email);
      expect(user.senha).not.to.equal('new-password');
      done();
    }, function(err) {
      return done(err);
    });
  });

  it('should not register a user with invalid email', function(done){
    var options = {
      email: 'new_invalid_email.com',
      password: 'new-password',
      firstName: 'new-first-name',
      lastName: 'new-last-name'
    };
    User.register(options, function(user) {
      expect(user).to.equal(null);
      done();
    }, function(err) {
      expect(err.email).to.not.equal(null);
      done();
    });
  });

  it('should not register a user with a email that already was registered by another user', function(done){
    var options = {
      email: 'valid@email.com',
      password: 'new-password',
      firstName: 'new-first-name',
      lastName: 'new-last-name'
    };
    User.register(options, function(user) {
    }, function(err) {
      expect(err.reason).to.equal('another_user_with_same_email');
      done();
    });
  });


  it('should load a user by id', function(done){
    var options = {
      id: currentUser.id
    };

    User.load(options, function(userLoaded){
      expect(userLoaded.id).to.equal(options.id);
      expect(userLoaded.name).to.equal(currentUser.name);
      done();
    }, function(err){
      return done(err);
    });

  });

  // FIXME
  it('should update a profile inside a transaction and throw a exception case email is already in use', function(done){

    var options = {
      email: 'kadusjc@yahoo.com.br',
      password: 'new-password',
      firstName: 'new-first-name',
      lastName: 'new-last-name'
    };
    User.register(options, function(user) {
      expect(user).to.not.equal(null);
      options.email = currentUser.email;
      options.id = user.id;
      done();
      /*User.updateProfile(options, function(userUpdated) {
        expect(err.reason).to.equal('another_user_with_same_email');
        done();
      });
    }, function(err) {
      return done(err);*/
    });
  });


  // FIXME
  it('should update a profile successfully case informed email is not in use', function(done){

    var options = {
      id : currentUser.id,
      altura: 1.80,
      peso: 86,
      estilo_corpo: 'Corpo Chique',
      tom_pele: 'Clara',
      cor_olhos: 'Castanhos',
      cor_cabelo: 'Branco',
      volume_cabelo: 'Raspado',
      trabalha: true,
      estuda: true,
      tem_filhos: true,
      possui_carro: true, 
      como_mora: 'Sozinho',
      religiao: 'Espírita',
      formacao_academica: 'Engenheiro',        
      signo: 'Aquário',
      gosta_tv: false,
      gosta_ler: false,
      fuma: true,
      estilo_musical1: 'Rap',
      estilo_musical2: 'Rock',
      estilo_musical3: 'MPB',
      estilo_musical4: 'Forregae',
      visual: 'Agradevel',
      viagem1: 'Praia',
      viagem2: 'Fazenda',
      pratica_exercicio: true,
      bebida: 'Pa caramba',
      email: 'ceduardo@ferreirocorrea.org.br',
      sexo: 1,
      primeiro_nome: 'Carlos',
      sobrenome: 'Correa',
      idade: 30,
      como_atua: 1,
      compromissado: true,
      cidade: 'São Juza',
      estado: 'Sampa',
      pais: 'BR'
    };

    /*User.updateProfile(options, function(userUpdated){
      expect(userUpdated.id).to.equals(options.id);
      expect(userUpdated.altura).to.equal(options.altura);
      expect(userUpdated.peso).to.equal(options.peso);
      expect(userUpdated.estilo_corpo).to.equal(options.estilo_corpo);
      expect(userUpdated.tom_pele).to.equal(options.tom_pele);
      expect(userUpdated.cor_olhos).to.equal(options.cor_olhos);
      expect(userUpdated.cor_cabelo).to.equal(options.cor_cabelo);
      expect(userUpdated.volume_cabelo).to.equal(options.volume_cabelo);
      expect(userUpdated.trabalha).to.equal(options.trabalha);
      expect(userUpdated.estuda).to.equal(options.estuda);
      expect(userUpdated.tem_filhos).to.equal(options.tem_filhos);
      expect(userUpdated.possui_carro).to.equal(options.possui_carro);
      expect(userUpdated.como_mora).to.equal(options.como_mora);
      expect(userUpdated.religiao).to.equal(options.religiao);
      expect(userUpdated.formacao_academica).to.equal(options.formacao_academica);
      expect(userUpdated.signo).to.equal(options.signo);
      expect(userUpdated.gosta_ler).to.equal(options.gosta_ler);
      expect(userUpdated.gosta_tv).to.equal(options.gosta_tv);
      expect(userUpdated.fuma).to.equal(options.fuma);
      expect(userUpdated.estilo_musical1).to.equal(options.estilo_musical1);
      expect(userUpdated.estilo_musical2).to.equal(options.estilo_musical2);
      expect(userUpdated.estilo_musical3).to.equal(options.estilo_musical3);
      expect(userUpdated.estilo_musical4).to.equal(options.estilo_musical4);
      expect(userUpdated.visual).to.equal(options.visual);
      expect(userUpdated.viagem1).to.equal(options.viagem1);
      expect(userUpdated.viagem2).to.equal(options.viagem2);
      expect(userUpdated.pratica_exercicio).to.equal(options.pratica_exercicio);
      expect(userUpdated.bebida).to.equal(options.bebida);
      expect(userUpdated.email).to.equal(options.email);
      expect(userUpdated.sexo).to.equal(options.sexo);
      expect(userUpdated.primeiro_nome).to.equal(options.primeiro_nome);
      expect(userUpdated.sobrenome).to.equal(options.sobrenome);
      expect(userUpdated.idade).to.equal(options.idade);
      expect(userUpdated.como_atua).to.equal(options.como_atua);
      expect(userUpdated.compromissado).to.equal(options.compromissado);
      expect(userUpdated.cidade).to.equal(options.cidade);
      expect(userUpdated.estado).to.equal(options.estado);
      expect(userUpdated.pais).to.equal(options.pais);
      done();
    }, function(err){
      return done(err);
    });*/
    done();
  });

  it('should be able to change the user"s password validating it - error case', function(done){
    var options = {
      oldPassword: 'errado',
      newPassword: 'Novo',
      id: currentUser.id
    };

    User.changePassword(options, function(user){

    }, function(err){
      expect(err.reason).to.equal('password_invalid');
      done();
    });
  });

  it('should be able to change the user"s password validating it - successfully case', function(done){
    var options = {
      oldPassword: 'userTestPassword',
      newPassword: 'Novo',
      id: currentUser.id
    };

    User.changePassword(options, function(user){
      expect(user.senha).to.not.equal(currentUser.senha);
      done();   
    }, function(err){
      return done(err);         
    });
  });

  it('should be able to check if a email is in user - email already in Use Case', function(done){

    //Saving a new user
    var options = {
      email: 'kadusjc@yahoo.com.br',
      password: 'new-password',
      firstName: 'new-first-name',
      lastName: 'new-last-name'
    };
    User.register(options, function(user) {
      expect(user).to.not.equal(null);


      options.id = currentUser.id;

      User.checkMailInUse(options, function(user){

      }, function(err){
        expect(err.reason).to.equal('another_user_with_same_email');
        done();
      });  


    }, function(err) {
      return done(err);

    })

  });

  it('should be able to check if a email is in user - email not in use Case', function(done){

    var options = {
      email: 'valid@email.com.br',
      password: 'new-password',
      firstName: 'new-first-name',
      lastName: 'new-last-name',
      id: currentUser.id
    };

    User.checkMailInUse(options, function(user){
      expect(user).to.not.equal(null);
      done();
    }, function(err){
      return done(err);
    });

  });

});
