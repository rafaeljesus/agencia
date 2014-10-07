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

			scope.uploadFile = function (content) {
         alert('Arquivo alterado com sucesso');
         $('#sendFileButton').prop("disabled",false);
      };

			var form = '<form method="post" target="self" ng-upload="uploadFile(content)" action="'+attrs.url+'" name="uploadImage" id="uploadImage" enctype="multipart/form-data" encoding="multipart/form-data">'+
			'<div id="outer">'+
				'<div class="jcExample">'+ 
					'<div class="article">'+
						'<img id="cropbox" src="" alt="image" style="width: 100%; height: 100%;" /> <br/>'+
							'<input type="file" name="file" id="file" accept="image/*" onchange="showMyImage(this)" />'+ 
							'<input type="hidden" name="photoParam" value="{{foto}}" name="photoParam"/>'+
							'<input type="hidden" id="x" name="x"/>'+ 
							'<input type="hidden" id="y" name="y" />'+ 
							'<input type="hidden" id="w" name="w" />'+ 
							'<input type="hidden" id="h" name="h" />'+
						
						
					'</div>'+ 
				'</div>'+ 
			'</div>';
			element.html($compile(form)(scope));
			
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