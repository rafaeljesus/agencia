module.exports = function() {

  var db = require('../lib/db_connect');

  var User = {
    name: db.Sequelize.STRING,
    password: db.Sequelize.STRING
  };

  return db.sequelize.define('users', User);
};
