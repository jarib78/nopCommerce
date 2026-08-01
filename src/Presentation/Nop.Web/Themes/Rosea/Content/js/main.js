(function ($) {
  "use strict";

  $(window).on('load', function () { // makes sure the whole site is loaded 
    $('#status').fadeOut(); // will first fade out the loading animation 
    $('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website. 
    $('body').delay(350).css({ 'overflow': 'visible' });
  })


  $('.related-products-grid .item-grid,.also-purchased-products-grid .item-grid').owlCarousel({
    items: 4,
    margin: 14,
    loop: true,
    navText: ['prev', 'next'],
    autoplay: true,
    autoplayTimeout: 8000,
    nav: true,
    responsive: {
      0: {
        items: 1
      },
      576: {
        items: 2
      },
      768: {
        items: 3
      },
      1200: {
        items: 3
      },
      1300: {
        items: 4
      },
      1400: {
        items: 4
      }

    }
  });


  //scroll to top
  $(window).scroll(function () {
    if ($(this).scrollTop() > 500) {
      $('.scrollup').fadeIn().css({ "display": "flex" });
    } else {
      $('.scrollup').fadeOut().css({ "display": "none" });
    }
  });
  $('.scrollup').click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1000);
    return false;
  });

  //dynamic margin for main wrapper content
  var header_height = $('#global-header').outerHeight();
  $('.master-wrapper-content').css({ "margin-top": header_height + "px" });
  
  //header scroll 
  var prevScrollpos = window.pageYOffset;
  window.onscroll = function () {
    var currentScrollPos = window.pageYOffset;
    if (currentScrollPos < 200 || prevScrollpos > currentScrollPos) {
      document.getElementById("global-header").style.top = "0";
      //var header_height = $('#global-header').outerHeight();
      //$('.master-wrapper-content').css({ "margin-top": header_height + "px" });
    } else {
      document.getElementById("global-header").style.top = "-100%";
      //var header_height = $('#global-header').outerHeight();
      //$('.master-wrapper-content').css({ "margin-top": header_height + "px" });
    }
    prevScrollpos = currentScrollPos;
  }

  //sidebar accordion
  $('.block .title').on('click', function () {
    var e = window,
      a = 'inner';
    if (!('innerWidth' in window)) {
      a = 'client';
      e = document.documentElement || document.body;
    }
    var result = {
      width: e[a + 'Width'],
      height: e[a + 'Height']
    };
    $(this).siblings('.listbox').slideToggle('slow');
    $(this).toggleClass('list-open');
  });

  //mobile-footer
  $('.footer-block .title').on('click', function () {
    var e = window,
      a = 'inner';
    if (!('innerWidth' in window)) {
      a = 'client';
      e = document.documentElement || document.body;
    }
    var result = {
      width: e[a + 'Width'],
      height: e[a + 'Height']
    };
    if (result.width < 992) {
      $(this).siblings('.list').slideToggle('slow');
    }
    $(this).toggleClass('list-open');
  });

}(jQuery));