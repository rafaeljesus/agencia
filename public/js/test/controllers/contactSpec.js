var expect = chai.expect;

describe('ContactControllerSpec', function() {

  var controller, scope, user, contact, location, http, defaultUser;

  beforeEach(function() {
    module('agencia');
    
  });

  beforeEach(inject(function($rootScope, $controller, $location, _$httpBackend_, User, Contact) {
    user = User;
    contact = Contact;
    scope = $rootScope.$new();
    location = $location;
    http = _$httpBackend_;
    controller = $controller('ContactController', {
      $scope: scope,
      User: user,
      Contact: contact
    });
  }));
  
  afterEach(function() {
    http.verifyNoOutstandingExpectation();
    http.verifyNoOutstandingRequest();
  });
  
  it('should load a contact by user id, case it does not exists then create one new for user', function(done) {
    var contact = {
      id: 1,
      id_cliente: 1,
      e_mail_contato: 'contato@teste.com'
    };
    scope.currentUser = {id: 1};
    
    http.when('GET', '/contact').respond(contact);
    scope.loadContact();
    http.flush();
    
    expect(scope.contact).to.not.be.undefined;
  )};   
  
  it('should save a contact successfully', function(done) {
    scope.currentUser = {id: 1};
    scope.user.id = 1;
    scope.contact = {
      tel_residencial: '1',
      tel_celular:'2',
      tel_trabalho: '3',
      skype: 'skype',
      e_mail_contato: 'contato@gmail.com',
      id: 1
    };
    http.when('PUT', '/contact').respond(scope.contact);
    scope.saveContact ();
    http.flush();
    
    expect(scope.contact).to.not.be.undefined;
    expect(scope.error).to.be.undefined;
  )};   
  
  it('should result in a error when save a contact results in an unexpected exception', function(done) {
    scope.currentUser = {id: 1};
    scope.user.id = 1;
    scope.contact = {
      tel_residencial: '1',
      tel_celular:'2',
      tel_trabalho: '3',
      skype: 'skype',
      e_mail_contato: 'contato@gmail.com',
      id: 1
    };
    http.when('PUT', '/contact').respond(500, scope.contact);
    scope.saveContact();
    http.flush();
    
    expect(scope.contact).to.be.undefined;
    expect(scope.error).to.not.be.undefined;
  )};   
  
  it('should show a message to user informing that choosed contact email is already in use when contact email''s input lose the focus', function(done) {
    http.when('GET', '/contact/check/mail').respond(500, scope.user);
    scope.checkMailInUse();
    http.flush();
    expect(scope.emailContactInUse).to.not.be.undefined;
    
    http.when('GET', '/contact/check/mail').respond(200, scope.user);
    scope.checkMailInUse();
    http.flush();
    expect(scope.emailContactInUse).to.be.undefined;
    done();
  });
  
});
