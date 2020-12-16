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
