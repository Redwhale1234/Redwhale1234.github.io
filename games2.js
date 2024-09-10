'use strict';

class Game {
  title;
  instructions;
  description;
  notes;
  credits;
  background;
  hashName;

  constructor(title, instructions, description, notes, credits, background, hashName) {
    this.title=title;
    this.instructions=instructions;
    this.description=description;
    this.notes=notes;
    this.credits=credits;
    this.background=background;
    this.hashName=hashName;
  }

  toHTML() {
    return `
      <div class="pure-u-1-3 games-class game-simulation" style="background: url('${this.background}')" ><a class="hidden-button "href="testGame.html#${this.hashName}">${this.title}

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
      gameInfo.background,
      gameInfo.hashName
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

function loadPage(data) {
  var hash = $(location).attr('hash')

  if(!hash) {
    hash = 'games'
  } else {
    hash = hash.substring(1);
  }
  $('#page-title').text("All " + hash);

  var gamesArray = gamesArrayFrom(data[hash])
  initGames(gamesArray);
}

function setupPageListener(data) {
  window.addEventListener( "hashchange", () => {
    loadPage(data);
  }, false,);
}

$(document).ready(function(){
  $.getJSON("./jesse.json", function(data) {
    loadPage(data);
    setupPageListener(data);
  });
});
