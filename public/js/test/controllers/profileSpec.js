  var expect = chai.expect;

describe('ProfileControllerSpec', function() {

  var controller, scope, user, profile, location, http;

  beforeEach(function() {
    module('agencia');
  });

  beforeEach(inject(function($rootScope, $controller, $location, _$httpBackend_, User, Profile) {
    user = User;
    profile = Profile;
    scope = $rootScope.$new();
    location = $location;
    http = _$httpBackend_;
    controller = $controller('ProfileController', {
      $scope: scope
    });
  }));
  
  afterEach(function() {
    http.verifyNoOutstandingExpectation();
    http.verifyNoOutstandingRequest();
  });
  
  
  it('should emit an event when load method is called', function(done) {
    
  });
});
