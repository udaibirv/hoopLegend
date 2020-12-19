var $submit = document.querySelector('.submit-button');
var $form = document.querySelector('form');
var $scoreHeader = document.querySelector('.scores-header')
var $gameContainer = document.querySelector('#games-container');
var $navList = document.querySelectorAll('.nav-list');
var $scheduleHeader = document.querySelector('.schedule-header');
var $scheduleBox = document.querySelector('.schedule-box');
var $statsBox = document.querySelector('.stats-box');
var $playerHeader = document.querySelector('.stats-header');


$form.addEventListener('submit', function(e){
  e.preventDefault();
  data.profile.name = $form.elements['name'].value;
  data.profile.favTeam = $form.elements['favTeam'].value;
  data.profile.email = $form.elements['email'].value;
  changeView('scores');

})

function changeView(page){
  var $view = document.querySelectorAll('div[data-view]');
  for(var i = 0; i < $view.length; i++){
    if($view[i].getAttribute('data-view') === page){
      $view[i].className = '';
    }else{
      $view[i].className = 'hidden';
    }
  }
}

for(var i = 0; i < $navList.length; i++){
  $navList[i].addEventListener('click', function(e){
    changeView(e.target.classList[1]);

  })
}
