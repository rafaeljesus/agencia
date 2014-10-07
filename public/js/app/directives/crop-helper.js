var jcrop_api = undefined;
			
function submitImage() {
	$('#sendFileButton').prop("disabled",true);
	uploadImage.submit();
	return false;
};

function updateCoords(c) {
	$('#x').val(c.x);
	$('#y').val(c.y);
	$('#w').val(c.w);
	$('#h').val(c.h);
};

function checkCoords() {
	if (parseInt($('#w').val())) {
		return submitImage();
	}

	alert('Favor. Selecione uma área de corte (Clique no mouse e arraste sobre a figura) então clique em submit.');
	return false;
};

function showMyImage(fileInput) {
	if(!fileInput || !fileInput.files){
		return;
	}
	
	var files = fileInput.files;

	for ( var i = 0; i < files.length; i++) {
		var file = files[i];
		var imageType = /image.*/;
		if (!file.type.match(imageType)) {
			continue;
		}

		var img = document.getElementById("cropbox");
		img.file = file;

		var reader = new FileReader();
		reader.onload = (function(aImg) {
			return function(e) {
				jcrop_api.setImage(e.target.result);
			};
		})(img);
		reader.readAsDataURL(file);
	}
}
