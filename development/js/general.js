/**
 * настройки, глобальные переменные
 */
var bpXS = 768;
var bpSM = 980;
var timeoutNum = 30000;

var scrollbarWidth = function()
{
	var parent, child, width;

	if(width === undefined)
	{
		parent = $('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo('body');
		child = parent.children();
		width = child.innerWidth()-child.height(99).innerWidth();
		parent.remove();
	}

	return width;
};

/**
 * общие функции
 */
var GeneralFunc = function()
{
	// спойлеры меню
	$(document).on('click', '.js-spoiler', function(e)
	{
		if( $(this).hasClass('menu-link') && $(this).parents('.menu-area').length )
			return true;
		if( $(this).hasClass('menu-link') || $(this).hasClass('js-slide-select') )
		{
			e.preventDefault();
			$(this).toggleClass('spoiler--open');
			$(this).next('.spoiler-content').toggleClass('spoiler-content--open');
		}
	});

	// закрепление меню
	function fixedMenu()
	{
		var scroll = $(document).scrollTop()
		var topMenu = $('.menu-area').offset().top;
		if( scroll >= topMenu )
			$('.menu-wrapper').addClass('menu-wrapper--fixed');
		else
			$('.menu-wrapper').removeClass('menu-wrapper--fixed');

		if( $(document).width() < bpXS )
		{
			if( !$('.header-wrapper').hasClass('header-wrapper--fixed') )
				var bottomLogo = $('.logo').offset().top + $('.logo').outerHeight();
			else
				var bottomLogo = $('.logo').outerHeight();

			if( scroll >= bottomLogo )
				$('.header-wrapper').addClass('header-wrapper--fixed');
			else
				$('.header-wrapper').removeClass('header-wrapper--fixed');
		}
	}
	fixedMenu();
	$(document).on('scroll', fixedMenu);

	// форма обратной связи
	$(document).on('click', '.js-callback', function(e)
	{
		e.preventDefault();
		openModalAjax( $(this), {
			href: '/local/ajax/form-callback.php',
			afterShow: function() {
				initMaskPhoneMulti();
			}
		});
	});

	// поиск

	$('.search form').off('submit');

	$(document).on('click', '.js-search-open', function(e)
	{
		e.preventDefault();
		$('.search-panel').toggleClass('search-panel--open');
	});

	// сайдбар
	$(document).on('click', '.js-open-sidebar-menu', function(e)
	{
		e.preventDefault();
		$('.sidebar-menu').toggleClass('sidebar-menu--open');
	});
	$(document).on('click', '.js-sidebar-overlay, .js-sidebar-close', function(e)
	{
		e.preventDefault();
		$('.sidebar-menu').removeClass('sidebar-menu--open');
	});

	//заполнение селекта выбранным значением
	$(document).on('change', 'select', function(e)
	{
		var str = $(this).find( "option:selected" ).text();
		$(this).siblings(".inputselect-text").text( str );
	});

	// форма заказа оборудования
	$(document).on('click', '.js-order', function(e)
	{
		e.preventDefault();
		var productTitle = '';

		if( $('h1').next('.catalog-detail').length )
			productTitle = $('h1').html();

		openModalAjax( $(this), {
			href: '/local/ajax/form-order.php',
			beforeShow: function() {
				$('.js-prod-name').val(productTitle);
			},
			afterShow: function() {
				initMaskPhoneMulti();
			}
		});
	});
}
afterLoad['GeneralFunc'] = GeneralFunc;

//инициализация маски
var initMaskPhone = function()
{
	$('[data-inputmask]').each(function()
	{
		var mask = $(this).data('inputmask');
		$(this).mask(mask);
	});
}


// var listCountries = $.masksSort($.masksLoad("/local/templates/2016/js/plugins/phone-codes.json"), ['#'], /[0-9]|#/, "mask");
var maskOpts = {
	inputmask: {
		definitions: {
			'#': {
				validator: "[0-9]",
				cardinality: 1
			}
		},
		showMaskOnHover: false,
		autoUnmask: true
	},
	match: /[0-9]/,
	replace: '#',
	listKey: "mask"
};
//инициализация маски для города и страны
var initMaskPhoneMulti = function()
{
	$('.js-mask-phones').each(function()
	{
		var $parentBlock = $(this);
		//маска для страны
		var maskChangeWorld = function(maskObj, determined)
		{
			if ( determined )
			{
				var hint = maskObj.name_ru;
				if (maskObj.desc_ru && maskObj.desc_ru != "")
					hint += " (" + maskObj.desc_ru + ")";
				$parentBlock.find(".descr").html(hint);
			}
			else
				$parentBlock.find(".descr").html('');
		}
		//меняем маску
		$res = $parentBlock.find('.customer-phone').inputmasks($.extend(true, {}, maskOpts, {
			list: listCountries,
			onMaskChange: maskChangeWorld
		}), 'isCompleted');

		//стираем занчения в маске если заполнили не до конца
		$parentBlock.find('.customer-phone').blur(function()
		{
			if( $('.customer-phone').val().length < 9 )
				$('.customer-phone').val('');
		});

	});
}

var initSliders = function()
{
	if( !$('.js-main-slider .detail-slide').length )
		return false;
	//меняем подпись к картинке при прокрутке галереи
	$('.js-main-slider, .js-thumb-slider').on('afterChange', function(event, slick, currentSlide, nextSlide){
		var curSlide = $(slick.$slides.get(slick.currentSlide));
		$('.js-desc-pic').html(curSlide.find('.js-gallery-more-pic').attr('title'));
		$('.js-thumb-slider .slick-slide').css('pointer-events', 'auto');
	});
	// получается что выбранное превью не совпадает с детальной картинкой, т.к. она не успевает за кликом
	$('.js-main-slider').on('beforeChange', function(slick, currentSlide, nextSlide)
	{
	    $('.js-thumb-slider .slick-slide').css('pointer-events', 'none');
	});
	//галерея больших изображений товара
	$('.js-main-slider').slick({
		arrows: false,
		asNavFor: '.js-thumb-slider'
	});
	//основные настройки слайдера
	$thumbOpt = {
		slidesToShow: 4,
		slidesToScroll: 1,
		accessibility: false,
		asNavFor: '.js-main-slider',
		focusOnSelect: true,
		draggable: false,
		autoplay: false,
		vertical: true,
		nextArrow: '<div class="slick-arrow-vert slick-next"><svg class="icon"><use xlink:href="#icon-arr-down"></use></svg></div>',
		prevArrow: '<div class="slick-arrow-vert slick-prev"><svg class="icon"><use xlink:href="#icon-arr-up"></use></svg></div>'
	};
	//дополнительные настройки слайдера
	$thumbRespOpt = {
		breakpoint: bpXS,
		settings: {asNavFor: null,
			slidesToShow: 1,
			slidesToScroll: 1,
			vertical: false,
			dots: true,
			arrows: false
		}
	};
	$thumbOpt.responsive = [$thumbRespOpt];
	//галерея маленьких изображений товара

	$('.js-thumb-slider').slick($thumbOpt);

	//на мобильной версии отключаем фэнсибокс
	if( $(document).width() < bpXS )
		$('.js-gallery-more-pic').addClass('js-gallery-more-pic--enabled');

	$(window).on('resize', function(e)
	{
		if( $(document).width() < bpXS )
			$('.js-gallery-more-pic').addClass('js-gallery-more-pic--enabled');
		else
			$('.js-gallery-more-pic').removeClass('js-gallery-more-pic--enabled');
	});
	$(document).on('click', ".slick-slide:not(.slick-cloned) .js-gallery-more-pic", function(e)
	{
		e.preventDefault();
	});
	//выводим по клику на превью товара большое изображение
	$(".slick-slide:not(.slick-cloned) .js-gallery-more-pic:not(.js-gallery-more-pic--enabled)").fancybox(
		$.extend(
			{},
			$.extend(defaultFancyOpt,
			{maxWidth: 600, maxHeight: 600})
		)
	);
};

afterLoad['initSliders'] = initSliders;
afterLoad['initMaskPhone'] = initMaskPhone;
afterAjax['initMaskPhone'] = initMaskPhone;
afterLoad['initMaskPhoneMulti'] = initMaskPhoneMulti;
afterAjax['initMaskPhoneMulti'] = initMaskPhoneMulti;
