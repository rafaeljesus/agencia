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
    })
  });

  it('should not register a user with invalid password');

});