$(document).ready(function() {
  getUser('OgamingSC2');
  getUser('freecodecamp');
  getUser('ESL_SC2');
})

function getUser(channel) {
  $.getJSON("https://wind-bow.glitch.me/twitch-api/users/" + channel + "?callback=?", function(json) {
    getStream(json.display_name, json.logo, json._links.self, json.name)
})
}

function getStream(name, image, link, user) {
  console.log("https://wind-bow.glitch.me/twitch-api/streams/" + user + "?callback=?");
  $.getJSON("https://wind-bow.glitch.me/twitch-api/streams/" + user + "?callback=?", function(json) {
    constructHtml(name, image, link, json.stream)
})
}

function constructHtml(name, image, link, stream){
  console.log(stream);
  var streamInfo
  (stream === null) ? streamInfo = 'Offline' : streamInfo = stream.game + ': ' + stream.channel.status;
  var html = '<div class="row">' +
    '<div class="stream col-lg-12 col-md-12 col-sm-12 col-xs-12">' +
      '<img class="col-lg-offset-1 col-md-offset-1 col-sm-offset-1 col-xs-offset-1 col-lg-1 col-md-1 col-sm-1 col-xs-1" src="' + image + '">' +
      '<div class="name-cont col-lg-2 col-md-2 col-sm-2 col-xs-2">' +
        '<a class="name" href="#" target="_blank">' + name + '</a>' +
      '</div>' +
      '<div class="stream-cont col-lg-7 col-md-7 col-sm-7 col-xs-7">' +
        '<p class="stream-info">' + streamInfo + '</p>' +
      '</div>' +
    '</div>' +
'</div>'
  
  $('.container').append(html);
}