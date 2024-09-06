'use strict';

class Game {
  title;
  instructions;
  description;
  notes;
  credits;
  background;

  constructor(title, instructions, description, notes, credits, background) {
    this.title=title;
    this.instructions=instructions;
    this.description=description;
    this.notes=notes;
    this.credits=credits;
    this.background=background;
  }

  toHTML() {
    return `
      <div class="pure-u-1-3 games-class" style="background: url('${this.background}')" ><a class="hidden-button game-simulation" href="testGame.html">${this.title}

        </a>
      </div>
    `
  }
}

function gamesArrayFrom(games) {
  var gamesArray = [];
  for (const [gameName, gameInfo] of Object.entries(games)) {
    gamesArray.push(new Game(
      gameName,
      gameInfo.instructions,
      gameInfo.description,
      gameInfo.notes,
      gameInfo.credits,
      gameInfo.background
    ));
  }
  return gamesArray;
}

function initGames(gamesArray) {
  gamesArray.forEach((game) => {
    $('#content').append(game.toHTML())
  })
}

function showItem(item) {
  alert("showing " + item)
  $('#view').css("visibility", "visible");
}

function closeView() {
  $('#view').css("visibility", "hidden");
}

$(document).ready(function(){
  var hash = $(location).attr('hash')

  if(!hash) {
    hash = 'games'
  } else {
    hash = hash.substring(1);
  }
  $('#page-title').text("All " + hash);

  var my_json;
  $.getJSON("./jesse.json", function(data) {
    var gamesArray = gamesArrayFrom(data[hash])
    initGames(gamesArray);
  });



});
