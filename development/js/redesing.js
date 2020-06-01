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

	// $(".contacts__anchor").click(function (){
	// 	var el = $(this),
	// 		elTarget = el.data('target'),
	// 		targetTop = $("#"+elTarget).offset().top;
	//
	// 	$('html, body').animate({
	// 		scrollTop: $("#"+elTarget).offset().top - 63
	// 	}, 200);
	// });
	(function fn_technicalTable(){
		// Для технической страницы. Таблицы закидываем в новый DIV, чтобы можно было повесить отступы
		var tables = $('.catalog-detail table');
		if (!tables.length) {
			return 0;
		}
		tables.each(function() {
			var el = $(this),
				containerClass = 'table-container';

			if ( el.find('caption').length ) {
				containerClass += ' table-container--caption';
			}

			el.wrap('<div class="' + containerClass + '"></div>');
		});
	})();


	(function(){
		$('.tab-nav__item').not('.tab-nav__item--mobile').on('click', function(){
			var el = $(this),
				target = el.data('target'),
				isActive = 'is-active',
				navItems = el.closest('.tab-nav').find('.tab-nav__item'),

				tabBox = el.closest('.tab__box'),
				tabContent = tabBox.find('.tab-content');
			if ( ! target ) {
				return 0;
			}

			if (! el.hasClass(isActive) ) {
				navItems.removeClass(isActive);
				el.addClass(isActive);

				tabContent.removeClass(isActive);
				tabBox.find(".tab-content[data-target='"+target+"']").addClass(isActive);
			}
		});
		$('.tab-nav__item--mobile').on('click', function(){
			$(this).toggleClass('is-active');
		});
	})();


});
