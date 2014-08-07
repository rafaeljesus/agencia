agencia.
  directive('select2RegionAutoComplete', function () {
    return function(scope, element, attrs) {
    
      element.select2({
         minimumInputLength: attrs.minInputLength || 4,
         placeholder: attrs.placeHolder || "Digite a cidade",
         
         id: function(option) { //specifing an unique id for option
         	var id = eval('option.'+ (attrs.optionId || 'id') );
         	return  id +'_'+ getFormattedSelection(option, attrs ); 
         },
         
         ajax: {
             url: 'https://graph.facebook.com/search?location_types=[%27city%27]&type=adgeolocation',
             quietMillis: 100,
             data: function(term) {
                 return {
                 	q: '%'+term+'%'
                 };
             },
             results: function(data, page ) {
             	return {results: data.data};
             }
         },
         
         formatResult: function(option) { 
             return "<div class='select2-user-result'>" + getFormattedSelection(option, attrs) +"</div>"; 
         },
         
         formatSelection: function(option) { 
         	scope.$apply(function () {
         	eval('scope.'+attrs.model+' = option');	       	 
         	});
         	return getFormattedSelection(option, attrs); 
         },
         //nao apagar - para usar o select2('val',) no selenium precisa haver este metodo
         initSelection: function(selection){
         	
         }
         
      });
     
      function getFormattedSelection(option, attrs) {
        var formattedResult = attrs.optionValue ? eval('option.'+attrs.optionValue) : '' ;
       	formattedResult += attrs.optionDescription ? ' - '+ eval('option.'+attrs.optionDescription) : '';
       	return formattedResult; 
      };
    };	
});
 
