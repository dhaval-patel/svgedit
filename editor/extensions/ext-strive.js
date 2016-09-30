svgEditor.addExtension('strive', function () {
    var parseQuery = function (qstr) {
        var query = {};
        var a = qstr.substr(1).split('&');
        for (var i = 0; i < a.length; i++) {
            var b = a[i].split('=');
            query[decodeURIComponent(b[0])] = decodeURIComponent(b[1] || '');
        }
        return query;
    };

	var callback = function () {
        var queryParams = parseQuery(window.location.search);

        console.log(queryParams);

        if (queryParams && queryParams.file) {
            window.setTimeout(function () {
                svgEditor.loadFromURL(queryParams.file);
            },1000);
        }
	};

	return {
        callback: callback
    };
});