(function(){
    var location = document.location;

    if (location.hostname == 'soundcloud.com') {

    	if (!document.getElementById('soundcloud_sdk')) {
    		var scripts 		= document.getElementsByTagName('script')[0],
    			soundcloud_sdk	= document.createElement('script');

    		soundcloud_sdk.id  = 'soundcloud_sdk';
    		soundcloud_sdk.src = 'https://connect.soundcloud.com/sdk.js';
    		scripts.parentNode.insertBefore(soundcloud_sdk, scripts);
    	}

    	var client_id   = require('config').get('client_id'),
    		song_titles = $('.soundTitle__title'),
    		song_urls	= [];



        if (song_titles.length > 1) {
            $.each(song_titles, function (a, z) {
                song_urls.push('https://soundcloud.com'+$(z).attr('href'));
            });
        } else if (song_titles.length == 1) {
            song_urls.push(location.href);
        }

        window.setTimeout(function(){
        	window.SC.initialize({
      			client_id: client_id
    		});

    		$.each(song_urls, function (b, y) {
    			window.SC.get('/resolve', { url: y }, function(sound) {
    				var song_title = $(song_titles[b]);

    				if (!song_title.hasClass('soundcloud_download_link')) {
    					var html = song_title.html();

    					if (sound.tracks) {
    						var link 	   = ' | Download: (',
    							trackCount = sound.tracks.length;
    						$.each(sound.tracks, function(c, x){
    							link += '<a href="'+x.stream_url+'?client_id='+client_id+'" target="_blank">'+(c+1)+'</a>';
                                if (c != (trackCount - 1)) {
                                    link += ', ';
                                }
    						});
                            link += ')';
    					} else {
    					   var link = ' | <a href="http://api.soundcloud.com/tracks/'+sound.id+'/stream?client_id='+client_id+'" target="_blank">Download</a>';
                        }

    					song_title.html(html+link);
                        song_title.addClass('soundcloud_download_link');
    				}
    			});
    		});
        }, 500);
    } else {
        return;
    }
})();