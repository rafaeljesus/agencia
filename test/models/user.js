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
    User.register(options, function(err, obj){
      if (err) return done(err);
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
    expect(currentUser).not.equal(null);
    done();
  });

  it('should successfully authenticate a user by login', function(done){
    var options = {
      login: currentUser.login,
      password: 'userTestPassword'
    };
    User.authenticate(options, function(err, user){
      if (err) throw err;
      expect(user.email).to.equal(currentUser.email);
      done();
    });
  });

  it('should successfully authenticate a user by email', function(done){
     var options = {
      email: currentUser.email,
      password: 'userTestPassword'
    };
    User.authenticate(options, function(err, user){
      if (err) throw err;
      expect(user.email).to.equal(currentUser.email);
      done();
    });
  });

  it('should successfully register a user', function(done){
     var options = {
      email: 'new@email.com',
      password: 'new-password',
      firstName: 'new-first-name',
      lastName: 'new-last-name'
    };
    User.register(options, function(err, user){
      if (err) return done(err);
      expect(user.email).to.equal(options.email);
      expect(user.senha).not.to.equal('new-password');
      done();
    });
  });

  it('should not register a user with invalid email', function(done){
     var options = {
      email: 'new_invalid_email.com',
      password: 'new-password',
      firstName: 'new-first-name',
      lastName: 'new-last-name'
    };
    User.register(options, function(err, user){
      expect(err.email).to.not.equal(null);
      done();
    })
  });

  it('should not register a user with invalid password');

});