module.exports = {
  up: function(migration, DataTypes, done) {
  	
    migration.addIndex(
  		'tb_clientes_gls',
  		['email'],
  		{
  	  	indexName: 'UniqueEmailIndex',
    		indicesType: 'UNIQUE'
  		}
		);
  

  	migration.addColumn(
  		'tb_clientes_gls',
  		'pais',
  		DataTypes.STRING
		);
  	//adding missing columns in contacts
    done();
  },
  
  down: function(migration, DataTypes, done) {
    //migration.removeIndex('tb_clientes_gls', 'UniqueEmailIndex');
    //migration.removeColumn('tb_clientes_gls', 'pais')
    done();
  }
}
