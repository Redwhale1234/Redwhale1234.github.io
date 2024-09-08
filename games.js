function loadData() {
  
  $.getJSON("./jesse.json", function(data) {

    return data;


  })
  
}


function findTitleFromHashValue(projectData, hashValue) {
    for (const projectType of projectData) {
        
        for (const [name, project] of Object.entries(projectType)) {
        console.log(project);
            
            if (project.hashName && (project.hashName == hashValue)) {
                return name;
                
            }
        }
    }
    return null;
}

function findInfoFromHashValue(projectData, hashValue) {
    for (const projectType of projectData) {
        
        for (const [name, project] of Object.entries(projectType)) {
        console.log(project);
            
            if (project.hashName && (project.hashName == hashValue)) {
                return project;
                
            }
        }
    }
    return null;
}


$(document).ready(function(){

  $.getJSON("./jesse.json", function(data) {

    


  
  var games = Object.values(data);
  console.log(games);
  
  
  


  var hash = $(location).attr('hash')



  if(!hash) {
    hash = ''
  } else {
    hash = hash.substring(1);
  }
  $('#gameTitle').text(hash);
 
    
    /* The error is that it is passing gameKey when it needs to be passing the name*/

    var gameKey=hash;
    var gameName = findTitleFromHashValue(games, gameKey);
    var gameInfo = findInfoFromHashValue(games, gameKey);
    var gameUrl = hash + ".html"
    

    $('#gameTitle').text(gameName);
    $('#gameObject').attr('data', gameUrl);
    $('#instructions').text((gameInfo)['instructions']);
    $('#description').text((gameInfo)['description']);
    $('#notes').text((gameInfo)['notes']);
    $('#credits').text((gameInfo)['credits']);


    })
  
});
