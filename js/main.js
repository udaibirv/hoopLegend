var $submit = document.querySelector('.submit-button');
var $form = document.querySelector('form');
var $scoreHeader = document.querySelector('.scores-header')
var $home = document.querySelector('.home');
var $date = document.querySelector('.date');
var $away = document.querySelector('.away');
var $score1 = document.querySelector('.score-1')
var $home2 = document.querySelector('.home-2');
var $date2 = document.querySelector('.date-2');
var $away2 = document.querySelector('.away-2');
var $score2 = document.querySelector('.score-2')
var $score3 = document.querySelector('.score-3')
var $home3 = document.querySelector('.home-3');
var $date3 = document.querySelector('.date-3');
var $away3 = document.querySelector('.away-3');
var $score3 = document.querySelector('.score-3')

$form.addEventListener('submit', function(e){
  e.preventDefault();
  data.profile.name = $form.elements['name'].value;
  data.profile.favTeam = $form.elements['favTeam'].value;
  data.profile.email = $form.elements['email'].value;

})
