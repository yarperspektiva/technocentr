$(function() {

	$("[placeholder]").textPlaceholder();
	if ( $('.menu-block').length ){
		var top = $('.menu-block').offset().top;	
	}
	
	$(window).scroll(function() {
		if ($(window).scrollTop() > top) {
			if ($(window).width() > 1024 ) {
				$('header .menu-block').css({'position':'fixed', 'top': '0', 'width':'100%'});
			}
		} else {
			$('header .menu-block').css({'position':'static'});
		}
	});

	//Чудовищный костыль для открытия активной вкладки меню

	// (bool) Находимся ли на странице "Оборудование"
	var $on_products = (location.href.indexOf( 'products' ) != '-1');
	// (bool) Есть ли в любом из трех уровней меню li.active
	var $active_exists = ($('nav.left-menu > ul.left-first-level').find('li.active').length || $('nav.left-menu > ul.left-first-level > li > ul.left-second-level').find('li.active').length || $('nav.left-menu ul.left-third-level').find('li.active').length);
	// (string) Заголовок пункта меню 1-го уровня, который д.б. активным
	// берётся из хлебных крошек
	var $section_title;
	if ( (typeof $('.inner-content .breadcrumbs').children()[2]) !== 'undefined') {
		$section_title = $('.inner-content .breadcrumbs').children()[2].title;
	}
	var $menu_first = $('nav.left-menu > ul.left-first-level');
	// console.log($('nav.left-menu > ul.left-first-level').find('li.active'))
	if ($active_exists) {
		$('nav.left-menu > ul.left-first-level > li > ul.left-second-level').hide();
		$('nav.left-menu > ul.left-first-level')
									.find('li.active')
									.find('ul.left-second-level')
									.show();
		$('nav.left-menu > ul.left-first-level > li > ul.left-second-level')
									.find('li.active')
									.parent()
									.show();
		$('nav.left-menu > ul.left-first-level > li > ul.left-second-level > li > ul.left-third-level')
									.find('li.active')
									.parent()
									.parent()
									.parent()
									.show();
	} else if ((typeof $section_title !== 'undefined') && $on_products) {
		//Здесь просто ультра-костыль: смотрим по хлебным крошкам (!), какой пункт в левом меню делать активным
		$('nav.left-menu > ul.left-first-level > li > a').each( function(i, item) {
			var $menu_title = $.trim($(this)[0].innerHTML);
			// console.log( $.trim($(this)[0].innerHTML) );
			if ($section_title == $menu_title) {
				// console.log($menu_title);
				$(this).parent()
						.find('ul.left-second-level')
						.show();

				//Шедевр костылестроения - опять пользуемся крошками для подсветки меню 2го уровня
				if ( (typeof $('.inner-content .breadcrumbs').children()[3]) !== 'undefined') {
					$second_title = $('.inner-content .breadcrumbs').children()[3].title;
				} else {
					//Бывает, что нету четвёртого элемента, исправляем:
					$second_title = $('.inner-content .breadcrumbs').children()[2].title;
				}
				$(this).parent()
						.find('ul.left-second-level')
						.find('li')
						.each( function(i, item) {
							var $second_menu_title = $.trim($(this).children()[0].innerHTML);
							if ($second_title == $second_menu_title) {
								$(this).addClass('active');
							}
						});
			}
		});
	} else {
		//Если ничего не найдено, просто открываем первый пункт
		$('nav.left-menu > ul.left-first-level > li:first-child')
									.find('ul.left-second-level')
									.show();
	}

	// Hover skazali ne nuzhen
	// $('nav.left-menu > ul.left-first-level > li').hover(
	// 	function() {
	// 		$(this).find('ul.left-second-level').stop().slideDown();
	// 	},
	// 	function() {
	// 		$(this).find('ul.left-second-level').stop().slideUp();
	// 	}
	// );

	//file name insertion, called after the form loads
	function filename() {
		var reWin = /.*\\(.*)/;
		var reUnix = /.*\/(.*)/;
		$('#file').on('change', function() {
			var file = $(this).val();
			var fileTitle = file.replace(reWin, "$1");
			fileTitle = fileTitle.replace(reUnix, "$1");
			$('input.file-fake').val(fileTitle);
			$('#FileName').text(fileTitle);
		});
	}

	var p_pics = $('.product-slider ul li').length;

	if (p_pics > 3) {
		$(window).load(function() {
			$(".product-slider").jCarouselLite({
				btnNext: "#product-next",
				btnPrev: "#product-prev"
			});
			// $("#product-next, #product-prev").show();
			$("#product-next, #product-prev").css({'display':'inline-block'});
		});
	}

	//fancybox
	$("#product-preview, .g, .fancybox-thumb, .galery, .fancybox").fancybox({
		helpers: {
			title: {
				type: 'inside'
			},
			overlay: {
				speedOut: 0
			},
			thumbs: {
                width: 50,
                height: 50
            }
		}
	});
	$(window).load(function() {
		$('.fancybox').each(function() {
			$(this).attr("rel", "group");
		});
	});

	//Код для карточки товара в каталоге
	$(window).load(function() {
		$('.product-slider a').on('click', function(e) {
			e.preventDefault();
			var src_img_preview = $(this).data('imgPreview');
			var src_img_big = $(this).data('imgBig');
			var g_id = $(this).data('gId');
			
			$('.g').attr('rel','group-view');
			$('#g-' + g_id).attr('rel','');

			$('#product-preview img').fadeOut(250, function() {
				//var img = '<img src='+src_img_preview+' style="max-height:270px;display:none;" />';
				var thisparent = $(this).parent();
				//$(this).remove();
				$(this).attr('src', src_img_preview);
				thisparent.attr('href', src_img_big);
				$(this).load(function() {
					$(this).fadeIn('fast');
				});
				//thisparent.find('img').fadeIn('fast');
			});
		});
	});

	/*
	 * Здесь же, в общей каше, будут и самодельные аякс-формы
	 */

	
	//Форма "ЗАКАЗАТЬ ОБРАТНЫЙ ЗВОНОК"
	$(document).on('click', '.callme_viewform', function(e)
	{
		e.preventDefault();
		var $form = $('.callmeform');
		if( !$form.find('form').length )
			$form.load('/ajax/callme_form.php');
		$form.toggle();
	});

	// кнопка "закрыть"
	$(document).on('click', '.callmeform .cme_cls', function(e)
	{
		e.preventDefault();
		$(this).closest('.callmeform').toggle();
	});

	
	/*
	 * Событие закрытия ajax-форм (крестик или клик на фон)
	 */

   $(document).on('click', '#ajaxform-close', function(e) {
		e.preventDefault();
		$('.my-overlay').hide();
		$('.ajaxform-lock').removeClass('ajaxform-lock');
		$('body').css({'overflow-x':'auto'});
		jQuery('.error').html("");
	});

	$(document).on('click', '.my-overlay', function(e) {
		var excludes = $( '.request-form-wrapper, .request-form-body, .request-form-body h3, span, div, label, textarea, form, input, img, p', '.my-overlay' );
	 
		if( !$( e.target ).is( excludes ) ) {
			$('.my-overlay').hide();
			$('.ajaxform-lock').removeClass('ajaxform-lock');
			$('body').css({'overflow-x':'auto'});
			jQuery('.error').html("");
		}

		e.stopPropagation();

	});	

	// скрытие меню второго уровня (только для главной страницы)
	if(window.location.pathname == '/')
	{
		$('.left-second-level').hide();
	}


	//Форма "ЗАКАЗАТЬ ОБОРУДОВАНИЕ"
	$(document).on('click', '#order-btn', function(e)
	{
		e.preventDefault();
		var productTitle = $('.inner-content h1').html();
		if( !$('.my-overlay').length )
		{
			$('body').append('<div class="my-overlay"></div>');
			$('.my-overlay').load( '/ajax/create_order_form.php', function(e) {
				$('.prodName').attr('value', productTitle);
			});
		}
		$('.my-overlay').show();
	});

	//битрикс говно, держите свои ебаные костыли
    $('img').each(function() {
		if($(this).attr('border') > 0) {
            $(this).css({'border':$(this).attr('border') + 'px solid black'});
        }
        if($(this).attr('hspace') > 0) {
            $(this).css({'padding-left':$(this).attr('hspace') + 'px',
						'padding-right':$(this).attr('hspace') + 'px'});
        }
        if($(this).attr('vspace') > 0) {
            $(this).css({'padding-top':$(this).attr('vspace') + 'px',
						'padding-bottom':$(this).attr('vspace') + 'px'});
        }
    });

    $('table td').each(function() {
        if($(this).attr('align') === 'center') {
            $(this).css({'text-align':'center'});
        }
        if($(this).attr('align') === 'left') {
            $(this).css({'text-align':'left'});
        }
        if($(this).attr('align') === 'right') {
            $(this).css({'text-align':'right'});
        }
    });

    $('.inner-content div').each(function() {
        if($(this).attr('align') === 'center') {
            $(this).css({'text-align':'center', 'width':'100%'});
        }
        if($(this).attr('align') === 'left') {
            $(this).css({'text-align':'left', 'width':'100%'});
        }
        if($(this).attr('align') === 'right') {
            $(this).css({'text-align':'right', 'width':'100%'});
        }
    });

    // $('table').each(function() {
    //     if($(this).attr('cellpadding') > 0) {
    //         $(this).find('td').css({'padding':$(this).attr('cellpadding')});
    //     }
    // });

$("#view_all_menu_items").click(function(){
  $(".menu_hidden").toggle(600);
});

});

$(window).load(function() {
    if ( ($.browser.msie !== undefined) && ($.browser.version <= 7) ) {
        $.reject({ display: ['firefox','chrome','opera','safari','msie'],close: false,paragraph2: 'Вы не сможете закрыть это окно. Щёлкните по любой иконке, чтобы перейти на страницу загрузки браузера, загрузите и установите его, после чего зайдите на сайт через него.'});
    }

    if ( $('form[name=SIMPLE_FORM_1]').length ) {
		// $.a_str = '<a href="#rev_form" class="same-page-link">Оставить отзыв</a>';
		$('<a href="#rev_form" class="same-page-link">Оставить отзыв</a>').appendTo("h1");
    }
});