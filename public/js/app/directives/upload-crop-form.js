agencia.directive('uploadCropForm', ["$compile", function ($compile) {
	
	return {
		restrict: 'A',
		replace: true,
		link: function(scope, element, attrs) {
			
			var url = attrs.url;
			if(!url){
				return;
			}
			url = url + 'photoParam='+scope.foto;

			var html = '<form method="POST" action="'+attrs.url+'" name="uploadImage" id="uploadImage">'+
			'<div id="outer">'+
				'<div class="jcExample">'+ 
					'<div class="article">'+
						'<img id="cropbox" src="" alt="image" style="width: 400px; height: 400px;" /> <br/>'+
							'<input type="file" name="file" id="file" accept="image/*" onchange="showMyImage(this)" />'+ 
							
							'<input type="hidden" id="axisX" name="axisX"/>'+ 
							'<input type="hidden" id="axisY" name="axisY" />'+ 
							'<input type="hidden" id="width" name="width" />'+ 
							'<input type="hidden" id="height" name="height" />'+
						
						
					'</div>'+ 
				'</div>'+ 
			'</div>';
			element.html($compile(html)(scope));
			
			$(function($){
				$('.requiresjcrop').hide();
				$('#cropbox').Jcrop({
					aspectRatio: 1,
					onSelect: updateCoords,
					 boxWidth: 400, 
					 boxHeight: 400
					
					},function(){
						jcrop_api = this;
					});					
			});
		}
	};
}]);