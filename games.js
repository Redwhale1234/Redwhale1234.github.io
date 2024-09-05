function loadData() {
  return {
    AppelV1: { title: "AppelV1", url: "./Appelv1.html"},
    TriangleBoss: { title: "Triangle Boss", url: "./TriangleBoss.html"},
  }
}


$(document).ready(function(){
  var games = loadData();
  alert("hi")
  $('#switchButton').on( "click", function() {
    var gameKey=$('input[name="game"]:checked').val();
    var gameInfo = games[gameKey];
    var gameTitle = gameInfo.title;
    var gameUrl = gameInfo.url
    alert( "Handler for `click` called. " + gameUrl );
    $('#gameTitle').text(gameTitle);
    $('#gameObject').attr('data', gameUrl);
  });
});
