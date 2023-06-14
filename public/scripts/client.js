$(document).ready(function() {

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

  const loadTweets = () => {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      dataType: 'json',
      success: (tweets) => {
        renderTweets(tweets);
      },
      error: (error) => {
        console.error(error);
      }
    });
  };

  loadTweets();

  // Add event listener for form submit
  $('#new-tweet').on('submit', function(event) {
    event.preventDefault(); // Prevent default form submission behavior

    // Retrieve the value of the textarea
    const tweetText = $('#my-textarea').val();

    // Perform form validation
    if (tweetText.trim() === '') {
   
      $('#error-message').text('Tweet can\'t be empty!').show();
      return;
    }

    if (tweetText.length > 140) {
   
      $('#error-message').text('Tweet exceeds the character limit!').show();
      return;
    }



    // Clear any existing error messages
    $('#error-message').text('');
    
    // Send an AJAX POST request to the server
    $.ajax({
      
      method: 'POST',
      url: '/tweets',
      data: tweetText
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