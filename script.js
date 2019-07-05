// This is a fix for anchor link offset caused by fixed header

let sectionId;

$('.nav-link').click(function() {
  sectionId = $(this).attr('href');
  $('html, body').animate({
    scrollTop: $(sectionId).offset().top - 20
  }, 100);
});
