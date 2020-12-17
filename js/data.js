/* exported data */
var data = {
  profile: {
    name: '',
    favTeam: '',
    email: ''
  }
}

window.addEventListener('beforeunload', function(e){
  var stringData = JSON.stringify(data);
  localStorage.setItem('hoop-legends', stringData);
})

var returnData = localStorage.getItem('hoop-legends');
if(returnData !== null){
  data = JSON.parse(returnData);
}

var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://www.balldontlie.io/api/v1/teams');
xhr.responseType = 'json';
xhr.addEventListener('load', function(e){

  for(var i = 0; i < xhr.response.data.length; i++){
    if(data.profile.favTeam === xhr.response.data[i]["full_name"]){
      $scoreHeader.textContent = 'Recent results for ' + xhr.response.data[i]["full_name"];
    }
  }
})
xhr.send();


  var game = new XMLHttpRequest();
  game.open('GET', "https://www.balldontlie.io/api/v1/games");
  game.responseType = 'json';
  game.addEventListener('load', function(e){
    var gamesArray = [];
    for(var i = 0; i < game.response.data.length; i++){
    gamesArray.push(game.response.data[i]);
      if(data.profile.favTeam === game.response.data[i]["home_team"].full_name){
        $homeScore.textContent = 'Boston lost the game ' + game.response.data[i]["home_team_score"] + ' to ' + game.response.data[i]["visitor_team_score"];
        gamesArray.push(game.response.data[i]["home_team"]);
        console.log(gamesArray);
    }

  }
  })
  game.send();
