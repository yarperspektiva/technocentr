
(function jsPersonalData(){
	$('.js_personal-data__label').click(function(){
		var elem = $(this).closest('.personal-data');
		var i = elem.find('.personal-data__input');
		var elemActiveClass = 'personal-data_active';
		if (! elem.hasClass(elemActiveClass) ){
			elem.addClass(elemActiveClass);
			i.val(1);
			elem.closest('form').find('.buttonSend').removeClass('btn_disabled').prop({'type': 'submit'});
		}else {
			elem.removeClass(elemActiveClass);	
			i.val(0);
			elem.closest('form').find('.buttonSend').addClass('btn_disabled').prop({'type': 'button'});
		}	
		var z = i.val();
		return false;
	});
})();
