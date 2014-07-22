"user strict";

var AGENCIA = AGENCIA || {};

AGENCIA.TransformFields = (function(){
	
	function TransformFields(scope) {
		this.scope = scope;
	}
	
	TransformFields.prototype.setAltura = function() {
			var alturaString = ""+this.scope.profile.altura;
    	var alturaSplit = alturaString.split('.');
    	this.scope.altura = { metros: parseInt(''+alturaSplit[0]), centimetros: parseInt(''+alturaSplit[1])};
	};

	TransformFields.prototype.getAltura = function() {
			var alturaString = this.scope.altura.metros +'.'+this.scope.altura.centimetros;
      return eval( 'alturaString');
	};

	TransformFields.prototype.setPeso = function() {
			var pesoString = ""+this.scope.profile.peso;
    	var pesoSplit = pesoString.split('.');
    	this.scope.peso = { kilos: parseInt(''+pesoSplit[0]), gramas: parseInt(''+pesoSplit[1])};
	};

	TransformFields.prototype.getPeso = function() {
			var pesoString = this.scope.peso.kilos +'.'+this.scope.peso.gramas;
      return eval( 'pesoString');
	};
	
	return TransformFields;
	
})();