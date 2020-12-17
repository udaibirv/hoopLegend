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
