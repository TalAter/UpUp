var getBestsellers = function() {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', 'nyt-bestsellers.json', true);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      displayBestsellers(JSON.parse(xobj.responseText));
    }
  };
  xobj.send(null);
};

var displayBestsellers = function(data) {
  var bestSellersLIs = '';
  data.results.slice(0,10).forEach(function(bestseller) {
    bestSellersLIs += '<li title="'+bestseller['book_details'][0].description+'"><strong>'+bestseller['book_details'][0].title+'</strong><span> by '+bestseller['book_details'][0].author+'<span></li>';
  });
  var bestsellersList = document.getElementById('bestsellers');
  bestsellersList.innerHTML = bestSellersLIs;
};

getBestsellers();