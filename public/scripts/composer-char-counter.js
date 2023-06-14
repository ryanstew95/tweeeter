$(document).ready(function() {
  $('#my-textarea').on('input', function() {
    const text = $(this).val();
    const count = text.length;
    const remaining = 140 - count;

    $('#char-count').text(remaining);

    // Add or remove CSS class based on the count
    if (remaining < 0) {
      $('#char-count').addClass('negative-count');
    } else {
      $('#char-count').removeClass('negative-count');
    }
  });
});


