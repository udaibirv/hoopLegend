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
      $scoreHeader.textContent = 'Recent results for the ' + xhr.response.data[i]["full_name"];
    }
  }
})
xhr.send();


  var game = new XMLHttpRequest();
  game.open('GET', "https://www.balldontlie.io/api/v1/games");
  game.responseType = 'json';
  game.addEventListener('load', function(e){
    for(var i = 0; i < game.response.data.length; i++){
      if(data.profile.favTeam === game.response.data[i]["home_team"].full_name){

        var $row = document.createElement('div');
        $row.setAttribute('class', 'row');
        var $div2 = document.createElement('div');
        $div2.setAttribute('class', 'score-box-1');
        $row.appendChild($div2);

        var $dateOne = document.createElement('h4');
        $dateOne.setAttribute('class', 'date-1');
        $dateOne.textContent = game.response.data[i]["date"];
        $div2.appendChild($dateOne);

        var $homeTeam = document.createElement('h5');
        $homeTeam.setAttribute('class', 'home');
        $homeTeam.textContent = 'Home Team: ' + game.response.data[i]["home_team"].full_name;
        $div2.appendChild($homeTeam);

        var $awayTeam = document.createElement('h5');
        $awayTeam.setAttribute('class', 'away');
        $awayTeam.textContent = 'Away Team: ' + game.response.data[i]["visitor_team"].full_name;
        $div2.appendChild($awayTeam);

        var $score1 = document.createElement('p');
        $score1.setAttribute('class', 'score-1');
        if(game.response.data[i]["home_team_score"] > game.response.data[i]["visitor_team_score"]){
          $score1.textContent = data.profile.favTeam + ' won the game ' + game.response.data[i]["home_team_score"] + ' - ' + game.response.data[i]["visitor_team_score"];
        }
        if (game.response.data[i]["home_team_score"] < game.response.data[i]["visitor_team_score"]){
          $score1.textContent = data.profile.favTeam + ' lost the game ' + game.response.data[i]["home_team_score"] + ' - ' + game.response.data[i]["visitor_team_score"];
        }
        $div2.appendChild($score1);
        document.body.appendChild($row);
    }




  }
  })
  game.send();
