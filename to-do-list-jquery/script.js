$(function() {

  $('.button').click(function() {
    let toAdd = $('input[name="listItem"]').val();
    // If nothing in input box, ceases function execution
    if (toAdd === '') return;
    // Inserts li as first child of ul
    $('ul').prepend('<li>' + toAdd + '</li>');
    // Clears input box after clicking '+'
    $('input[name="listItem"]').val('');
  });

  // Upon hitting enter, triggers button click and prevents page from refreshing
  $('input[name="listItem"]').keypress(function(e) {
    if (e.which == 13) {
      $('.button').click();
      e.preventDefault();
    };
  });

  $('ul').on('click', 'li', function() {
    // Upon list item click, toggleClass() adds class 'strike' for it and fadeOut() completely hides it
    $(this).toggleClass('strike').fadeOut('slow');
  });

  // Enables drag reordering of list items (uses linked jQuery UI library)
  $('.sortable').sortable();

});
