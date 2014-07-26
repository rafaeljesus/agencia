'use strict';
/**
	kadu: Obtido de http://stackoverflow.com/questions/11160513/angularjs-ng-options-create-range
**/
agencia.filter('range', function() {
  return function(input, start, end, leftZero) {    
    start = parseInt(start);
    end = parseInt(end);
    var direction = (start <= end) ? 1 : -1;
    while (start != end) {
        var startAsText = ''+start;

        if(leftZero && start < 10){
            startAsText = '0'+start;
        }
        input.push(startAsText);
        start += direction;
    }
    return input;
  };
});