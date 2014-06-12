var app = require('../app')
, should = require('should')
, request = require('supertest')(app);

describe('Auth Controller', function() {

  it('should render status 401 when do empty login', function(done){
    var options = { user: { email: '', password: '' } };
    request.post('/authenticate').send(options).end(function(err, res){
      expect(res.statusCode).to.equal(401);
      done();
    });
  });

});