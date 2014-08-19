agencia
  .directive('backofficeMenuHeader', function($compile, $location) {

    var template = 
    '<div class="navbar navbar-default navbar-fixed-top" role="navigation">'+
      '<div class="container-fluid">'+
        '<div class="navbar-header">'+
          '<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">'+
            '<span class="sr-only">Toggle navigation</span>'+
            '<span class="icon-bar"></span>'+
            '<span class="icon-bar"></span>'+
            '<span class="icon-bar"></span>'+
          '</button>'+
          '<img src="../img/logoSmall.png" class="img-responsive"/>'+
        '</div>'+
        '<div class="navbar-collapse collapse">'+
          '<ul class="nav navbar-nav navbar-right">'+
            '<li><a href="#" onclick="javascript:showMeuPerfil()"><img src="../img/icons/icone_meuperfil.png" />&nbsp;<strong>Meu Perfil</strong></a></li>'+
            '<li><a href="#" onclick="javascript:showOutrosClientes()"><img src="../img/icons/icone_mebros.png" />&nbsp;<strong>Outros Clientes</strong></a></li>'+
          '</ul>'+
        '</div>'+
      '</div>'+
    '</div>'+

    '<div class="container-fluid">'+
    '<div class="row">&nbsp;</div>'+
    '<div class="row">'+
      '<div class="col-sm-3 col-md-2 sidebar">'+
        '<ul class="nav nav-sidebar" style="display:block" id="meuPerfil">'+
          '<li id="editarPerfil" onclick="activate(\'editarPerfil\')"><a href="#/profile" ><img src="../img/icons/ico_menu_editarperfil.png"/>&nbsp;Editar Perfil</a></li>'+
          '<li id="editarDados" onclick="activate(\'editarDados\')"><a href="#/contacts" ><img src="../img/icons/ico_menu_editardados.png"/>&nbsp;Editar Dados</a></li>'+
          '<li id="minhasFotos" activate(\'minhasFotos\')><a href="#/photos"><img src="../img/icons/icone_fotos.png"/>&nbsp;Minhas Fotos</a></li>'+
          '<li><a href="#"><img src="../img/icons/ico_menu_busca.png"/>&nbsp;Perfil que Procuro</a></li>'+
          '<li><a href="#"><img src="../img/icons/ico_pg.png"/>&nbsp;Fazer Upgrade</a></li>'+
          '<li><a href="#"><img src="../img/icons/ico_menu_excluir.png"/>&nbsp;Cancelar Minha Conta</a></li>'+
      '</ul>'+
      '<ul class="nav nav-sidebar" style="display:none" id="outrosClientes">'+
        '<li class="active"><a href="#"><img src="../img/icons/ico_menu_buscarperfil.png"/>&nbsp;Buscar Perfil</a></li>'+
        '<li><a href="#"><img src="../img/icons/ico_menu_querteconhecer.png"/>&nbsp;Quer te Conhecer</a></li>'+
        '<li><a href="#"><img src="../img/icons/ico_menu_perfisapresentados.png"/>&nbsp;Perfis Apresentados</a></li>'+
        '<li><a href="#"><img src="../img/icons/ico_menu_perfisaceitos.png"/>&nbsp;Perfis aceitos</a></li>'+
        '<li><a href="#"><img src="../img/icons/ico_menu_perfisrejeit.png"/>&nbsp;Perfis Rejeitados</a></li>'+
      '</ul>'+
    '</div>'
    
;

    return {
      restrict: 'E',
      replace: true,
      link: function(scope, el, attrs) {
        scope.$on('user:loggedIn', function() {
          el.html(template);
          $compile(el.html())(scope);
        });
        scope.$on('user:logout', function() {
          el.remove();
          $location.path('/');          
        });
      }
    };
});
