// This is a fix for anchor link offset caused by fixed header. Only applies for mobile since header otherwise hidden

let sectionId;

// .attr returns value of attribute
// e.currentTarget needed for this to work with chevron icon since it's inside an a element, whereas e.Target worked fine with .nav-link. This is because currentTarget refers to the element the event listener is directly attached to--in this case the a element, whereas with e.target, it would be the i element that triggered the event/on which event originally occurred (before it bubbled up), which doesn't have an href element (so attr would return undefined)

$(function() {
  $(window).on('resize', function(e) {
    checkScreenSize();
  });

  checkScreenSize();

  function checkScreenSize() {
    var newWindowWidth = $(window).width();
    if (newWindowWidth < 480) {
      $('.nav-link, .chevron').click(e => {
        sectionId = $(e.currentTarget).attr('href');
        $('html, body').animate(
          {
            scrollTop: $(sectionId).offset().top - 30
          },
          100
        );
      });
    }
  }
});

$(window).resize(function() {
  $('.nav-link, .chevron').click(e => {
    sectionId = $(e.currentTarget).attr('href');
    $('html, body').animate(
      {
        scrollTop: $(sectionId).offset().top - 30
      },
      100
    );
  });
});

$(document).on('scroll', function() {
  const wHeight = window.innerHeight;
  // As of 2019 scrollY not supported by IE, but pageYOffset is supported by all browsers
  const yScroll = window.scrollY || window.pageYOffset;

  const elementPosition = $('.portrait').offset().top;

  if (wHeight + yScroll > elementPosition + $('.portrait').height()) {
    $('.portrait').addClass('fadeInUp');
  }
});
