$(document).ready(function() {
  // Sample tweet data
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // Function to create the HTML structure for a tweet
  const createTweetElement = (tweetData) => {
    const tweetHTML = `
      <article class="tweetContainer">
        <header class="tweetHeader">
          <div class="tweetUser">
            <img class="tweetAvatar" src="${escape(tweetData.user.avatars)}" alt="User Avatar">
            <span class="tweetName">${escape(tweetData.user.name)}</span>
          </div>
          <span class="tweetHandle">${escape(tweetData.user.handle)}</span>
        </header>
        <div class="tweet">
          <p>${escape(tweetData.content.text)}</p>
        </div>
        <footer class="tweetFooter">
          <span class="tweetTime">${timeago.format(tweetData.created_at)}</span>
          <div class="tweetIcons">
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </div>
        </footer>
      </article>`;
    return tweetHTML;
  };

  // Function to render an array of tweets to the DOM
  const renderTweets = function(tweets) {
    $('.tweets').empty();
    for (tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('.tweets').prepend($tweet);
    }
  };

  // Function to fetch tweets from the server using AJAX
  const loadTweets = function() {
    $.ajax({
      type: 'GET',
      url: '/tweets',
      dataType: 'json',
      success: function(data) {
        console.log('Tweets successfully loaded!', data);
        renderTweets(data);
      },
      error: function(error) {
        console.error('Error loading tweets:', error);
      }
    });
  };

  loadTweets();

  // Function to handle form submission when the user creates a new tweet
  const handleFormSubmit = function (event) {
    event.preventDefault();
  
    const formData = $(this).serialize();
    const tweetText = $(this).find('#tweet-text').val();
    const $errorMessage = $('.error-message');
  
    // Hide the error element before validation
    $errorMessage.slideUp();
  
    // Perform validation checks
    if (tweetText.trim() === '' || tweetText.trim() === null) {
      $errorMessage.html('<i class="fa-solid fa-triangle-exclamation" style="color: #ff0000;"></i> Error: Tweet cannot be empty.'); // Insert error message with icon
      $errorMessage.slideDown();
      return;
    }
  
    if (tweetText.length > 140) {
      $errorMessage.html('<i class="fa-solid fa-triangle-exclamation" style="color: #ff0000;"></i> Error: Tweet cannot exceed 140 characters.'); // Insert error message with icon
      $errorMessage.slideDown();
      return;
    }
  
    // If validation passes, send the form data using AJAX
    $.ajax({
      type: 'POST',
      url: '/tweets',
      data: formData,
      success: function (response) {
        console.log('Tweet successfully submitted!');
        console.log(response);
        $('#tweet-text').val('');
        loadTweets();
      },
      error: function (error) {
        console.error('Error submitting tweet:', error);
      }
    });
  };

  // Add the event listener to the tweet form
  $('#tweet-form').submit(handleFormSubmit);
});