svgEditor.addExtension('striveImportCollateral', function () {
	var dialog,
		templateUrl = svgEditor.curConfig.extPath + 'ext-striveImportCollateral.html',
		collateralAPI = svgEditor.curConfig.striveAPIBaseUrl + 'collaterals.json',						// change to actual collateral url
		selectedCollateral,
		selectedCollateralContainer;

	var createDialog = function () {
		dialog = $('<div id="striveImportCollateral">');
		
		var onComplete = function () {		
			// Ok Button 
			// Event handler binding
			// Attach SVG icon	
			dialog.find('#strive_import_collateral_ok')
				.click(onOk)
				.prepend($.getSvgIcon('ok', true));

			// Cancel Button
			// Event handler binding
			// Attach SVG icon
			dialog.find('#strive_import_collateral_cancel')
				.click(onCancel)
				.prepend($.getSvgIcon('cancel', true));
			
			// Add dialog in DOM
			dialog.insertAfter('#svg_docprops');

			// Fetch collaterals
			$.get(collateralAPI, function (data) {
				var collaterals = data.results;

				var collateralsContainer = dialog.find('#strive_import_collateral_collaterals_container');

				collaterals.forEach(function (collateral) {
					// Create collateral container 
					var collateralContainer = $('<div>')
						.css({
							display: 'inline-block',
							textAlign: 'center',
							padding: '10px',
							margin: '10px',
							border: '1px solid black',
							borderRadius: '4px',
							width: '200px'
						})
						.click(function () {
							selectCollateral(collateral, $(this));
						})
						.dblclick(function () {
							selectCollateral(collateral, $(this));
							onOk();
						});

					collateralContainer
						.append(
							$('<img>')
								.attr('src', collateral.files[0].url)
								.css({
									width: '100%'
								})
						)
						.append(
							$('<div>')
							.css({
								padding: '20px 0 0 0'
							})
							.html(collateral.name)
						);
					
					// Adds collateral container to collaterals container
					collateralsContainer.append(collateralContainer);
				});
			});
		};

		// Load static dialog template
		dialog.load(templateUrl, onComplete);
	};

	var selectCollateral = function (collateral, collateralContainer) {
		selectedCollateral = collateral;
		
		// Reset UI of existing selected collateral if any
		if (selectedCollateralContainer) {
			selectedCollateralContainer.css({
				background: 'transparent'
			});
		}

		selectedCollateralContainer = collateralContainer;
		selectedCollateralContainer.css({
			backgroundColor: '#B0B0B0'
		});
	}

	var showDialog = function () {
		// Create dialog first if not created already.
		if (!dialog) {
			createDialog();
		}

		dialog.show();
	};
	
	var hideDialog = function () {
		dialog.hide();
	};

	var onCancel = function () {
		hideDialog();
	};

	var onOk = function () {
		// Load selected collateral in svg editor
		if (selectedCollateral) {
			svgEditor.loadFromURL(selectedCollateral.files[0].url);
			hideDialog();
		} else {
			console.log('Please select a collateral');
		}
	};

    return {
        svgicons: svgEditor.curConfig.extPath + "ext-imagelib.xml",
        buttons: [{
			id: "tool_imagelib",
			type: "app_menu",
			position: 8,
			title: "Strive Import Collateral",
			events: {
				"click": showDialog
			}
		}]
    };
});