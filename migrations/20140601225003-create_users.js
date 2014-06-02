module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable('users', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      createdAt: {
        type: DataTypes.DATE
      },
      updatedAt: {
        type: DataTypes.DATE
      },
      name: DataTypes.STRING,
      password: DataTypes.STRING,
      password_confirmation: DataTypes.STRING
    });
    done();
  },
  down: function(migration, DataTypes, done) {
    done();
  }
}
