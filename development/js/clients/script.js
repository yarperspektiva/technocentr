var initClientsList = function()
{
	if( !$('.js-clients').length )
		return false;

	$('.js-clients').slick({
		slidesToShow: 4,
		slidesToScroll: 1,
		arrows: true,
		dots: false,
		autoplay: true,
		swipeToSlide: true,
		waitForAnimate: false,
		responsive: [
			{
				breakpoint: bpSM,
				settings: {
					slidesToShow: 3
				}
			},
			{
				breakpoint: bpXS,
				settings: {
					slidesToShow: 1
				}
			}
		],
		prevArrow: '<div class="slick-arrow-hor slick-prev"><svg class="icon icon--arr-prev"><use xlink:href="#icon-arr-prev"></use></svg></div>',
		nextArrow: '<div class="slick-arrow-hor slick-next"><svg class="icon icon--arr-next"><use xlink:href="#icon-arr-next"></use></svg></div>'
	});
}
afterLoad['initClientsList'] = initClientsList;