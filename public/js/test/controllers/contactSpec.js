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
  
  it('should show a message to user informing that choosed email is already in use when email''s input lose the focus', function(done) {
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
