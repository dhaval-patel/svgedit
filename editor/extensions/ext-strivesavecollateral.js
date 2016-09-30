svgEditor.addExtension('striveSaveCollateral', function () {
	var saveCollateral = function () {
	    if (window.striveSaveCallback) {
	        window.striveSaveCallback(svgCanvas.getResolvedSvgString());
	    }
	};

	return {
        svgicons: svgEditor.curConfig.extPath + "ext-imagelib.xml",
        buttons: [{
			id: "tool_imagelib",
			type: "app_menu",
			position: 8,
			title: "Strive Save Collateral",
			events: {
				"click": saveCollateral
			}
		}]
    };
});