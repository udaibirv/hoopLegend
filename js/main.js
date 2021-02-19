const $submit = document.querySelector('.submit-button');
const $form = document.querySelector('form');
const $scoreHeader = document.querySelector('.scores-header')
const $gameContainer = document.querySelector('#games-container');
const $navList = document.querySelectorAll('.nav-list');
const $scheduleHeader = document.querySelector('.schedule-header');
const $scheduleBox = document.querySelector('.schedule-box');
const $statsBox = document.querySelector('.stats-box');
const $playerHeader = document.querySelector('.stats-header');
const $upcomingSchedule = document.querySelector('.upcoming-schedule');
const $scheduleBox2 = document.querySelector('.schedule-box-2');
const $modal = document.querySelector('.modal');
const $modalButton = document.querySelector('.modal-button');
const $body = document.querySelector('body');
const $header = document.querySelector('header');
const $navBar = document.querySelector('.navbar');
const $open = document.querySelector('.open');
let $view = document.querySelectorAll('div[data-view]');
let favTeamConference;


$form.addEventListener('submit', function(e){
  e.preventDefault();
  data.profile.name = $form.elements['name'].value;
  data.profile.favTeam = $form.elements['favTeam'].value;
  data.profile.email = $form.elements['email'].value;
  resultFunction();
  scheduleFunction();
  statFunction();
  upcomingGames();
  changeView('scores');

})

const changeView = (page) =>{
  let $view = document.querySelectorAll('div[data-view]');
  hideModal()
  for(let i = 0; i < $view.length; i++){
    if($view[i].getAttribute('data-view') === page){
      $view[i].className = '';
    }else{
      $view[i].className = 'hidden';
    }

  }
  if(data.pagesWithNoData.includes(page)) {
    showModal();
  }
}

for(let i = 0; i < $navList.length; i++){
  $navList[i].addEventListener('click', (e) =>{
    changeView(e.target.classList[1]);

  })
}



$modalButton.addEventListener('click', hideModal);

function showModal(){
  $modal.className = "modal";
  $header.className = 'header ';
  $navBar.className = 'hidden';
}

function hideModal(){
  $modal.className = 'hidden';
  $header.className = 'header';
  $navBar.className = 'navbar';
}
