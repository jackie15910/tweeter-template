$(document).ready(function() { //Checks if DOM is ready
  $('textarea').on('input', function() { //Declares action when typing into the text-box
    var $textarea = $(this); //gives a name variable for 'this' jquery
    var tweetLength = $textarea.val().length; //Counts the text-box characters
    var remainingCharacters = 140 - tweetLength; //subtracts from character counter
    var $counter = $textarea.closest('.new-tweet').find('.counter'); //Finds the character counter
    $counter.text(remainingCharacters); //Updates it with new value

    if (remainingCharacters < 0) {
      $counter.css('color', 'red'); // Change the color to red
    } else {
      $counter.css('color', ''); // Reset the color to its default (CSS-defined) value
    }
  });
});