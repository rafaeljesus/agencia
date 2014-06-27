var expect = chai.expect;

describe('SigninControllerSpec', function() {

  var controller, scope, location;

  beforeEach(function() {
    module('agencia');
  });

  beforeEach(inject(function($rootScope, $controller, $location) {
    scope = $rootScope.$new();
    location = $location;
    controller = $controller('SigninController', {
      $scope: scope
    });
  }));

  it('when login form is valid then authenticate', function() {
    scope.user = { email: 'valid@email.com', password: '123456' };
    scope.authenticate();
    expect(location.path()).to.equal('/');
  });

});