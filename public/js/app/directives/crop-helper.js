var jcrop_api = undefined;
			
function submitImage() {
	alert('jcrop_api' + jcrop_api);
	alert($('#axisX').val());
	alert($('#axisX').val());
	alert($('#width').val());
	alert($('#height').val());
	uploadImage.submit();
};

function updateCoords(c) {
	$('#axisX').val(c.axisX);
	$('#axisY').val(c.axisY);
	$('#width').val(c.width);
	$('#height').val(c.height);
};

function checkCoords() {
	if (parseInt($('#width').val())) {
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
