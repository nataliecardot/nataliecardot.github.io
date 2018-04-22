$(function() {

  let degree = 90;

  // Rotates '+' and drops down or recloses input box on click
  $('.fa-plus').on('click', function() {
    if (degree === 135) {
      degree = 45;
    }
    // Sets CSS transform properties. Selector 'this' refers to '+' (with class '.fa-plus') being clicked
    $(this).css({
      '-webkit-transform': 'rotate(' + degree + 'deg)',
      '-moz-transform': 'rotate(' + degree + 'deg)',
      '-ms-transform': 'rotate(' + degree + 'deg)',
      '-o-transform': 'rotate(' + degree + 'deg)',
      'transform': 'rotate(' + degree + 'deg)',
      'transition': '0.2s linear'
    });
    degree += 45;
    // Animates opacity of text box, setting its display style property to none once its opacity reaches 0 if it's visible, or the inverse if already hidden
    $('input[type="text"]').fadeToggle();
  });

  // Upon clicking on list items, adds to class 'completed' (CSS adds strike-through for class)
  $('ul').on('click', 'li', function() {
    $(this).toggleClass('completed');
  });

  // Click to delete
  $('ul').on('click', 'span', function(e) {
    // fadeOut() hides element by setting it to transparent
    $(this).parent().fadeOut(500, function() {
      // Removes element along with its data and events
      $(this).remove();
    });
    // Prevents event from bubbling up DOM tree, notifying any parent handlers of it
    e.stopPropagation();
  });

  $('input[type="text"]').on('keypress', function(e) {
    // If user hits enter...
    if (e.which === 13) {
      // Grabs new to-do list item from input
      let itemText = $(this).val();
      // If nothing in input box, ceases function execution
      if (itemText === '') return;
      // Clears input box
      $(this).val('');
      // Creates new li from input and adds to beginning of ul
      $('ul').prepend('<li><span><i class="fa fa-trash"></i></span> ' + itemText + '</li>');
    }
  });

  // Enables drag reordering of list items (uses linked jQuery UI library)
  $('.sortable').sortable();
  
});
