'use strict';

class Song {
  title;
  duration;
  description;
  notes;
  credits;
  index;
  url;
  coverArtUrl;

  constructor(index, title, duration, description, notes, credits, url, coverArtUrl) {
    this.index=index;
    this.title=title;
    this.duration=duration;
    this.description=description;
    this.notes=notes;
    this.credits=credits;
    this.url=url;
    this.coverArtUrl=coverArtUrl;
  }

  toHTML() {
    return `
      <div class="song amplitude-song-container amplitude-play-pause" data-amplitude-song-index="${this.index}">
        <div class="song-now-playing-icon-container">
          <div class="play-button-container"></div>
          <img class="now-playing" src="https://521dimensions.com/img/open-source/amplitudejs/blue-player/now-playing.svg"/>
        </div>

        <div class="song-meta-data">
          <span class="song-title">${this.title}</span>
          <span class="song-info">${this.description}</span>
          <span class="song-info">${this.notes}</span>
          <span class="song-artist">${this.credits}</span>


        </div>



        <span class="song-duration">${this.duration}</span>
      </div>
    `
  }

  toAmplitudeJson() {
    return {
      "name": this.title,
      "artist": this.credits,
      "album": this.description,
      "url": this.url,
      "cover_art_url":this.coverArtUrl
    }
  }

}

//var allSongsArray = [
  //{
    //"name": "Risin' High (feat Raashan Ahmad)",
    //"artist": "Ancient Astronauts",
    //"album": "We Are to Answer",
    //"url": "https://521dimensions.com/song/Ancient Astronauts - Risin' High (feat Raashan Ahmad).mp3",
    //"cover_art_url": "https://521dimensions.com/img/open-source/amplitudejs/album-art/we-are-to-answer.jpg"
  //},
  //{
    //"name": "The Gun",
    //"artist": "Lorn",
    //"album": "Ask The Dust",
    //"url": "https://521dimensions.com/song/08 The Gun.mp3",
    //"cover_art_url": "https://521dimensions.com/img/open-source/amplitudejs/album-art/ask-the-dust.jpg"
  //},
  //{
    //"name": "Anvil",
    //"artist": "Lorn",
    //"album": "Anvil",
    //"url": "https://521dimensions.com/song/LORN - ANVIL.mp3",
    //"cover_art_url": "https://521dimensions.com/img/open-source/amplitudejs/album-art/anvil.jpg"
  //},
  //{
    //"name": "I Came Running",
    //"artist": "Ancient Astronauts",
    //"album": "We Are to Answer",
    //"url": "https://521dimensions.com/song/ICameRunning-AncientAstronauts.mp3",
    //"cover_art_url": "https://521dimensions.com/img/open-source/amplitudejs/album-art/we-are-to-answer.jpg"
  //},
  //{
    //"name": "First Snow",
    //"artist": "Emancipator",
    //"album": "Soon It Will Be Cold Enough",
    //"url": "https://521dimensions.com/song/FirstSnow-Emancipator.mp3",
    //"cover_art_url": "https://521dimensions.com/img/open-source/amplitudejs/album-art/soon-it-will-be-cold-enough.jpg"
  //},
  //{
    //"name": "Terrain",
    //"artist": "pg.lost",
    //"album": "Key",
    //"url": "https://521dimensions.com/song/Terrain-pglost.mp3",
    //"cover_art_url": "https://521dimensions.com/img/open-source/amplitudejs/album-art/key.jpg"
  //},
  //{
    //"name": "Vorel",
    //"artist": "Russian Circles",
    //"album": "Guidance",
    //"url": "https://521dimensions.com/song/Vorel-RussianCircles.mp3",
    //"cover_art_url": "https://521dimensions.com/img/open-source/amplitudejs/album-art/guidance.jpg"
  //},
  //{
    //"name": "Intro / Sweet Glory",
    //"artist": "Jimkata",
    //"album": "Die Digital",
    //"url": "https://521dimensions.com/song/IntroSweetGlory-Jimkata.mp3",
    //"cover_art_url": "https://521dimensions.com/img/open-source/amplitudejs/album-art/die-digital.jpg"
  //},
  //{
    //"name": "Offcut #6",
    //"artist": "Little People",
    //"album": "We Are But Hunks of Wood Remixes",
    //"url": "https://521dimensions.com/song/Offcut6-LittlePeople.mp3",
    //"cover_art_url": "https://521dimensions.com/img/open-source/amplitudejs/album-art/we-are-but-hunks-of-wood.jpg"
  //},
  //{
    //"name": "Dusk To Dawn",
    //"artist": "Emancipator",
    //"album": "Dusk To Dawn",
    //"url": "https://521dimensions.com/song/DuskToDawn-Emancipator.mp3",
    //"cover_art_url": "https://521dimensions.com/img/open-source/amplitudejs/album-art/from-dusk-to-dawn.jpg"
  //},
  //{
    //"name": "Anthem",
    //"artist": "Emancipator",
    //"album": "Soon It Will Be Cold Enough",
    //"url": "https://521dimensions.com/song/Anthem-Emancipator.mp3",
    //"cover_art_url": "https://521dimensions.com/img/open-source/amplitudejs/album-art/soon-it-will-be-cold-enough.jpg"
  //}
//];

function songsArrayFrom(songs) {
  var songsArray = [];
  for (const [songName, songInfo] of Object.entries(songs)) {
    songsArray.push(new Song(
      songInfo.index,
      songName,
      songInfo.duration,
      songInfo.description,
      songInfo.notes,
      songInfo.credits,
      songInfo.url,
      songInfo.coverArtUrl
    ));
  }
  return songsArray;
}

function initSongs(songsArray) {
  songsArray.forEach((song) => {
    $('#amplitude-right').append(song.toHTML())
  })
}

function initAmplitude(songsArray) {
  var amplitudeSongs = [];
  songsArray.forEach((song) => {
    amplitudeSongs.push(song.toAmplitudeJson());
  });

  /*
    Initializes AmplitudeJS
  */
  Amplitude.init({
    "songs": amplitudeSongs,
    "callbacks": {
          'play': function(){
              document.getElementById('album-art').style.visibility = 'hidden';
              document.getElementById('large-visualization').style.visibility = 'visible';
              //$('#description').text((gameInfo)['description']);

          },

          'pause': function(){
              document.getElementById('album-art').style.visibility = 'visible';
              document.getElementById('large-visualization').style.visibility = 'hidden';
          }
      },
    waveforms: {
      sample_rate: 50
    }
  });
}


$(document).ready(function(){
  var my_json;
  $.getJSON("./jesse.json", function(data) {
    var songsArray = songsArrayFrom(data.songs)
    initSongs(songsArray);
    initAmplitude(songsArray);

    $('#description').text((gameInfo)['description']);
    $('#notes').text((gameInfo)['notes']);
    $('#credits').text((gameInfo)['credits']);
  });



});
