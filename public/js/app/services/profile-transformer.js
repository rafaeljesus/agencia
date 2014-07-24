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
    		return { metros: parseInt(''+alturaSplit[0]), centimetros: parseInt(''+alturaSplit[1])};
      }

  };
});  
	