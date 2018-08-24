String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

import '../components/scss/style.scss';

import '../components/js/bootstrap.min';

import '../components/js/bootstrap-select';

import '../components/js/map.js';

// import '../components/js/jquery.elevatezoom.js';

// $('.zoomImg').elevateZoom({
// 	});

import 'slick-carousel';

var slickBanner = $('.slick-banner-main');
var slickInstagram = $('.slick-instagram-main');
var slickRecomended = $('.slick-recomended');
var slickCatalogItem = $('.slick-catalog-item');

var slickPopular = ['slick-popular', 'slick-news', 'slick-viewed'];

slickBanner.slick({
	dots: true,
	fade: true,
	autoplay: true
})

slickInstagram.slick({
	slidesToShow: 4,
	slidesToScroll: 4,
	responsive: [
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3
      }
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        centerMode: true,
		centerPadding: '25px',
		slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
})

slickRecomended.slick({
	infinite: true,
});

slickCatalogItem.slick({
	// lazyLoad: 'progress',
	vertical: true,
	verticalSwiping: true,
	slidesToShow: 2,
	slidesToScroll: 2,
	dots: true,
	responsive: [
		{
			breakpoint: 991,
			settings: {
				vertical: false,
				verticalSwiping: false,
				slidesToShow: 1,
				slidesToScroll: 1
			}
		}
	]
});

$(document).ready(function() {
	
	
	
	if($('body').hasClass('index-page') || $('body').hasClass('wholesale-catalog-page')) {
		$('.header__right').appendTo('.header__content-bottom');
		// $('.header__search').detach();
		// $('.header__content-top').detach();
	}

	if($('body').hasClass('index-page')) {
		$.each(slickPopular, function(index, value) {
			$('.' + value).slick({
				slidesToShow: 4,
				slidesToScroll: 4,
				responsive: [
				    {
				      breakpoint: 1199,
				      settings: {
				        slidesToShow: 3,
				        slidesToScroll: 3
				      }
				    },
				    {
				      breakpoint: 767,
				      settings: {
				        slidesToShow: 2,
				        slidesToScroll: 2,
				        arrows: false
				      }
				    }
				]
			});
		});
	}

	if($('body').hasClass('catalog-item-page') || $('body').hasClass('wholesale-catalog-item-page') ) {
		$.each(slickPopular, function(index, value) {
			$('.' + value).slick({
				slidesToShow: 6,
				slidesToScroll: 6,
				responsive: [
					{
						breakpoint: 1199,
						settings: {
							slidesToShow: 4,
							slidesToScroll: 4
						}
					},
					{
						breakpoint: 991,
						settings: {
							slidesToShow: 3,
							slidesToScroll: 3
						}
					},
					{
						breakpoint: 767,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 2,
							arrows: false
						}
					}
				]
			});
		});
	}

});

$(document).ready(function() {
	$.each(['Fav', 'Cart'], function(index, value) {
		if($('#header' + value).has('.header__quantity').length) {
			$('#header' + value).addClass('has-items');
		}
	});

	$('.free-top__close').click(function(e) {
		e.preventDefault();
		$(this).parent('.free-top').detach();
	})
});

$(function headerDropdownMenu() {
	$('.header__categories > li > a').click(function(e) {
		e.preventDefault();
		if(!$(this).parent('li').hasClass('opened')) {
			$('.header__categories > li').removeClass('opened');
			$(this).parent('li').addClass('opened');
		}
		else {
			$(this).parent('li').removeClass('opened');
		}

		$(document).mouseup(function(e) {
			var block = $('.header__dropdown, .header__categories > li');
			if(!block.is(e.target) && block.has(e.target).length === 0) {
				block.removeClass('opened');
			}
		});
	});
});

$(function hoverSearchPanel() {
	$('#searchInput').mouseenter(function() {
		$(this).find('input').addClass('hovered');
		$('.header__categories > li + li').addClass('squeeze');
	});
	$('#searchInput').mouseleave(function() {
		$(this).find('input').removeClass('hovered');
		$('.header__categories > li + li').removeClass('squeeze');
	});
});

$(function showSearch() {
	$('#searchBtn').click(function(e) {
		e.preventDefault();
		$(this).toggleClass('opened');
		$('#searchInput').toggleClass('opened');
	})
});

$(function year() {
	var date = new Date(),
	year = date.getFullYear();
	$('#year').text(year);
});

$(function(){
	$('.input').on('keydown', function(e){
		if(e.key.length == 1 && e.key.match(/[^0-9'".]/) || (e.key.length == 8)){
			return false;
		};
	})
	$('.input').mousedown(function(event){
	    event.stopPropagation();
	});

	$.each(['.minus', '.plus'], function(index, value) {
		$(value).mousedown(function(event){
		    event.stopPropagation();
		    event.preventDefault(); 
		    return false;
		});
	})

	$('.plus').on('click', function(){
		
		var _this = $(this);
		var input = _this.next();
		var value = input.val();
		input.val(+value+1);

	});
	$('.minus').on('click', function(){
		var _this = $(this);
		var input = _this.prev();
		var value = input.val()
		if(value>0) {
			input.val(+value-1);
		}
	});
});

$(function showPopup() {
	//LOGIN AND PROMOCODE POP-UP
	$.each(['login', 'promocode', 'tableSizes', 'ask'], function(index, value){
		$('#' + value).click(function(e) {
			e.preventDefault();
			$('#popup' + value.capitalize()).addClass('opened').css('z-index', '999');
			$('#closePopup' + value.capitalize()).click(function() {
				$('#popup' + value.capitalize()).removeClass('opened');
				setTimeout(function() {
					$('#popup' + value.capitalize()).css('z-index','-1');
				}, 300);
			});
		});
	});
	//TEXTILE POP-UP
	$('.textile__img').click(function(e) {
		var modal = $('#popupTextile'),
		modalClose = $('#closePopupTextile');
		e.preventDefault();
		var attrImg = $(this).attr('href'),
		attrName = $(this).find('.textile__name > p').html();
		$('.pop-up--textile__img').attr('style', 'background-image:url(' + attrImg + ')');
		$('.pop-up--textile__title > p').html(attrName);
		modal.addClass('opened');
		modal.css('z-index', '999');
		// setTimeout(function() {
			$('body').addClass('modal-open').css('padding-right', '17px');
		// }, 300);
		modalClose.click(function() {
			modal.removeClass('opened');
			// $('body').removeClass('modal-open').css('padding-right', '0');
			setTimeout(function() {
				$('body').removeClass('modal-open').css('padding-right', '0');
				modal.css('z-index','-1');
			}, 300);
		});
	});
	//EDIT POP-UP
	$('.account__delivery-address-edit, .account__delivery-address-add').click(function(e) {
		var modal = $('#popupEdit'),
		modalClose = $('#closePopupEdit');
		e.preventDefault();
		modal.addClass('opened');
		modal.css('z-index', '999');
		// setTimeout(function() {
			$('body').addClass('modal-open').css('padding-right', '17px');
		// }, 300);
		modalClose.click(function() {
			modal.removeClass('opened');
			// $('body').removeClass('modal-open').css('padding-right', '0');
			setTimeout(function() {
				$('body').removeClass('modal-open').css('padding-right', '0');
				modal.css('z-index','-1');
			}, 300);
		});
	});

	$('.account__delivery-address-edit').click(function() {
		var attrName = $(this).html();
		$('.pop-up--edit__form > h6').html(attrName + ' адрес');
		$('.btn--save').text('Сохранить');
	})

	$('.account__delivery-address-add').click(function() {
		var attrName = $(this).find('p').html();
		$('.pop-up--edit__form > h6').html(attrName);
		$('.btn--save').text('Добавить');
	});
});

$(function errorInput() {
	var error = '.has-error'
	$(error + '__close').click(function() {
		$(this).parent(error + '__alert').parent('.form-group').removeClass(error.slice(1));
	});
	$('.form-group').keydown(function() {
		$(this).removeClass(error.slice(1));
	})
});

$(function wishItem() {
	var obj = {
		"disabled":"такого товара больше нет", 
		"discontinued": "товар снят с производства", 
		"has-not": "указаного размера или цвета не существует"
	}
	
	var item = '.wishlist';

	$.each(obj, function(key, value) {
		var wishItem = '.wishlist__item';
		if($(wishItem).hasClass(wishItem.slice(1) + '--' + key)) {
			wishItem = $(wishItem + '--' + key);
			wishItem.find(item + '__img').append('<div class="wishlist__alert">' + '<span><i></i></span>' + '<p>' + value + '</p>' + '</div>');			
		}
	});

	$(item + '__close').click(function() {
		$(this).parent(wishItem).detach();
	});
});

$(function catalogItem() {
	$('.catalog__img').click(function(e) {
		
		$('.catalog__add-to').removeClass('opened');
		$(this).parent('.catalog__item').find('.catalog__add-to').addClass('opened');
		$(this).parent('.catalog__item').find('a').click(function(e) {
			e.preventDefault();
		})
		
	});

	$(document).mouseup(function(e) {
		var block = $('.catalog__img, .catalog__add-to');
		if(!block.is(e.target) && block.has(e.target).length === 0) {
			block.parent('.catalog__item').find('.catalog__add-to').removeClass('opened');
		}
	});

	$('.catalog__add-to-close').click(function() {
		$(this).parent('.catalog__add-to').removeClass('opened');

	});

	$.each(['sort', 'collection', 'color', 'size', 'who'], function(index, value) {
		$('#' + value).click(function(e) {
			e.preventDefault();
			$(this).parent('li').toggleClass('opened');
		});
	});

	$(document).mouseup(function(e) {
		var block = $('.sub-menu');
		if(!block.is(e.target) && block.has(e.target).length === 0) {
			block.parent('li').removeClass('opened');
		}
	});

	$.each(['collection', 'color', 'size', 'who'], function(index, value) {
		$('.catalog__' + value).find('.sub-menu > ul > li > a').click(function(e) {
			e.preventDefault();
			$(this).parent('li').addClass('active');
		});
	});

	$('.sub-menu__clear').click(function(e) {
		e.preventDefault();
		$(this).parent('.sub-menu__top').parent('.sub-menu').find('li').removeClass('active');
		$(this).parent('.sub-menu__top').parent('.sub-menu').find('.sub-menu__count').text('0');
	});
});

$(function openCart() {
	$('#headerCart > a').click(function() {
		$('#headerCartDropdown').toggleClass('opened');
	});

	$(document).mouseup(function(e) {
		var block = $('#headerCartDropdown, #headerCart > a');
		if(!block.is(e.target) && block.has(e.target).length === 0) {
			block.removeClass('opened');
		}
	});
	
	var dropdown = '.header__cart-dropdown';
	$(dropdown + '-del-item').click(function(e) {
		e.preventDefault();
		$(this).parent(dropdown + '-box').detach();
	});
});

$(function matchPasswords() {
	$(".account__new-pwd").on("keyup", function() {
		var value_input1 = $("#newpwd").val();
		var value_input2 = $('#rewrite').val();
		if(value_input1 != value_input2) {
			$('#newpwd').parent('.form-group').removeClass('matched');
			$('#rewrite').parent('.form-group').removeClass('matched');			
		} 
		else {
			$("#newpwd").parent('.form-group').addClass('matched');
			$("#rewrite").parent('.form-group').addClass('matched');			
		}
	});
});

$(function openDropdownInput() {

	$('#dropdownInput').click(function(e) {
		e.preventDefault();
		$(this).parent('.dropdown-input').toggleClass('opened')
	})

	$(document).mouseup(function(e) {
		var block = $('#dropdownInput, .sub-menu');
		if(!block.is(e.target) && block.has(e.target).length === 0) {
			block.parent('.dropdown-input').removeClass('opened');
		}
	});

	$('.sub-menu > ul > li > a').click(function(e) {
		e.preventDefault();
		var value = $(this).find('span').clone();
		$('#dropdownInput').html(value)
		$('.dropdown-input').removeClass('opened');
	});
});

// $(document).ready(function() {
// 	var d = $('.account__delivery-address-add').parent('li').prev().height();
// 	$('.account__delivery-address-add').css('min-height', d + 'px');
// })

$(function deleteAddress() {
	$('.account__delivery-address-del').click(function(e) {
		e.preventDefault();
		$(this).parent('.account__delivery-address-custom').parent('div').parent('.account__delivery-address-item'). parent('li').detach();
	})
});

$(function deleteAttr() {
	$('#removeChecked').click(function(e) {
		e.preventDefault();
		$('#quantityChecked > i').text('0');
		$('.wholesale-catalog__filter-list input').prop('checked', false);
	})
});

$(function showmoreWholesaleFilter() {
	$('.wholesale-catalog__show-more').click(function(e) {
		e.preventDefault();
		$(this).toggleClass('active');
		var panel = $(this).prev();
		if(panel.attr('style')) {
			panel.attr('style', '');
		}
		else {
			var h = panel.prop('scrollHeight');
			panel.css('max-height', h + 'px');
		}
	})
});

$(function toFullscreen() {
	var screen = $('#fullscreenBlock') ;
	var close = $('#fullscreenClose');
	$('.catalog-item__to-fullscreen').click(function(e) {
		e.preventDefault();
		var img = $(this).next('img').attr('src');
		screen.find('img').attr('src', img);
		screen.addClass('opened').css('z-index', '999');
		$('body').addClass('modal-open').css('padding-right', '17px');
	});
	close.click(function(e) {
		e.preventDefault();
		screen.removeClass('opened');
		$('body').removeClass('modal-open').css('padding-right', '0px');
		setTimeout(function() {
			screen.css('z-index', '-1');
		}, 300);
	});
});

$(function liked() {
	var item = {'.catalog-item__reserved': 'reserved', '.like': 'liked'}
	$.each(item, function(index, value) {
		$(index).click(function(e) {
			e.preventDefault();
			$(this).toggleClass(value);
		})
	});
})

//------ADAPTIVE-FUNCTIONS--------

//ADAPTIVE CATALOG ITEM
$(function adaptiveCatalogItem() {
	if(matchMedia) {
		var screen = window.matchMedia('(max-width: 991px)');
		screen.addListener(changes);
		changes(screen);
	}
	function changes(screen) {
		var block = $('.catalog-item__block');
		block.each(function() {
			var top = $('.catalog-item__top'),
			right = $('.catalog-item__right-block');
			if(screen.matches) {
				var top = $(this).find('.catalog-item__top');
				top.prependTo($(this));
			}
			else {
				top.prependTo(right);
			}
		});
	};
});

//ADAPTIVE FOOTER
$(function changeFooterMobile() {
    if(matchMedia) {
        var screen = window.matchMedia('(max-width: 767px)');
        screen.addListener(changes);
        changes(screen);
    }
    function changes(screen) {
    	var footerMob = {
    		'socials': 'top',
    		'company': 'top',
    		'programs': 'top',
    		'guide': 'top',
    		'copyright': 'mid',
    		'develop': 'bottom'
    	},
    	footerDesc = {'copyright': 'left',
	    	'company': 'center',
	    	'programs': 'center',
	    	'guide': 'center',
	    	'socials': 'right',
	    	'develop': 'right'
	    };
        if(screen.matches) {
            $.each(footerMob, function(index, value) {
        		$('.footer__' + index).appendTo('.footer__' + value);
        	});
        }
        else {
        	$.each(footerDesc, function(index, value) {
        		$('.footer__' + index).appendTo('.footer__' + value);
        	});
        }
    };
    $(function accordionFooter() {
		var acc = $('.footer__title');

		for (var i = 0; i < acc.length; i++) {
		  acc.on("click", function() {
		    $(this).toggleClass("active");
		    var panel = this.nextElementSibling;
		    if (panel.style.maxHeight){
		      panel.style.maxHeight = null;
		    } else {
		      panel.style.maxHeight = panel.scrollHeight + "px";
		    } 
		  });
		}
	});
});

//ADAPTIVE ITEMS WISHLIST
$(function adaptiveWishlist() {
    if(matchMedia) {
        var screen = window.matchMedia('(max-width: 767px)');
        screen.addListener(changes);
        changes(screen);
    }
    function changes(screen) {
    	$('.wishlist__item').each(function() {
    		var item = $(this).find('.wishlist__remain');
    		if(screen.matches) {
	    		item.insertBefore($(this).find('.wishlist__info'));
	    	}
	    	else {
				item.prependTo($(this));
	    	}
    	});
    }
});

//ADAPTIVE ITEMS CATALOG
$(function adaptiveCatalog() {
    if(matchMedia) {
        var screen = window.matchMedia('(max-width: 767px)');
        screen.addListener(changes);
        changes(screen);
    }
    function changes(screen) {
    	$('.catalog__item').each(function() {
    		var item = $(this).find('.catalog__info-right');
    		if(screen.matches) {
	    		item.appendTo($(this));
	    	}
	    	else {
				item.appendTo($(this).find('.catalog__info'));
	    	}
    	});
    }
});

//ADAPRIVE ORDERS-HISTORY

$(function adaptiveOrdersHistory() {
    if(matchMedia) {
        var screen = window.matchMedia('(max-width: 767px)');
        screen.addListener(changes);
        changes(screen);
    }
    function changes(screen) {
    	if(screen.matches) {
    		$('.account__orders-history .thead').find('.th-4 > p').text('Сумма');
    	}
    	else {
    		$('.account__orders-history .thead').find('.th-4 > p').text('Сумма к оплате');
    	}
    	$('.orders-history__accordion .panel-heading').each(function() {
    		var parent = $(this).parent('.tbody'),
    		data = '.orders-history__data',
    		print = '.orders-history__print',
    		elem = $(this).find(data),
    		elem2 = $(this).find(print);
        	if(screen.matches) {
	        	$(this).find('.td-1').append(elem);
	        	parent.find('.panel-body').append(elem2);
	        	parent.parent('.tbody').find('.panel-body').append(elem2); 
	        }
	        else {
	        	$(this).find('.td-1 > ' + data).appendTo($(this).find('.td-2'));
	        	parent.find(print).appendTo($(this).find('.td-6'));
			}
        });
        $('.orders-history__item').each(function() {
        	var amount = '.orders-history__quantity',
    		price = '.orders-history__price',
        	elem = $(this).find(amount),
			elem2 = $(this).find(price);	
			if(screen.matches) {
				$(this).find('.orders-history__description').append('<div class="orders-history__info"></div>');
				var info = $(this).find('.orders-history__info');
				elem.prepend('<span>Кол-во:</span>')
				info.append(elem);
				info.append(elem2);
			}
			else {
				elem.find('span').detach();
				elem.appendTo($(this));
				elem2.appendTo($(this));
				$(this).find('.orders-history__info').detach();
			}
        })
	}
});

//ADAPTIVE TABLE ON WHOLESALE PAGE
$(function adaptiveTable() {
    if(matchMedia) {
        var screen = window.matchMedia('(max-width: 767px)');
        screen.addListener(changes);
        changes(screen);
    }
    function changes(screen) {
        if(screen.matches) {
 			$.each(['selectively', 'lot', 'sizes'], function(index, value) {
            	$('#' + value + ' thead > tr').append('<th class="th-size-mob"><p>размер</p></th><th class="th-quantity-mob"><p>количество</p></th>');
            	$('#' + value + ' tbody > tr').append('<td class="td-size-mob"></td><td class="td-quantity-mob"></td>');

            	$('#' + value + ' thead > tr > .th-size > p').each(function() {
            		var item = $(this);
            		var td =  $(this).parent('th').parent('tr').parent('thead').parent('table').find('.td-size-mob');
            		item.appendTo(td)
            	});

            	$('#' + value + ' tbody > tr .wholesale-catalog__quantity').each(function() {
	        		var item = $(this);
	        		var td = $(this).parent('td').parent('tr').find('.td-quantity-mob');
	        		item.appendTo(td);
	        	});

        	 	$('#' + value + ' thead > tr > .th-size').detach();
            	$('#' + value + ' tbody > tr > .td-size').detach();
            });
		}
		else {
			// $.each(['selectively', 'lot', 'sizes'], function(index, value) {
   //      	 	var seen = {};
   //          	$('#' + value + ' tbody > tr > .td-size-mob > p').each(function() {
			// 		var txt = $(this).text();
			// 	    if (seen[txt])
			// 	        $(this).remove();
			// 	    else
			// 	        seen[txt] = true;
   //          		var item = $(this);
   //          		var itemWrap = item.wrap('<th class="th-size"></th>').parent('th');
   //          		var td = itemWrap.parent('.td-size-mob').parent('tr').parent('tbody').parent('table').find('thead > tr');
   //          		itemWrap.appendTo(td);
   //          		$('#' + value + ' thead > tr > .th-size-mob').detach();
   //          		$('#' + value + ' thead > tr > .th-quantity-mob').detach();
   //          	});

   //          	$('#' + value + ' tbody > tr > .td-quantity-mob').each(function() {
   //          		var item = $(this).find('.wholesale-catalog__quantity');
   //          		var itemWrap = item.wrap('<td class="td-size"></td>').parent('td');
   //          		var td = itemWrap.parent('td').parent('tr').parent('tbody').find('tr');
   //          		itemWrap.appendTo(td);
   //          		$('#' + value + ' tbody > tr > .td-size-mob, #' + value + ' tbody > tr > .td-quantity-mob').detach();
   //          	});
   //          });
		}
    };
});

//MoobileMenu
$(function mobileMenu() {
	// $('#searchInput').appendTo('.header__content-bottom');
	
	$(function mobileMenuTablet() {
		if(matchMedia) {
	        var screen = window.matchMedia('(max-width: 991px)');
	        screen.addListener(changes);
	        changes(screen);
	    }
	    function changes(screen) {
	        if(screen.matches) {
	        	$('.header').append('<div class="header__mob-menu" id="mobMenu"><div class="header__mob-menu-inner"></div><a class="header__mob-menu-close" id="closeMobMenu"></a></div>');
	        	var mobMenu = $('#mobMenu > .header__mob-menu-inner');
	        	mobMenu.append('<ul class="header__mob-menu-list"></ul>');

	        	$('.header__categories').appendTo(mobMenu);
	        	$('.header__nav').appendTo(mobMenu);

	        	$('#searchInput').prependTo('.header__content-top');

	        	if($('body').hasClass('index-page') || $('body').hasClass('wholesale-catalog-page')) {
					$('.header__right').appendTo('.header__content-top');
				}

				$('#hamburger').click(function() {
					$('body').addClass('modal-open');
					$.each(['shadowMenu', 'mobMenu'],function(index, value) {
						$('#' + value).addClass('opened');
					})
				});

				$('#closeMobMenu').click(function(e) {
					e.preventDefault();
					$('body').removeClass('modal-open');
					$.each(['shadowMenu', 'mobMenu'],function(index, value) {
						$('#' + value).removeClass('opened');
					})
				});

	        }
	        else {
				$('.header__categories').prependTo('.header__content-bottom');
				$('.header__nav').prependTo('.header__content-top');
				
				$('#searchInput').appendTo('.header__content-bottom');

				if($('body').hasClass('index-page') || $('body').hasClass('wholesale-catalog-page')) {
					$('.header__right').appendTo('.header__content-bottom');
				}
	        }
	    }
	});
	$(function mobileMenuMobile() {
		if(matchMedia) {
	        var screen = window.matchMedia('(max-width: 767px)');
	        screen.addListener(changes);
	        changes(screen);
	    }
	    function changes(screen) {
	    	var login = $('#headerLogin'),
        	fav = $('#headerFav');
	        if(screen.matches) {
	        	$('.header__content-top').addClass('clearfix');
	        	$('#searchInput').appendTo('.header__content-bottom');
	        	var mobMenu = $('#mobMenu > .header__mob-menu-inner');

	        	login.appendTo(mobMenu.find('.header__mob-menu-list'));
	        	fav.appendTo(mobMenu.find('.header__mob-menu-list'));
	        }
	        else {
	        	$('.header__content-top').removeClass('clearfix');
	        	$('#searchInput').prependTo('.header__content-top');
	        	
	        	login.insertBefore('#headerCart');
	        	fav.insertBefore('#headerCart');
	        }
	    }
	});
	$(function () {
		if(matchMedia) {
	        var screen = window.matchMedia('(min-width: 992px)');
	        screen.addListener(changes);
	        changes(screen);
	    }
	    function changes(screen) {
	        if(screen.matches) {
	        	$('.header__mob-menu').detach();
	        	$('#searchInput').appendTo('.header__content-bottom');
	        }
	        else {

	        }
	    }
	})
});

//ACCORDIONS

 $(function mainAcc() {
 	var acc = [
 		'.banner-text__title',
 		'.catalog__banner-title', 
 		'.catalog-item__banner-title',
 		'.account__nav-title'
 	];
	$.each(acc, function(index, value) {
 		$(value).on("click", function() {
		  	if(screen.width < 768) {
				$(this).toggleClass("active");
			 	var panel = $(this).siblings();
			    if(panel.height() > 0) {
					panel.attr('style', '');
			    }
			    else {;
					var h = panel.prop('scrollHeight');
					panel.css('max-height', h + 'px');
			    }
			}
	  	});
	})
});

//ACCORDION DELIVERY ADDRESS
$(function deliveryAddressAcc() {
	var acc = $('.account__delivery-address-title');
	acc.on('click', function() {
		var panel = $(this).siblings();
	    if(!$(this).hasClass('active')) {
	    	acc.removeClass('active').siblings().css('max-height', '0');;
			$(this).addClass("active");
			// panel.style.maxHeight = panel.scrollHeight + "px";
			var h = panel.prop('scrollHeight');
			panel.css('max-height', h + 'px');
	    }
	    else {
			$(this).removeClass("active").siblings().css('maxHeight', '0');
	    }
	});
});

//LOADER
$(document).ready(function() {
	setTimeout(function(){
		$('.loader').hide();
	}, 0)
})