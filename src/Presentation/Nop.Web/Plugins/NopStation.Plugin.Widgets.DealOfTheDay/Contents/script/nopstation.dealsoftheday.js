var DealOfTheDay = {
  dealofthedaydetailsurl: '',
  containerselector: '',
  loaderselector: '',
  loadwait: true,
  localized_data: false,

  init: function (dealofthedaydetailsurl, containerselector, loaderselector, localized_data) {
    this.dealofthedaydetailsurl = dealofthedaydetailsurl;
    this.containerselector = containerselector;
    this.loaderselector = loaderselector;
    this.localized_data = localized_data;
    this.loadwait = true;

    DealOfTheDay.check_carousels();

    $(window).scroll(function () {
      if (!DealOfTheDay.loadwait) {
        DealOfTheDay.check_carousels();
      }
    });
  },

  check_carousels: function () {
    $(DealOfTheDay.containerselector + '[data-loaded!="true"]').each(function () {
      var elem = $(this);
      if (DealOfTheDay.chek_element_on_screen(elem)) {
        if (!elem.data('loading')) {
          elem.attr('data-loading', true);
          var dealOfTheDayId = elem.data('dealofthedayid');
          DealOfTheDay.load_dealoftheday_details(dealOfTheDayId);
        }
      }
    })

    DealOfTheDay.loadwait = false;
  },

  chek_element_on_screen: function (elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = elem.offset().top;
    var elemBottom = elemTop + elem.height();

    return ((elemBottom <= docViewBottom && elemBottom >= docViewTop) || (elemTop <= docViewBottom && elemTop >= docViewTop));
  },

  load_dealoftheday_details: function (dealOfTheDayId) {
    $.ajax({
      cache: false,
      type: 'POST',
      data: { dealOfTheDayId: dealOfTheDayId },
      url: DealOfTheDay.dealofthedaydetailsurl,
      success: function (response) {
        var currentElem = $(DealOfTheDay.containerselector + '[data-dealofthedayid="' + dealOfTheDayId + '"]');
        if (response.result) {
          currentElem.html(response.html);
        }
        else {
          currentElem.html(DealOfTheDay.localized_data.CarouselFailure);
        }
        currentElem.attr('data-loaded', true);
        currentElem.removeClass('dealoftheday-container');
        currentElem.removeAttr('data-loading');
      },
      error: DealOfTheDay.ajaxFailure
    });
  },

  ajaxFailure: function () {
    $(DealOfTheDay.containerselector).html(DealOfTheDay.localized_data.CarouselFailure);
  }
};