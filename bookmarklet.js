javascript:(function(){
	var scripts = document.getElementsByTagName('script')[0],
		script  = document.createElement('script');

	script.src = 'https://bitbucket.org/api/1.0/repositories/tschuermans/soundcloud-download-bookmarklet/raw/master/soundcloud.js';
	scripts.parentNode.insertBefore(script, scripts);
})();