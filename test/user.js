var sequelize = require('../lib/db_connect').sequelize
, User = require('../models/user')()
, should = require('should');

describe('User', function(){

  it('registers a new user', function(done){
  	var user = User.build({
      name: 'user-test',
      password: 'i-am-so-great',
      password_confirmation: 'i-am-so-great'
    });

    user
      .save()
      .complete(function(err, userTest) {
        if (!!err) {
          userTest.should.equal(null);
          done();
        } else {
          userTest.name.should.equal('user-test');
          done();
        }
      });
    });

});