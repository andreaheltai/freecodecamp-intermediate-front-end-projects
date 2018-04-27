$(document).ready(function() {
  addSearchEvent();
})

function addSearchEvent() {
  $('.input-group-addon').click(function() { submitSearch(); });
  $('.form-control').keypress(function(e) {
    if(e.which == 13) {
        submitSearch();
    }
});
}

function submitSearch(){
  var searched = $('.form-control').val();
    if (searched === '') {
      alert('Please type your search in the input field');
    } else {
      getArticles(searched);
    };
}

function getArticles(query) {
  var url = 'https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=' + query + '&srwhat=text&format=json&origin=*';
  $.ajax( {
    url: url,
    dataType: 'json',
    type: 'GET',
    headers: { 'Api-User-Agent': 'Example/1.0' },
    success: function(data) {
       listArticles(data.query.search);
    },
    error: function(error) {
      alert(error);
    }
} );
}

function listArticles(allArticles) {
  $('.container').removeClass('top');
  var html = '';
  for (var i=0; i < allArticles.length; i++) {
    html += '<a href="https://en.wikipedia.org/?curid=' + allArticles[i].pageid + '">' +
            '<div class="article">' +
              '<div class="title">' + 
                allArticles[i].title + 
              '</div>' +
              '<div class="content">' + 
                allArticles[i].snippet + 
              '</div>' +
            '</div>' +
            '</a>'
  }
  $('.allArt').html(html);
}