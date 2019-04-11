
; /* Start:"a:4:{s:4:"full";s:89:"/local/templates/2016/components/bitrix/catalog.element/.default/script.js?14994162693633";s:6:"source";s:74:"/local/templates/2016/components/bitrix/catalog.element/.default/script.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
var initCatalogCardFunctions = function()
{
	//при смене разрешения экрана на адаптив перемещаем блок с видео
	$('.js-slider-video').on('init', function(event,slick)
	{
		if( slick.activeBreakpoint == bpSM )
			$('.js-slider-video .slick-active .container-video-thumb').append($("#js-container-video"));
	});

	//основные настройки слайдера
	var settingsMain = {
		slidesToShow: 4,
		slidesToScroll: 1,
		autoplay: false,
		vertical: true
	};
	//дополнительные настройки слайдера
	var $settingsAdd = {
		slidesToShow: 1,
		slidesToScroll: 1,
		vertical: false,
		dots: true,
		arrows: false,
	};

	//галерея видео товара
	$('.js-slider-video').slick(
		$.extend(settingsMain, {
			nextArrow: '<div class="slick-arrow-vert slick-next"><svg class="icon"><use xlink:href="#icon-arr-down"></use></svg></div>',
			prevArrow: '<div class="slick-arrow-vert slick-prev"><svg class="icon"><use xlink:href="#icon-arr-up"></use></svg></div>',
			responsive: [
			{
				breakpoint: bpSM,
				settings: $settingsAdd
			}
			]
		})
	);
	//галерея отзывов товара
	$('.js-slider-reviews').slick(
		$.extend(settingsMain, {
			slidesToShow: 1,
			nextArrow: '<div class="slick-arrow-vert slick-next"><svg class="icon"><use xlink:href="#icon-arr-down"></use></svg></div>',
			prevArrow: '<div class="slick-arrow-vert slick-prev"><svg class="icon"><use xlink:href="#icon-arr-up"></use></svg></div>',
			responsive: [
			{
				breakpoint: bpSM,
				settings: $settingsAdd
			}
			]
		})
	);

	//при смене слайда на адаптиве перемещаем блок с видео
	$('.js-slider-video').on('beforeChange', function(event, slick, currentSlide, nextSlide){
		if( slick.activeBreakpoint == bpSM )
		{
			var curSlide = $(slick.$slides.get(slick.currentSlide));
			var nextSlideDiv = jQuery(slick.$slides[nextSlide]);
			var videoId = nextSlideDiv.find('.thumb-img-video').attr('video-id');
			nextSlideDiv.find('.container-video-thumb').append(curSlide.find("#js-container-video"));
			$("#js-container-video").attr("src", nextSlideDiv.find('.thumb-img-video').attr('video-src'));
			$("#js-container-video").attr("video-id", videoId);
		}
	});
	//при смене разрешения экрана перемещаем блок с видео
	$('.js-slider-video').on('breakpoint', function(event, slick, breakpoint){
		if( breakpoint == bpSM )
		{
			var curSlide = $(slick.$slides.get(slick.currentSlide));
			curSlide.find('.container-video-thumb').append($("#js-container-video"));
		}
		else
			$('.catalog-detail-big-video-wrapper').append($("#js-container-video"));

	});

	$(document).on('click', '.js-pic-review', function(e)
	{
		e.preventDefault();
		openModal($(this));
	});

	//переключение табов
	$('.js-tabs').responsiveTabs({
		startCollapsed: 'accordion'
	});

	//переключение видео на большом расширении
	$(document).on('click', '.js-wrapper-thumb-img', function() {
		var videoId = $(this).find('.thumb-img-video').attr('video-id');
		$("#js-container-video").attr("src", $(this).find('.thumb-img-video').attr('video-src'));
		$("#js-container-video").attr("video-id", videoId);
	});

	// печать
	$(document).on('click', '.js-print', function(e)
	{
		e.preventDefault();
		try
		{
			window.print();
		}

		catch(e)
		{}
	});
}
afterLoad['initCatalogCardFunctions'] = initCatalogCardFunctions;
/* End */
;; /* /local/templates/2016/components/bitrix/catalog.element/.default/script.js?14994162693633*/
