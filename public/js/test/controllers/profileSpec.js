  var expect = chai.expect;

describe('ProfileControllerSpec', function() {

  var controller, scope, user, profile, location, http, profileTransformer, defaultUser;

  beforeEach(function() {
    module('agencia');
    
    defaultUser = { 
        primeiro_nome: 'userTest', 
        sobrenome: 'reallyTest', 
        email: 'valid@email.com',
        altura: 1.75,
        peso : 90;
        trabalha : true,
        estuda : true,
        tem_filhos : true,
        possui_carro : true,
        como_mora : 'Moro sozinho(a)'
        gosta_tv : true,
        gosta_ler : true,
        fuma : false,
        pratica_exercicio : true,
        sexo : '1',
        como_atua : '1',
        idade : 30,
        compromissado: true,
        cidade: 'São José dos Campos',
        pais: 'BR',
        estado: 'São Paulo', 
        id : 1
    };
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
  
  
  it('should emit an event when load method is called', function(done) {
    
    scope.currentUser.id = 1;
    
    http.when('GET', '/user/1').respond(scope.user);
    http.expectGET('/user/1').respond(200, scope.user);
    scope.loadProfile();
    http.flush();
    done();
    
  });
});
