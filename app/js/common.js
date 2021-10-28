$(function() {

//svg to img
    $('img.i-svg').each(function () {
        var $img = $(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        $.get(imgURL, function (data) {
            // Get the SVG tag, ignore the rest
            var $svg = $(data).find('svg');

            // Add replaced image's ID to the new SVG
            if (typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if (typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass + ' replaced-svg');
            }

            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');

            // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
            if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
            }
            // Replace image with new SVG
            $img.replaceWith($svg);
        }, 'xml');
    });

//Sliders

    $(".discount-slider, .seeds-slider, .buy-now-slider, .fertilizers-slider").owlCarousel({
        nav: true,
        loop: true,
        items: 3,
        margin: 150,
        stagePadding: 15,
        dots: true,
        dotsEach: true,
        pagination: true,
        mouseDrag: false,
        touchDrag: true,
        pullDrag: false,
        onChanged: changeSlide,
        responsiveClass:true,
        responsive: {
            0: {
                margin: 150,
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            },
        }
    });

    $(".production-slider").owlCarousel({
        nav: true,
        loop: true,
        items: 1,
        margin: 150,
        stagePadding: 0,
        dots: true,
        dotsEach: true,
        pagination: true,
        mouseDrag: false,
        touchDrag: true,
        pullDrag: false,
        onChanged: changeSlide
    });

    function changeSlide(){

    }

//header-menu
    $('.menu-open').on('click', function() {
        $(this).parents('.header').find('.wrapper').toggleClass('active');
    });

//закрытие селекта при клике не на нём
    $(document).click(function (e) { // событие клика по веб-документу
        var div = $('.header-menu, .menu-open, .select-header, .lk-menu_nav');
        if (!div.is(e.target) // если клик был не по нашему блоку
            &&
            div.has(e.target).length === 0 // и не по его дочерним элементам
        ) {
            div.parents('.wrapper', '.select').removeClass('active');
        }
    });

// input с изменением количества
    $(document).on('keyup input', 'input.type_num', function () {
        var inputVal = $(this).val().replace(/\D/g, '');
        if (inputVal.length > 1)
            inputVal = inputVal.replace(/^0/, '');
        $(this).val(inputVal);
    });

// Кнопки количества + -
    $('.product-qty_btn').on('click', function () {
        var container = $(this).parents('.product-qty_block');
        var is_plus = $(this).hasClass('prod-qty_plus');
        var input = container.find('input');
        var value = input.val() * 1;
        if (is_plus) {
            if (value >= 999) input.val(999);
            else input.val(value + 1);
        }else {
            if (value >= 1)input.val(value - 1);
        }
    });

    $('.filter-block_heading').on('click', function () {
        $(this).parents('.filter_block').find('.filter_list').toggleClass('active')

    });

    $('.cart-prod_menu').on('click', function () {
        $(this).parents('.cart-product').find('.popover_wrapper').toggleClass('active')
    });

//открывающиеся формы заказа
    $('.form-heading').on('click', function() {
       $(this).parents('.form-block').find('.form_inputs').toggleClass('active')
       $(this).parents('.form-block').find('.arrow-open').toggleClass('active')
    });
//категория каталога все подкатегории
    $('.subcat-open_btn').on('click', function() {
        $(this).parents('.catalog-cat-sect').find('.subcat-cards-wrapper').toggleClass('active')
    });

//селект
    $('.select-header').on('click', function () {
        $('.select').parents('.form_inputs').find('.select').removeClass('active')
        $(this).parents('.form_inputs').find('.select').addClass('active')
    });

    $('.select_options').on('click', function() {
        //определяем переменные
        var container = $(this).parents('.select');//контейнер
        var text = $(this).find('span').text();//текст эл-та
        var value = $(this).attr('data-value');//значение в атрибуте
        var input = container.find('input[type=hidden]');//скрытый инпут, в который передается значение
        var header = container.find('.select-header span.select-current');//сюда будет передано имя из списка

        header.text(text);//вставляем в текст переменной header контент переменной text
        input.value(value);//ставляем в значение инпута значение переменной value
    });

// активная ссылка
    $('.menu-left_item').each(function () {
        if(this.href === location.href) // адрес ссылки совпадает с текущим
            $(this).parents('.link-block').addClass('active');
    });

// яндекс-карта
    ymaps.ready(init);
    function init(){
        var myMap = new ymaps.Map("map", {
            center: [55.725060, 37.614179],
            controls: [],
            zoom: 12
        });

        var myGeoObject = new ymaps.GeoObject({
            geometry: {
                type: "Point",
            }
        });

        var myPlacemark = new ymaps.Placemark([55.701699, 37.604044], {}, {
            iconLayout: 'default#image',
            iconImageHref: 'img/contacts-page/cart.svg'
        });

        myMap.geoObjects.add(myPlacemark);
    }

//
    $('.filter-btn').on('click', function () {
        var btn = $(this);
        btn.parents('.catalog-category_block').find('form').toggleClass('active');

//меняем текст кнопки
        btn.parents('.catalog-category_block').find(btn).toggleClass('active');
        if (btn.hasClass('active'))
            btn.text('Скрыть фильтры');
        else
            btn.text('Фильтры');
    });

    $('.delivery-btn').on('click', function () {
        $(this).parents('.order-status-condition').find('.order-status_block').toggleClass('active');
        $(this).parents('.order-status-condition').find('.delivery-btn').toggleClass('active');
    });

//меню личного кабинета мобильная версия
    $('.menu-mobile_header').on('click', function () {
        var parents = $(this).parents('.lk-section, .tester-mobile-menu, .lk-partner-section, .lk-worker-section, .lk-member-section')
        parents.find('.wrapper').toggleClass('active');
    });

    $('.popup-with-form').magnificPopup({
        type: 'inline',
        preloader: false,
        showCloseBtn: false,
        fixedBgPos: true,
    });

//комментарий работника на отзыв
    $('.cancel-button').on('click', function () {
        $(this).parents('.review-block-answer').find('.review-answer-form').toggleClass('active');
    });

    $('.answer-button').on('click', function () {
        $(this).parents('.review-comment').find('.review-answer-form').toggleClass('active');
    });

    $('.your-order-open').on('click', function () {
        $(this).parents('.your-order-section').find('.your-order-block').toggleClass('active');
        $(this).parents('.your-order-section').find('.your-order-open').toggleClass('active');
    });

//селект в tester-reviews
    $('.select-header').on('click', function () {
        $(this).parents('.form_inputs').find('.select-reviews').toggleClass('active');
        $(this).parents('.form_inputs').find('.select-open').toggleClass('active');
    });

//адаптивные новости

    // var resizeWindow = function() {
    //     console.log('width: ', $(window).width());
    // };
    var movingCards = window.addEventListener('resize', function() {
        var win = $(this);
        var movableCard = $('.movable-card');
        var topBlock = $('.top-news');
        var bottomBlock = $('.bottom-news');

        if (win.outerWidth() < 992 && movableCard.parent(topBlock)) {
            movableCard.prependTo(bottomBlock);
        } else if (win.outerWidth() >= 992 && movableCard.parent(bottomBlock)){
            movableCard.appendTo(topBlock);
        }


        console.log(movableCard.parent());
        console.log(win.outerWidth());
    });

    var movingCardsThrottling = _.throttle(movingCards, 500);
    $(window).on('resize', movingCardsThrottling);

    // var movingCards = function () {
    // };

    // var resizeWindow = function() {
    //     console.log('width: ', $(window).width());
    // }
    // var resizeWindowThrottled = throttle(resizeWindow, 500)
    //
    // $(window).on('resize', resizeWindowThrottled);
    // console.log(resizeWindowThrottled);
//     var windowResize = throttle();
//         window.addEventListener('resize', windowResize(arg, 300) {
//             var win = $(this);
//             var movableCard = $('.movable-cards');
//             var topBlock = $('.movable-card-top');
//             var bottomBlock = $('.movable-card-bottom');
//
//             if (win.width() <= 992) {
//                 bottomBlock.prepend(movableCard);
//             } else {
//                 topBlock.append(movableCard);
//             }
//             console.log(movableCard.parent());
//         });


    //


    //  new ElShift(newsBlock, {
    //     initialPosition: initialPosition,
    //     targetPosition: targetPosition,
    //     breakpoint: 992,
    //     onShift: function (instance) {
    //         if (instance.currentPosition === instance.initialPosition) {
    //             instance.initialPosition.classList.remove('d-none');
    //             instance.targetPosition.classList.add('d-none');
    //         } else if (instance.currentPosition === instance.targetPosition) {
    //             instance.initialPosition.classList.add('d-none');
    //             instance.targetPosition.classList.remove('d-none');
    //         }
    //     }
    // });

    //function throttle(movingCards, timeout){
        //window.addEventListener('resize', handleResize);
    //var handleResize = throttle(checkMenuSliderOverflow, 0);

});
