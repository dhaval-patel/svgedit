svgEditor.addExtension('striveImageContextPanel', function () {
    var setDataURLtoSelectedImage = function (dataURL) {
        var selectedElms = svgCanvas.getSelectedElems();

        if (selectedElms.length === 1) {
            var selectedElm = selectedElms[0];
            selectedElm.setAttribute('xlink:href', dataURL);
        }

    };

    var onFileChange = function (e) {
        var file = e.target.files[0];

        if (file && file.type.match('image.*')) {
            var reader = new FileReader();

            // Closure to capture the file information.
            reader.onload = function (e) {
                console.log(e.target.result);
                setDataURLtoSelectedImage(e.target.result);
            };

             reader.readAsDataURL(file);
        }
    };

    var callback = function () {
        $('#image_panel')
            .append(
                $('<div class="toolset">')
                    .append(
                        $('<input type="file" style="width: 82px; height: 34px;">')
                            .html('Select File')
                            .on('change', onFileChange)
                    )
            );
    };

    return {
		callback: callback
    };
});

