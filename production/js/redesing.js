$(document).ready(function(){!function(){var t=$(".search__input"),e=$(".search");if(!t.length||!e.length)return;t.keyup(function(){e.addClass("is-active")})}(),$(".mm-nested-menu__link--back").click(function(){$(this).closest(".js-open-nested").removeClass("js-open-nested")}),$(".js-nested").click(function(){var t=$(this);t.hasClass("submenu-link")?t.closest(".submenu__item").addClass("js-open-nested"):t.hasClass("mm-nested-menu__link")&&t.closest(".mm-nested-menu__list").addClass("js-open-nested")}),function(){var t=$(".catalog-detail table");if(!t.length)return;t.each(function(){var t=$(this),e="table-container";t.find("caption").length&&(e+=" table-container--caption"),t.wrap('<div class="'+e+'"></div>')})}(),$(".tab-nav__item").not(".tab-nav__item--mobile").on("click",function(){var t=$(this),e=t.data("target"),n="is-active",s=t.closest(".tab-nav").find(".tab-nav__item"),a=t.closest(".tab__box"),i=a.find(".tab-content");if(!e)return 0;t.hasClass(n)||(s.removeClass(n),t.addClass(n),i.removeClass(n),a.find(".tab-content[data-target='"+e+"']").addClass(n))}),$(".tab-nav__item--mobile").on("click",function(){$(this).toggleClass("is-active")})});