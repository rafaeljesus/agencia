var app = require('../app')
, should = require('should')
, request = require('supertest')(app);

describe('Home Controller', function() {

  it('should render status 200 when do GET /', function(done){
    request.get('/').end(function(err, res){
      res.status.should.eql(200);
      done();
    });
  });

});