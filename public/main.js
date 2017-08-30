window.elementMain = ['trang__chu', 'trung__thu__xua', 'san__pham', 'dat__mua', 'lien__he'];
window.elementUrl = ['trang-chu', 'trung-thu-xua', 'san-pham', 'dat-mua', 'lien-he'];

$(window).on('load', function() {
	if (window.location.href.indexOf('trung-thu-xua') !== -1) {
		$('.trung-thu-xua').parent().addClass('active');
		$('.trung__thu__xua').removeClass('opacity-0');
	} else if (window.location.href.indexOf('san-pham') !== -1) {
		$('.san-pham').parent().addClass('active');
		$('.san__pham').removeClass('opacity-0');
	} else if (window.location.href.indexOf('dat-mua') !== -1) {
		$('.dat-mua').parent().addClass('active');
		$('.dat__mua').removeClass('opacity-0');
	} else if (window.location.href.indexOf('lien-he') !== -1) {
		$('.lien-he').parent().addClass('active');
		$('.lien__he').removeClass('opacity-0');
	} else {
		$('.trang-chu').parent().addClass('active');
		$('.trang__chu').removeClass('opacity-0');
	}

	document.addEventListener("mousewheel", MouseWheelHandler(), false);
    document.addEventListener("DOMMouseScroll", MouseWheelHandler(), false);

	// if (window.screen.width > window.screen.height) {
	// 	$('.content>div').css({
	// 		'background-image': 'url(images/background.png)'
	// 	});
	// }
});



var timer;

function MouseWheelHandler() {
	return function (e) {
		// cross-browser wheel delta
		var e = window.event || e;
		var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));

		if ( timer ) clearTimeout(timer);

		timer = setTimeout(function(){

			//scrolling down?
			if (delta < 0) {
				actionOpacityWhenScroll(1);
			}
			//scrolling up?
			else {
				actionOpacityWhenScroll(-1);
			}
		}, 200);
		return false;
	}
}

function actionOpacityWhenScroll(next) {
	var indexChange = -1;
	for (var i = 0; i < window.elementMain.length; i++) {
		if (!$('.' + window.elementMain[i]).hasClass('opacity-0')) {
			switch (next) {
				case -1:
					if (i === 0) {
						indexChange = window.elementMain.length - 1;
					} else {
						indexChange = i + next
					}
					break;
				case 1:
					if (i === window.elementMain.length - 1) {
						indexChange = 0;
					} else {
						indexChange = i + next
					}
					break;
			}
			$('.' + window.elementMain[i]).addClass('opacity-0');
			$('.' + window.elementMain[indexChange]).removeClass('opacity-0');
			window.history.pushState("", "", '/#' + window.elementUrl[indexChange]);
			$($('.menu-main-desktop ul li')[i]).removeClass('active');
			$($('.menu-main-desktop ul li')[indexChange]).addClass('active');
			$($('.menu ul li')[i]).removeClass('active');
			$($('.menu ul li')[indexChange]).addClass('active');

			break;
		}
	}
}

function actionOpacityElement(_this) {

	$('.navbar-nav li').each(function() {
		$(this).removeClass('active');
	});
	$(_this).parent().addClass('active');
	for (var i = 0; i < window.elementMain.length; i++) {
		if ($(_this).attr('data-target') !== window.elementMain[i]) {
			$('.' + window.elementMain[i]).addClass('opacity-0');
		} else {
			$('.' + window.elementMain[i]).removeClass('opacity-0');
		}
	}
}

$('.dat-mua-button').click(function() {
	actionOpacityElement(this);
	$('.dat-mua').parent().addClass('active');
});
$('.trang-chu').click(function() {
	$('.navbar-toggler').click();
	actionOpacityElement(this);
});


$('.trung-thu-xua').click(function() {
	$('.navbar-toggler').click();
	actionOpacityElement(this);
});

$('.san-pham').click(function() {
	$('.navbar-toggler').click();
	actionOpacityElement(this);
});

$('.dat-mua').click(function() {
	$('.navbar-toggler').click();
	actionOpacityElement(this);
});

$('.lien-he').click(function() {
	$('.navbar-toggler').click();
	actionOpacityElement(this);
});

$('#js-option-1').change(function() {
	getTotalPrice();
})

$('#js-option-2').change(function() {
	getTotalPrice();
})

$('#js-option-3').change(function() {
	getTotalPrice();
})

function getTotalPrice() {
	var quantity = parseInt($('#js-option-1').val(), 10) + parseInt($('#js-option-2').val(), 10) + parseInt($('#js-option-3').val(), 10);
	$('.custom-input-total p').html(quantity * 249000 + ' đ');
}

$('#js-form-dat-mua').submit(function(event) {
	event.preventDefault();
	var quantity = parseInt($('#js-option-1').val(), 10) + parseInt($('#js-option-2').val(), 10) + parseInt($('#js-option-3').val(), 10);
	if (quantity > 0) {
		$('.dat__mua__detail__form__submit').addClass('opacity-0');
		var data = $(this).serializeArray().reduce(function(obj, item) {
			obj[item.name] = item.value;
			return obj;
		}, {});

	} else {
		alert('Vui lòng chọn ít nhất 1 nhân bánh')
	}
});


