$(document).ready(function() {
  $.ajaxSetup({ cache: false });
  setQuote();
  setRandomColor();
  $("#generator").click(function () {
    setQuote();
    setRandomColor();
  });
});

function getRandomColor() {
  var letters = '012345678';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 9)];
  }
  return color;
}

function getQuote(callback) {
  $.getJSON("https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1", function(json) {
    var quote = json[0];
    console.log(quote);
    callback(quote);
});
}

function setQuote() {
  getQuote(function(newQuote) {
    $("#authName").html(newQuote.title);
    $("#quote").html(newQuote.content);
    var a = $("#tweet");
    var auth = newQuote.title;
    var text = $('#quote').text();
    $("#tweet").attr('href', 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent(text) + encodeURIComponent(auth));
});
}

function setRandomColor() {
  var newColor = getRandomColor();
  $("body, .buttons").css("background-color", newColor);
  $(".quoteText, .author").css("color", newColor);
}