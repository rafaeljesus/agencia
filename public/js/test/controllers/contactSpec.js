var expect = chai.expect;

describe('ContactControllerSpec', function() {

  var controller, scope, user, profile, location, http, profileTransformer, defaultUser;

  beforeEach(function() {
    module('agencia');
    
  });

  beforeEach(inject(function($rootScope, $controller, $location, _$httpBackend_, User, Profile, profileTransformer) {
    user = User;
    profile = Profile;
    scope = $rootScope.$new();
    profileTransformer = profileTransformer;
    location = $location;
    http = _$httpBackend_;
    controller = $controller('ProfileController', {
      $scope: scope,
      profileTransformer: profileTransformer,
      User: user,
      Profile: profile
    });
  }));
  
  afterEach(function() {
    http.verifyNoOutstandingExpectation();
    http.verifyNoOutstandingRequest();
  });
  
  it('should show a message to user informing that choosed email is already in use when email''s input lose the focus', function(done) {
    http.when('GET', '/profile/checkMail').respond(500, scope.user);
    scope.changePassword();
    http.flush();
    expect(scope.emailInUser).to.not.be.undefined;
    
    http.when('GET', '/profile/checkMail').respond(200, scope.user);
    scope.changePassword();
    http.flush();
    expect(scope.emailInUser).to.be.undefined;
    done();
  });
  
});
