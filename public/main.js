window.elementMain = ['trang__chu', 'trung__thu__xua', 'san__pham', 'dat__mua', 'lien__he'];

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

	if (window.screen.width > window.screen.height) {
		$('.content>div').css({
			'background-image': 'url(images/background.png)'
		});
	}
});

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
	console.log(quantity);
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

		console.log(data);
	} else {
		alert('Vui lòng chọn ít nhất 1 nhân bánh')
	}
});
