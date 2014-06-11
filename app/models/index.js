var fs        = require('fs')
  , path      = require('path')
  , Sequelize = require('sequelize')
  , lodash    = require('lodash')
  , db        = {}
  , db_config = require('../../config/config.json')[process.env.NODE_ENV]
  , sequelize = new Sequelize(db_config.database, db_config.username, db_config.password, {
      dialect: db_config.dialect,
      host:   db_config.host,
      syncOnAssociation: true,
      pool: { maxConnections: 5, maxIdleTime: 30 }
    });

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js')
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  });

Object.keys(db).forEach(function(modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db)
  }
});

module.exports = lodash.extend({
  sequelize: sequelize,
  Sequelize: Sequelize
}, db);