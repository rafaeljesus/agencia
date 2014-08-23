module.exports = {
  up: function(migration, DataTypes, done) {

  	migration.addIndex(
  		'tb_contatos_gls',
  		['e_mail_contato'],
  		{
   	 		indexName: 'UniqueEmailContatoIndex',
   	 		indicesType: 'UNIQUE'
  		}
		);

		migration.addColumn(
			'tb_contatos_gls',
			'skype',
			DataTypes.STRING
		);

    done();
  },
  down: function(migration, DataTypes, done) {
    migration.removeIndex('tb_contatos_gls','UniqueEmailContatoIndex');
    migration.removeColumn('tb_contatos_gls', 'skype');
    done();
  }
}
