(function() {

	//'use strict';

	var youtubeFrames = $('.youtube-frame');

	if ( youtubeFrames.length ) {

		youtubeFrames.each(function() {

			var elem  = $(this),
				embed = elem.data('embed');

			if (embed) {
				// obj = embed.get(0);
				// if (obj.pauseVideo) obj.pauseVideo();

				elem.click(function(){

					$(".youtube-frame iframe").each(function() {
						$(this).remove();
					});

					var iframe = $('<iframe>', {
						'frameborder': 0,
						'allowfullscreen': '',
						'src': 'https://www.youtube.com/embed/' + embed + '?rel=0&showinfo=0&autoplay=1'
					}).appendTo(elem);

				});
			}
		});
	}

	return false;

})();
