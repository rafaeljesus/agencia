var sequelize = require('../lib/db_connect').sequelize
, User = require('../app/models/user')()
, should = require('should');

describe('User', function(){

  it('registers a new user', function(done){
    var user = User.build({
      primeiro_nome: 'user-test',
      login: 'i-am-so-great',
      senha: 'i-am-so-great',
      email: 'valid@mail.com'
    });

    user
      .save()
      .complete(function(err, userTest) {
        if (!!err) {
          userTest.should.equal(null);
          done();
        } else {
          userTest.primeiro_nome.should.equal('user-test');
          done();
        }
      });
    });

});