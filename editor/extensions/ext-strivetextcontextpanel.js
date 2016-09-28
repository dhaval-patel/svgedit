svgEditor.addExtension('striveTextContextPanel', function () {
    var selectElement;

    var onChangeTextAnchor = function (e) {
        svgCanvas.setTextAnchor(this.value);
    };

    var callback = function () {
        selectElement = $('<select style="height: 25px; width: 100px; margin-left: 5px;">')
            .append($('<option value="start">').html('Start'))
            .append($('<option value="middle">').html('Middle'))
            .append($('<option value="end">').html('End'))
            .on('change', onChangeTextAnchor);

        $('#text_panel')
            .append(
                $('<div class="toolset" id="tool_text_anchor">')
                    .append(selectElement)
            );
    };

    var selectedChanged = function (params) {
        var selectedElement = params.selectedElement;
        if (selectedElement) {
            var tagName = selectedElement.tagName;

            switch (tagName) {
                case 'text': {
                    var val = selectedElement.getAttribute('text-anchor');
                    selectElement.val(selectedElement.getAttribute('text-anchor'));
                    svgCanvas.setTextAnchor(val);
                    break;
                }
            }
        }
    };

    return {
		callback: callback,
        selectedChanged: selectedChanged
    };
});

