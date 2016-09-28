svgEditor.addExtension('striveContextPanel', function () {
    var metaAPI =  svgEditor.curConfig.striveAPIBaseUrl + 'meta.json',						// change to actual meta url
		fieldElement,
		collateralTypes,
		selectedElement,
		fieldCustomAttribute = 'data-strive-collateral-field';

	var selectedChanged = function (params) {
		selectedElement = params.selectedElement;
		initializeCollateralFieldControl();
	};

	var onTypeChange = function () {
		svgCanvas.getCurrentDrawing().svgElem_.setAttribute(typeCustomAttribute, this.value);
		initializeCollateralFieldControl();
	};

	var onFieldChange = function () {
		if (selectedElement) {
			var tagName = selectedElement.tagName;

			switch (tagName) {
				case 'text': {
					selectedElement.setAttribute(fieldCustomAttribute, this.value);
					svgCanvas.changeSelectedAttribute('#text',  this.options[this.selectedIndex].textContent || 'Sample Text');
					break;
				}
				case 'image': {
					selectedElement.setAttribute(fieldCustomAttribute, this.value);
					break;
				}
			}
		}
	};

	var createContextPanelControls = function () {
		fieldElement = $('<select title="Collateral Field">')
			.attr('id', 'strive_context_panel_field')
			.css({
				height: '30px',
				marginTop: '2px',
				marginLeft: '2px',
				border: 'none',
				borderRadius: '2px',
				minWidth: '135px'
			})
			.change(onFieldChange);
		
		$('<div id="strive_context_panel" style="display: inline;">')
			.append(fieldElement)
			.insertAfter('#history_panel');
	};

	var initializeCollateralFieldControl = function () {
		fieldElement.empty();
		
		fieldElement
			.append($('<option>')
				.attr('value', '')
				.html('')
		);

		if (selectedElement) {
			var tagName = selectedElement.tagName;
			collateralTypes && collateralTypes.forEach(function (field) {
				if (field.type === tagName) {
					fieldElement
						.append($('<option>')
							.attr('value', field.value)
							.html(field.display)
					);
				}
			});

			switch (tagName) {
				case 'text':
				case 'image': {
					var field = selectedElement.getAttribute(fieldCustomAttribute);
					fieldElement.val(field || '');
					break;
				}
			}

		} else {
			fieldElement.val('');
		}
	};

	var initializeControls = function () {
		initializeCollateralFieldControl();
	}

	var loadMeta = function () {
		$.get(metaAPI, function (data) {
			collateralTypes = data.results;

			initializeControls();
		});
	};

	var callback = function () {
		createContextPanelControls();
		loadMeta();
	};
    
    return {
		callback: callback,
        selectedChanged: selectedChanged
    };
});