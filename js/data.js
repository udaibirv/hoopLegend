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
function dataLoaded(){
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://www.balldontlie.io/api/v1/teams');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function(e){
  for(var i = 0; i < xhr.response.data.length; i++){
    if(data.profile.favTeam === xhr.response.data[i]["full_name"]){
      $scoreHeader.textContent = 'Recent results for the ' +
      xhr.response.data[i]["full_name"];
    }
  }
})
  xhr.send();


  var game = new XMLHttpRequest();
  game.open('GET', "https://www.balldontlie.io/api/v1/games?&end_date=2019-02-10");
  game.responseType = 'json';
  game.addEventListener('load', function(e){
    for(var i = 0; i < game.response.data.length; i++){
      if(data.profile.favTeam === game.response.data[i]["visitor_team"].full_name || data.profile.favTeam === game.response.data[i]["home_team"].full_name){
        if($gameContainer.children.length <= 2){
        var $row = document.createElement('div');
        $row.setAttribute('class', 'row');
        var $div2 = document.createElement('div');
        $div2.setAttribute('class', 'score-box-1');
        $row.appendChild($div2);

        var $dateOne = document.createElement('h4');
        $dateOne.setAttribute('class', 'date-1');
        $dateOne.textContent = 'Date Played: ' + game.response.data[i]["date"].slice(0, 10);
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
          $score1.textContent = game.response.data[i]["home_team"].full_name + ' won the game ' + game.response.data[i]["home_team_score"] +
          ' - ' + game.response.data[i]["visitor_team_score"];
        }
        if (game.response.data[i]["home_team_score"] < game.response.data[i]["visitor_team_score"]){
          $score1.textContent = game.response.data[i]["visitor_team"].full_name + ' won the game ' + game.response.data[i]["home_team_score"] +
          ' - ' + game.response.data[i]["visitor_team_score"];
        }
        $div2.appendChild($score1);
        $gameContainer.appendChild($row);
    }




    }
    }
      if($gameContainer.children.length === 0 && xhr.response.data[i]["full_name"] !== data.profile.favTeam){
        $scoreHeader.textContent = 'No data available'
      }
    })
    game.send();


  var schedules = new XMLHttpRequest();
  schedules.open('GET', 'https://www.balldontlie.io/api/v1/games?start_date=2019-02-09&end_date=2019-02-12');
  schedules.responseType = 'json';
  schedules.addEventListener('load', function (e) {
    for(var i = 0; i < schedules.response.data.length; i++){
    var conferenceTeam = schedules.response.data[i]["visitor_team"]["conference"];
      if(data.profile.favTeam === schedules.response.data[i]["visitor_team"].full_name){
      var favTeamConference = schedules.response.data[i]["visitor_team"]["conference"];
    }
      $scheduleHeader.textContent = 'Games Played in the ' + favTeamConference + 'ern Conference';
      if(favTeamConference === schedules.response.data[i]["home_team"]["conference"] && data.profile.favTeam !== schedules.response.data[i]["home_team"].full_name && $scheduleBox.children.length <= 6) {
        var $row2 = document.createElement('div');
        $row2.setAttribute('class' , 'row');
        var $div3 = document.createElement('div');
        $div3.setAttribute('class', 'schedule-box');
        $row2.appendChild($div3);
        var $dateTwo = document.createElement('h4');
        $dateTwo.setAttribute('class', 'date-2');
        $dateTwo.textContent = 'Date Played: ' + schedules.response.data[i]["date"].slice(0, 10);
        $div3.appendChild($dateTwo);

        var $homeTeam1 = document.createElement('h4');
        $homeTeam1.setAttribute('class', 'home-one');
        $homeTeam1.textContent = 'Home Team: ' + schedules.response.data[i]["home_team"].full_name;
        $div3.appendChild($homeTeam1);

        var $awayTeam1 = document.createElement('h4');
        $awayTeam1.setAttribute('class', 'away-two');
        $awayTeam1.textContent = 'Away Team: ' + schedules.response.data[i]["visitor_team"].full_name;
        $div3.appendChild($awayTeam1);

        var $score2 = document.createElement('p');
        $score2.setAttribute('class', 'score-2');
        if(schedules.response.data[i]["home_team_score"] > schedules.response.data[i]["visitor_team_score"]){
          $score2.textContent = schedules.response.data[i]["home_team"].full_name + ' won '  +
          schedules.response.data[i]["home_team_score"] + ' - ' + schedules.response.data[i]["visitor_team_score"];
      }
        if(schedules.response.data[i]["home_team_score"] < schedules.response.data[i]["visitor_team_score"]){
        $score2.textContent = schedules.response.data[i]["home_team"].full_name + ' lost ' +
          schedules.response.data[i]["home_team_score"] + ' - ' + schedules.response.data[i]["visitor_team_score"]
      }
      $div3.appendChild($score2);
      $scheduleBox.appendChild($row2);
      }
    }
    if($scheduleBox.children.length === 0){
      $scheduleHeader.textContent = 'No data available';
    }


})
schedules.send();

  var stats = new XMLHttpRequest();
  stats.open('GET', 'https://www.balldontlie.io/api/v1/stats');
  stats.responseType = 'json';
  stats.addEventListener('load', function(e){
  for(var i = 0; i < stats.response.data.length; i++){
    if(data.profile.favTeam === stats.response.data[i]["team"].full_name && stats.response.data[i]["pts"] >= 15){
      $playerHeader.textContent = 'Key Preformers for The ' + data.profile.favTeam;
      var $row3 = document.createElement('div');
      $row3.setAttribute('class', 'row');
      var $div4 = document.createElement('div');
      $div4.setAttribute('class', 'player');
      $row3.appendChild($div4);

      var $playerName = document.createElement('h4');
      $playerName.setAttribute('class', 'player-name');
      $playerName.textContent = stats.response.data[i]["player"].first_name + ' ' +  stats.response.data[i]["player"].last_name;
      $div4.appendChild($playerName);

      var $dateThree = document.createElement('h4');
      $dateThree.setAttribute('class', 'date');
      $dateThree.textContent = 'Date Played: ' + stats.response.data[i]["game"].date.slice(0, 10);
      $div4.appendChild($dateThree);

      var $position = document.createElement('h4');
      $position.setAttribute('class', 'position');
      $position.textContent = 'POS: ' + stats.response.data[i]["player"].position;
      $div4.appendChild($position);

      var $points = document.createElement('h4');
      $points.setAttribute('class', 'points');
      $points.textContent = 'PTS: ' + stats.response.data[i]["pts"];
      $div4.appendChild($points);

      var $assists = document.createElement('h4');
      $assists.setAttribute('class', 'assists');
      $assists.textContent = 'AST: ' + stats.response.data[i]["ast"];
      $div4.appendChild($assists);

      var $rebounds = document.createElement('h4');
      $rebounds.setAttribute('class', 'rebounds');
      $rebounds.textContent = 'RBs: ' + stats.response.data[i]["reb"];
      $div4.appendChild($rebounds);

      $statsBox.appendChild($row3);
  }

}
  if($statsBox.children.length === 0){
  $playerHeader.textContent = 'No data available';
}

})
  stats.send();


  var season = new XMLHttpRequest();
  season.open('GET', "https://www.balldontlie.io/api/v1/games?start_date=2019-02-15&end_date=2019-04-11");
  season.responseType = 'json';
  season.addEventListener('load', function(e){
  $upcomingSchedule.textContent = 'Upcoming Games for The ' + data.profile.favTeam;
  for(var i = 0; i < season.response.data.length; i++){
    if(data.profile.favTeam === season.response.data[i]["home_team"].full_name || data.profile.favTeam === season.response.data[i]["visitor_team"].full_name){
      if($scheduleBox2.children.length <= 2){
      var $row4 = document.createElement('div');
      $row4.setAttribute('class', 'row');
      var $div5 = document.createElement('div');
      $div5.setAttribute('class', 'schedule-box');
      $row4.appendChild($div5);
      var $dateFour = document.createElement('h4');
      $dateFour.setAttribute('class', 'date-2');
      $dateFour.textContent = 'Date of Game: ' + season.response.data[i]["date"].slice(0, 10);
      $div5.appendChild($dateFour);

      var $homeTeam2 = document.createElement('h4');
      $homeTeam2.setAttribute('class', 'home-one');
      $homeTeam2.textContent = 'Home Team: ' + season.response.data[i]["home_team"].full_name;
      $div5.appendChild($homeTeam2);

      var $awayTeam2 = document.createElement('h4');
      $awayTeam2.setAttribute('class', 'away-two');
      $awayTeam2.textContent = 'Away Team: ' + season.response.data[i]["visitor_team"].full_name;
      $div5.appendChild($awayTeam2);

      var $venue = document.createElement('h4');
      $venue.setAttribute('class', 'venue');
      $venue.textContent = 'The Game will be played in: ' + season.response.data[i]["home_team"].city;
      $div5.appendChild($venue);
      $scheduleBox2.appendChild($row4);
  }
  }
  }
    if($scheduleBox2.children.length === 0){
      $upcomingSchedule.textContent = 'No data available';
    }
  })
  season.send();
}
