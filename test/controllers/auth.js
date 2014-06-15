var app = require('../../app')
, expect = require('chai').expect
, request = require('supertest')(app)
, User = require('../../app/models').User;

describe('Auth Controller', function() {

  var currentUser = null;

  beforeEach(function(done){
    User.register({
      firstName: 'userTest',
      lastName: 'userTestLogin',
      password: 'userTestPassword',
      email: 'valid@email.com'
    }).complete(function(err, obj){
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

  it('when user is valid then authenticate', function(done){
    var options = { email: currentUser.email, password: 'userTestPassword' };
    request
      .post('/authenticate')
      .set('Accept', 'application/json')
      .send(options)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res){
        if (err) return done(err);
        expect(res.body.firstName).to.equal('userTest');
        done();
      });
  });

  it('when user is valid then register', function(done){
    var options = {
      email: 'somevalid@email.com',
      password: 'valid-password',
      firstName: 'User Test First Name',
      lastName: 'User Last Name'
    };
    request
      .post('/register')
      .set('Accept', 'application/json')
      .send(options)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res){
        if (err) return done(err);
        expect(res.body.firstName).to.equal('User Test First Name');
        done();
      });
  });

});
