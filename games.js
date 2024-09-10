function loadData() {

  $.getJSON("./jesse.json", function(data) {

    return data;


  })

}


function findTitleFromHashValue(projectData, hashValue) {
  for (const [type, projectType] of Object.entries(projectData)) {
    for (const [name, project] of Object.entries(projectType)) {
      console.log(project);
      if (project.hashName && (project.hashName == hashValue)) {
        return {"type": type, "name":name, pageData:project };
      }
    }
  }
  return null;
}

$(document).ready(function(){

  $.getJSON("./jesse.json", function(data) {

    //var games = Object.values(data);
    //console.log(games);

    var hash = $(location).attr('hash')

    if(!hash) {
      hash = ''
    } else {
      hash = hash.substring(1);
    }
    $('#gameTitle').text(hash);

    var pageKey  = hash;
    //var gameName = findTitleFromHashValue(games, gameKey);
    //var gameInfo = findInfoFromHashValue(games, gameKey);
    var pageData = findTitleFromHashValue(data, pageKey);
    var pageUrl  = hash + ".html"

    $('#gameTitle').text(pageData.name);
    $('#gameObject').attr('data', "AllProjects/"+pageData.type+"/" + pageUrl);
    $('#instructions').text((pageData.pageData)['instructions']);
    $('#description').text((pageData.pageData)['description']);
    $('#notes').text((pageData.pageData)['notes']);
    $('#credits').text((pageData.pageData)['credits']);


  })

});
