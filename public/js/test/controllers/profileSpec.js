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
        estuda : false,
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
  
  
  it('should emit an event when load method is called, then use profileTransformer into user data', function(done) {
    
    scope.currentUser.id = 1;
    
    http.when('GET', '/user/1').respond(scope.user);
    scope.loadProfile();
    http.flush();
    
    expect(scope.altura.metros).to.equal(1);
    expect(scope.altura.centimetros).to.equal(75);
    expect(scope.profile).to.not.be.undefined;
    expect(scope.profile.id).to.equal(1);
    expect(scope.profile.peso).to.equal('90');
    expect(scope.profile.trabalha.value).to.be.true;
    expect(scope.profile.estuda.value).to.be.false;
    expect(scope.profile.tem_filhos.value).to.be.true;
    expect(scope.profile.possui_carro.value).to.be.true;
    expect(scope.profile.como_mora.value).to.equal('Moro sozinho(a)');
    expect(scope.profile.gosta_tv.value).to.be.true;
    expect(scope.profile.gosta_ler.value).to.be.true;
    expect(scope.profile.fuma.value).to.be.false;
    expect(scope.profile.pratica_exercicio.value).to.be.true;
    expect(scope.profile.como_mora.value).to.equal('Moro sozinho(a)');
    expect(scope.profile.sexo.value).to.equal('1');
    expect(scope.profile.como_atua.value).to.equal('1');
    expect(scope.profile.idade).to.equal('30');
    expect(scope.profile.compromissado.value).to.be.true;
    expect(scope.regiao).to.not.be.undefined;
    expect(scope.regiao.country_code).to.equal('BR');
    expect(scope.regiao.name).to.equal('São José dos Campos');
    expect(scope.regiao.region).to.equal('São Paulo');
    done();
    
  });
  
  
  it('should update User attributes successfully', function(done) {
    http.when('PUT', '/profile').respond(scope.profile);
    scope.updateProfile();
    http.flush();
    
  });
  
   it('should update User attributes successfully', function(done) {
    http.when('PUT', '/profile').respond(scope.profile);
    scope.updateProfile();
    http.flush();
    expect(scope.error).to.be.undefined;
  });
  
   it('should update User attributes with error - case occurs and unexpected exception', function(done) {
    http.when('PUT', '/profile').respond(500, scope.profile);
    scope.updateProfile();
    http.flush();
    expect(scope.error).to.not.be.undefined;
  });
