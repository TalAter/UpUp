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
  console.log(data);
  var bestSellersLIs = '';
  data.results.forEach(function(bestseller) {
    bestSellersLIs += '<li>'+bestseller['book_details'][0].title.toLowerCase()+'</li>';
  });
  var bestsellersList = document.getElementById('bestsellers');
  bestsellersList.innerHTML = bestSellersLIs;
};

getBestsellers();