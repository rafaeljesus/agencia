var expect = chai.expect;

describe('SignupControllerSpec', function() {

  var controller, scope, location;

  beforeEach(function() {
    module('agencia');
  });

  beforeEach(inject(function($rootScope, $controller, $location) {
    scope = $rootScope.$new();
    location = $location;
    controller = $controller('SignupController', {
      $scope: scope
    });
  }));

  it('when login form is valid then register', function() {
    scope.user = { name: 'Valid Name', email: 'valid@email.com', password: '123456' };
    scope.register();
    expect(location.path()).to.equal('/');
  });

});