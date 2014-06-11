var User = require('../app/models').User
, should = require('should');

describe('User', function(){

  var currentUser = null;

  beforeEach(function(done){
    User.create({
      primeiro_nome: 'userTest',
      login: 'userTestLogin',
      senha: 'userTestPassword',
      email: 'valid@mail.com'
    }).success(function(obj){
      currentUser = obj;
      done();
    });
  });

  afterEach(function(done){
    User.destroy().success(function(){
      done();
    });
  });

  it('ensure user is created', function(done){
    currentUser.should.not.equal(null);
    currentUser.primeiro_nome.should.equal('userTest');
    done();
  });

  it('should successfully authenticate a user by login', function(done){
    var options = {
      login: currentUser.login,
      password: currentUser.senha
    };
    User
      .authenticate(options)
      .complete(function(err, user){
        user.login.should.equal(currentUser.login);
        user.email.should.equal(currentUser.email);
        done();
      })
  });

  it('should successfully authenticate a user by email', function(done){
     var options = {
      email: currentUser.email,
      password: currentUser.senha
    };
    User
      .authenticate(options)
      .complete(function(err, user){
        user.login.should.equal(currentUser.login);
        user.email.should.equal(currentUser.email);
        done();
      })
  });

});