$(document).ready(function() {
  // Fake data taken from initial-tweets.json
  const tweetData = [
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
        "text": "Je pense, donc je suis"
      },
      "created_at": 1461113959088
    }
  ];

  const createTweetElement = function(tweetData) {
  // Extract the necessary data from the tweetData object
    const { user, content, created_at } = tweetData;

    // Create the HTML structure for the tweet using template literals
    let $tweet = $(`
    <article class="tweet">
      <header>
        <div class="user-info">
          <img src="${user.avatars}" alt="User Avatar">
          <h3 class="user-name">${user.name}</h3>
        </div>
        <span class="user-handle">${user.handle}</span>
      </header>
      <div class="tweet-content">
        <p>${content.text}</p>
      </div>
      <footer>
        <span class="tweet-timestamp">${timeago.format(created_at)}</span>
        <div class="tweet-actions">
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </div>
      </footer>
    </article>
  `);

    // Return the created tweet element
    return $tweet;
  };

  const renderTweets = function(tweetArray) {
    // Clear the existing tweets in the container
    $('#tweets-container').empty();

    // Iterate over the tweetArray and append each tweet to the container
    tweetArray.forEach(tweetData => {
      $tweet = createTweetElement(tweetData);
      $('#tweets-container').append($tweet);
    });
  }

  renderTweets(tweetData);
  $("#tweets-container").append($tweet);

  // Add event listener for form submit
  $('#your-form-id').on('submit', function(event) {
    event.preventDefault(); // Prevent default form submission behavior

    // Serialize the form data to a query string
    const formData = $(this).serialize();

    // Send an AJAX POST request to the server
    $.ajax({
      method: 'POST',
      url: '/tweets', // Replace with the actual server endpoint URL
      data: formData
    })
      .done(function(response) {
      // Handle the success response from the server
        console.log(response);
      // Update the UI or perform any other actions
      })
      .fail(function(error) {
      // Handle the error response from the server
        console.error(error);
      // Display an error message or perform error handling
      });
  });

});