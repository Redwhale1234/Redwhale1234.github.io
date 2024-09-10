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
          


        </div>



        <span class="duration">${this.duration}</span>
      </div>
    `
  }

  toAmplitudeJson() {
    return {
      "name": this.title,
      "description": "Description: " + this.description,
      "notes": "Notes: " + this.notes,
      "credits": "Credits: " + this.credits,
      "url": "/AllProjects/Songs/" + this.url + ".mp3",
      "cover_art_url":this.coverArtUrl
    }
  }

}



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
    var songsArray = songsArrayFrom(data.Songs)
    initSongs(songsArray);
    initAmplitude(songsArray);


  });



});
