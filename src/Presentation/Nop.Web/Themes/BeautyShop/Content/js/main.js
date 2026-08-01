(function ($) {
  "use strict";

  $(document).ready(function ($) {
    mobileFooterCard();
    mobileSearchbox();
    var homepage = $('html').hasClass("html-home-page");
    var headerAdmin = $(".admin-header-links").height();

    $('.product-details-page .also-purchased-products-grid .item-grid, .product-details-page .related-products-grid .item-grid').addClass("ocarousel owl-carousel");
    $('.product-details-page .also-purchased-products-grid .item-grid, .product-details-page .related-products-grid .item-grid').owlCarousel({
      items: 5,
      loop: true,
      autoplay: true,
      autoplayTimeout: 8000,
      nav: true,
      responsive: {
        0: {
          items: 2
        },
        450: {
          items: 2
        },
        768: {
          items: 3
        },
        1200: {
          items: 4
        },
        1600: {
          items: 5
        }
      }
    });

    // Calculate header height
    function headerHeight() {
      var headerNav = $(".header").height();
      if (headerAdmin) {
        var headerTotal = ((headerAdmin + headerNav) + 22);
      } else {
        var headerTotal = headerNav;
      }
      return headerTotal;
    }

    // Product filter sidebar
    $('.filter-toggler').on('click', function () {
      $('.product-filters').show("slide", { direction: "left" }, 300);
    });
    $('.fiters-flyout-title > i').on('click', function () {
      $('.product-filters').hide("slide", { direction: "left" }, 300);
    });
    $('.search-toggle-button').on('click', function () {
      $('#small-search-box-form').toggleClass('show')
      $('.search-toggle-button').toggleClass('open')

    })
  });


  var windowHorizontalWidth = $(window).width();
  $(window).on("resize", function () {
    if ($(window).width() != windowHorizontalWidth) {
      mobileSearchbox();
      windowHorizontalWidth = $(window).width();
    }
    mobileFooterCard();
  });


  function mobileFooterCard() {
    if ($(window).width() < 769) {
      $('.footer-supported-card').appendTo('.footer-upper');
      $('.footer-follow-us').appendTo('.footer-upper');
    }

    else {
      $('.footer-supported-card').appendTo('.footer-block.find-us');
      $('.footer-follow-us').appendTo('.footer-block.find-us');
    }
  }

  // top search box for mobile
  function mobileSearchbox() {
    if ($(window).width() < 992) {
      $('#small-search-box-form').appendTo('.header-mobile-search');
    }

    else {
      $('#small-search-box-form').appendTo('.header-lower');
    }
  }

  function filterResponsie() {
    if ($(window).width() < 769) {
      $(".side-filter .column-wrapper > .side-2").appendTo("body");
    } else {
      $(".side-filter body > .side-2").appendTo(".column-wrapper")
    }
  }

  $(document).ready(function () {
    filterResponsie()
  })

  $(window).on("load resize", function () {
    filterResponsie()
  })

}(jQuery));


// top wishlist item update, overriding pablic ajaxcart

function wishlistUpdate(urladd) {
  AjaxCart.setLoadWaiting(true);
  $.ajax({
    cache: false,
    url: urladd,
    type: "POST",
    success: function wishlistResult(response) {
      if (response.updatetopwishlistsectionhtml) {
        $('.wishlist-qty').html(response.updatetopwishlistsectionhtml);
      }

      if (response.message) {
        //display notification
        if (response.success === true) {
          //success
          if (AjaxCart.usepopupnotifications === true) {
            displayPopupNotification(response.message, 'success', true);
          }
          else {
            //specify timeout for success messages
            displayBarNotification(response.message, 'success', 3500);
          }
        }
        else {
          //error
          if (AjaxCart.usepopupnotifications === true) {
            displayPopupNotification(response.message, 'error', true);
          }
          else {
            //no timeout for errors
            displayBarNotification(response.message, 'error', 0);
          }
        }
        return false;
      }
      if (response.redirect) {
        location.href = response.redirect;
        return true;
      }
      return false;
    },
    complete: AjaxCart.resetLoadWaiting,
    error: AjaxCart.ajaxFailure
  });
}

