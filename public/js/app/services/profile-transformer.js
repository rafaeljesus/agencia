'use strict';

agencia
  .service('profileTransformer',  function() {

  return {
      toProfile: function(altura) {
        if(!altura){ return null};
      		var alturaString = altura.metros +'.'+altura.centimetros;
      		return parseFloat(eval('alturaString'));          
      },

      toAltura: function(profile) {
        if(!profile.altura){ return null};
      	var alturaSplit = (""+profile.altura).split('.');
        if(alturaSplit[1].length == 1){  alturaSplit[1] = '0'+alturaSplit[1]; }
    		return { metros: ''+alturaSplit[0], centimetros: ''+alturaSplit[1]};
      },

      toRegiao: function(profile) {
        var regiao = {};
        regiao.name = profile.cidade;
        regiao.country_code = profile.pais;
        regiao.region = profile.estado;        
        return regiao;
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
	