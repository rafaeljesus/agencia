'use strict';
/**
	kadu: Obtido de http://stackoverflow.com/questions/11160513/angularjs-ng-options-create-range
**/
agencia.filter('range', function() {
  return function(input, start, end) {    
    start = parseInt(start);
    end = parseInt(end);
    var direction = (start <= end) ? 1 : -1;
    while (start != end) {
        input.push(start);
        start += direction;
    }
    return input;
  };
});