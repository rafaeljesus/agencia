'use strict';

agencia
  .service('profileTransformer',  function() {

  return {
      toProfile: function(altura) {
      		var alturaString = altura.metros +'.'+altura.centimetros;
      		return parseFloat(eval('alturaString'));          
      },

      toAltura: function(profile) {
      	var alturaSplit = (""+profile.altura).split('.');
    		return { metros: ''+alturaSplit[0], centimetros: ''+alturaSplit[1]};
      },
      
      findJsonInArray: function(simNaoArray, simNaoOption){
        for(var opt = 0; opt<simNaoArray.length; opt++){
          if(simNaoArray[opt].value == simNaoOption){
            return simNaoArray[opt];
          }
        }
        return null;
      }

  };
});  
	