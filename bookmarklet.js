javascript:(function(){
	var scripts = document.getElementsByTagName('script')[0],
		script  = document.createElement('script');

	script.src = 'https://bitbucket.org/tschuermans/soundcloud-download-bookmarklet/raw/41af149b5a524a6b735dbfa10f17ffedccb838c4/soundcloud.js';
	scripts.parentNode.insertBefore(script, scripts);
})();