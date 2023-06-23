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
        <h3 class="user-name">${$("<div>").text(user.name).html()}</h3>
      </div>
      <span class="user-handle">${$("<div>").text(user.handle).html()}</span>
    </header>
    <div class="tweet-content">
      <p>${$("<div>").text(content.text).html()}</p>
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
    $("#tweets-container").empty();

    // Iterate over the tweetArray and append each tweet to the container
    tweetArray.forEach((tweetData) => {
      $tweet = createTweetElement(tweetData);
      $("#tweets-container").prepend($tweet);
    });
  };

  const loadTweets = () => {
    $.ajax({
      url: "/tweets",
      method: "GET",
      dataType: "json",
      success: (tweets) => {
        renderTweets(tweets);
      },
      error: (error) => {
        console.error(error);
      },
    });
  };

  loadTweets();

  // Add event listener for form submit
  $("#new-tweet").on("submit", function(event) {
    event.preventDefault(); // Prevent default form submission behavior
    // Retrieve the value of the textarea
    const tweetText = $("#my-textarea").val();

    // Perform form validation
    if (tweetText.trim() === "") {
      $("#error-message")
        .text("🚫 " + "Tweet can't be empty!" + " 🚫")
        .show();
      return;
    }

    if (tweetText.trim().length > 140) {
      $("#error-message")
        .text("🚫 " + "Tweet exceeds the character limit!" + " 🚫")
        .show();
      return;
    }

    // Clear any existing error messages
    $("#error-message").text("").hide();

    // Send an AJAX POST request to the server
    $.ajax({
      method: "POST",
      url: "/tweets",
      data: { text: tweetText },
    })

      .done(function(response) {
        // Handle the success response from the server
        console.log(response);
        // Update the UI or perform any other actions
        loadTweets();

        // clear the textarea after successful submission
        $("#my-textarea").val("");
      })

      .fail(function(error) {
        // Handle the error response from the server
        console.error(error);
        // Display an error message or perform error handling
        $("#error-message")
          .text("🚫 " + "An error occurred. Please try again." + " 🚫")
          .show();
      });
  });
});
