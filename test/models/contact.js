var User = require('../../app/models').User
  , Contact = require('../../app/models').Contact
  , expect = require('chai').expect;

describe('User\'s Contact', function(){

  var currentUser = null;
  var currentContact = null;
  var contactOptions = null;

  beforeEach(function(done){

    var options = {
      firstName: 'userTest',
      lastName: 'userTestLogin',
      password: 'userTestPassword',
      email: 'valid@email.com'
    };

    //1 - Cria user
    User.register(options, function(user) {
      currentUser = user;

      //2 - Carrega criando contact caso nao exista
      Contact.load(user.id, function(contact){

        contactOptions = {
          id: contact.id,
          tel_residencial: '(12) 3999-2222',
          tel_celular: '(12) 9999-9999',
          tel_trabalho: '0800-140-1244',
          e_mail_contato: 'kadusjc@yahoo.com.br',
          skype: 'kadusjc',
          msn: 'kadu.boldcron@hotmail.com',
          id_cliente: currentUser.id
        };

        //3 - Atualiza contact
        Contact.updateContact(contactOptions, function(contact){
          currentContact = contact
          done();
        }, function(err) {
          return done(err);
        });//end 3

      }, function(err){
        return done(err);
      });//end 2)


    }, function(err) {
      return done(err);
    });//end 1)

  });

  //Apaga todos registros de ambas tables
  afterEach(function(done){
    Contact.destroy().success(function(){
      User.destroy().success(function(){
        done();
      });
    });
  });


  it('should successfully update the empty contact (that was saved on user\'s load)', function(done){
    expect(currentContact.id).to.not.equal(undefined);
    expect(currentContact.msn).to.equal(contactOptions.msn);
    expect(currentContact.tel_residencial).to.equal(contactOptions.tel_residencial);
    expect(currentContact.tel_celular).to.equal(contactOptions.tel_celular);
    expect(currentContact.tel_trabalho).to.equal(contactOptions.tel_trabalho);
    expect(currentContact.e_mail_contato).to.equal(contactOptions.e_mail_contato);
    expect(currentContact.skype).to.equal(contactOptions.skype);
    done();
  });

  it('should not update and return a unknown_errorin case of unexpected exception', function(done){

    var contactOptions = {
      id: 80,
      tel_residencial: '(12) 3999-2222',
      tel_celular: '(12) 9999-9999',
      tel_trabalho: '0800-140-1244',
      e_mail_contato: 'kadusjc@gmail.com.br',
      skype: 'kadusjc',
      msn: 'kadu.boldcron@hotmail.com',
      id_cliente: 7
    };

    return Contact.updateContact(contactOptions, function(contact){		     	      
    }, function(err) {
      expect(err.reason).to.equal('unknown_error');
      done();
    });	  		
  });


  it('should not update the empty contact if the same e_mail_contato is already in use by another contact', function(done){

    var userOptions = {
      firstName: 'userTest',
      lastName: 'userTestLogin',
      password: 'userTestPassword',
      email: 'valid@anotheremail.com'
    };
    var newUser = null, newContact = null;

    //Init of create new User and new Contact
    User.register(userOptions, function(user) {
      newUser = user;
      Contact.load(newUser.id, function(contact){
        newContact = contact;      	 

        //Init of test
        var contactOptions = {
          id: newContact.id,
          tel_residencial: '(12) 3999-2222',
          tel_celular: '(12) 9999-9999',
          tel_trabalho: '0800-140-1244',
          e_mail_contato: 'kadusjc@yahoo.com.br',
          skype: 'kadusjc',
          msn: 'kadu.boldcron@hotmail.com',
          id_cliente: newUser.id
        };

        return Contact.updateContact(contactOptions, function(contact){		     	      
          //do nothing	
          done();
        }, function(err) {
          expect(err.reason).to.equal('another_contact_with_same_email');
          done();
        });
        //end of test
      }, function(err){
        return done(err);
      });
      //end of contact.load
    }, function(err) {
      return done(err);
    });
    //end of User register

  });


  it('should be able to check if a e_mail_contato is in use by another contact - email in use Case', function(done){

    //Saving a new user
    var options = {
      e_mail_contato: 'kadusjc@yahoo.com.br',
      id_cliente: 940,      
    };


    Contact.checkMailInUse(options, function(contact){
      done();
    }, function(err){
      expect(err.reason).to.equal('another_contact_with_same_email');
      done();
    });  

  });

  it('should be able to check if a e_mail_contato is in use by another contact - email not in use Case', function(done){

    var options = {
      e_mail_contato: 'valid@email3.com.br',
      id_cliente: 345
    };

    Contact.checkMailInUse(options, function(contact){
      done();
    }, function(err){
      return done(err);
    });  

  });



});
