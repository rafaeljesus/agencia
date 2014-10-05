agencia
  .directive('pictureModal', function($compile) {


    return {
      restrict: 'AE',
      templateUrl: 'templates/picture-modal.html',
      link: function(scope, el, attrs) {
        
        scope.$on('picture:modal-show', function() {
          el.html(templateUrl);
          $compile(el.html())(scope);
        });
      }
    };
});
