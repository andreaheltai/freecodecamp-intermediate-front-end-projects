$(document).ready(function() {
  var Celsius;
  var Fahrenheit;
  $.ajaxSetup({ cache:true}); 
  setRandomColor();
  getLocation(getWeather);
  $("#temp-slider").click(sliderChange);
});

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#' + letters[Math.round(Math.random() * 5)];
  for (var i = 0; i < 5; i++) {
    color += letters[Math.floor(Math.random() * 15)];
  }
  return color;
}

function setRandomColor() {
  var newColor = getRandomColor();
  $("body").css("background-color", newColor);
  $(".weather-title, .weather-location, .weather-current, .weather-description").css("color", newColor);
  $("#temp-slider:checked").next('.slider').css("background-color", newColor);
}

function getLocation(callback) {
  $.getJSON("https://geoip-db.com/json/", function(json) {
    callback(json.latitude, json.longitude, setWeather);
});
}

function getWeather(lat, lon, callback) {
  $.getJSON("https://fcc-weather-api.glitch.me/api/current?lat=" + lat + "&lon=" + lon, function(json) {
    callback(json);
});
}

function setWeather(weather) {
  var temp = Math.round(weather.main.temp * 10) / 10;
  Celsius = temp + ' °C';
  Fahrenheit = 1.8 * temp + 32 + ' °F';
  $(".weather-location p").html(weather.name + ', ' + weather.sys.country);
  $(".weather-current p").html(Celsius);
  $(".weather-icon img").attr("src", weather.weather[0].icon)
  $(".weather-description p").html(weather.weather[0].description);
}

function sliderChange() {
  var onColor = $("body").css("background-color");
  var offColor = '#ccc';
  $("#temp-slider:checked").next('.slider').css("background-color", onColor);
  $(":not(#temp-slider:checked)").next('.slider').css("background-color", offColor);
  if ($(".slider").css('background-color') !== 'rgb(204, 204, 204)') {
    $(".weather-current p").html(Fahrenheit);
  } else {
    $(".weather-current p").html(Celsius);
  }
}