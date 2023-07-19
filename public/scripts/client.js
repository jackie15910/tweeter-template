$(document).ready(function() {
  // Function to format the time since a tweet was created

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

  // Function to create the HTML structure for a tweet
  const createTweetElement = (tweetData) => {
    const tweetHTML = 
      `<article class="tweetContainer">
        <header class="tweetHeader">
          <div class="tweetUser">
            <img class="tweetAvatar" src="${tweetData.user.avatars}" alt="User Avatar">
            <span class="tweetName">${tweetData.user.name}</span>
          </div>
          <span class="tweetHandle">${tweetData.user.handle}</span>
        </header>
        <div class="tweet">
          <p>${tweetData.content.text}</p>
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
    // Return the HTML structure
    return tweetHTML;
  };

  // Function to render an array of tweets to the DOM
  const renderTweets = function(tweets) {
    for (tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('.tweets').append($tweet);
    }
  };

  // Function to fetch tweets from the server using AJAX
  const loadTweets = function() {
    $.ajax({
      type: 'GET',
      url: '/tweets', // The URL to fetch tweets from
      dataType: 'json', // The data type you expect to receive (JSON in this case)
      success: function(data) {
        console.log('Tweets successfully loaded!', data);
        renderTweets(data); // Callback the renderTweets function with the response data
      },
      error: function(error) {
        console.error('Error loading tweets:', error);
      }
    });
  };

  // Call the loadTweets function to fetch tweets when the document is ready
  loadTweets();

  // Function to handle form submission when the user creates a new tweet
  const handleFormSubmit = function(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    const formData = $(this).serialize(); // Serialize the form data to a query string
    const tweetText = $(this).find('#tweet-text').val(); // Get the tweet text

    // Perform validation checks
    if (tweetText.trim() === '' || tweetText.trim() === null) { // If the tweet text is empty or contains only whitespaces
      alert('Error: Tweet cannot be empty.');
      return; // Exit the function without submitting the form
    }

    if (tweetText.length > 140) { // If the tweet exceeds the character limit
      alert('Error: Tweet cannot exceed 140 characters.');
      return; // Exit the function without submitting the form
    }

    // If validation passes, send the form data using AJAX
    $.ajax({
      type: 'POST',
      url: '/tweets', // The URL where you want to send the data
      data: formData,
      success: function(response) {
        console.log('Tweet successfully submitted!');
        console.log(response); // The response from the server
        // You may choose to update the UI with the new tweet here if needed
      },
      error: function(error) {
        console.error('Error submitting tweet:', error);
      }
    });
  };

  // Add the event listener to the tweet form
  $('#tweet-form').submit(handleFormSubmit);
});