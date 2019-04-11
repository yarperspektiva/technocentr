$(document).ready(function() {

	(function() {

		var input  = $('.search__input'),
			parent = $('.search');

		if ( !input.length || !parent.length ) {
			return 0;
		}
		input.keyup(function() {
			parent.addClass('is-active');

		});
	}());




	$('.mm-nested-menu__link--back').click(function(){
		$(this).closest('.js-open-nested').removeClass('js-open-nested');
	});

	//
	// $('.submenu-link.js-nested').click(function(){
	// 	var el = $(this);
	// 	el.closest('.submenu__item').addClass('js-open-nested')
	// });
	// $('.mm-nested-menu__link.js-nested').click(function(){
	// 	var el = $(this);
	// 	el.closest('.mm-nested-menu__list').addClass('js-open-nested')
	// });
	$('.js-nested').click(function(){
		var el = $(this);
		if( el.hasClass('submenu-link') ) {
			el.closest('.submenu__item').addClass('js-open-nested')
		} else if ( el.hasClass('mm-nested-menu__link') ){
			el.closest('.mm-nested-menu__list').addClass('js-open-nested')
		}
	});

	$(".contacts__anchor").click(function (){
		var el = $(this),
			elTarget = el.data('target'),
			targetTop = $("#"+elTarget).offset().top;

		$('html, body').animate({
			scrollTop: $("#"+elTarget).offset().top - 63
		}, 200);
	});

});
