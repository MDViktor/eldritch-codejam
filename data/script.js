import ancientsData from "./ancients.js";

const cards = document.querySelectorAll('.ancient_card');
const difficulty = document.querySelectorAll('.difficulty');
const secondPhase = document.querySelector('.second_phase');
const thirdPhase = document.querySelector('.third_phase');
const shuffle = document.querySelector('.shuffle');
const deck = document.querySelector('.deck');
const lastCard = document.querySelector('.last_card');
let selectedCardPath = '';

cards.forEach(element => {
  element.addEventListener('click', ()=>{
    if (!element.classList.contains('active')){
      cards.forEach( n=>n.classList.remove('active'));
      element.classList.add('active');
    } 
    
  })
});
function difficultyChoise () {
  difficulty.forEach(element => {
    element.addEventListener('click', ()=>{
      if (!element.classList.contains('active')){
        difficulty.forEach( n=>n.classList.remove('active'));
        element.classList.add('active');
        thirdPhase.style.display = 'block';
      } 
      
    })
  });
  
}
function getDifficulty() {
  cards.forEach(element => {
    if (element.classList.contains('active')){
      secondPhase.style.display = 'block';
      difficultyChoise();
    }
    console.log(selectedCardPath);
  });
  setTimeout(getDifficulty, 500)
}
function getSelectedCardPath(){
  cards.forEach(element => {
    // console.log(element.style.backgroundImage)
    if (element.classList.contains('active')){
      // console.log((element.style.backgroundImage));
      selectedCardPath = element.style.backgroundImage.replace('url(', '').replace(')', '');
      return selectedCardPath;
      
    }
  });
  
  setTimeout(getSelectedCardPath, 500)
}
getSelectedCardPath();
getDifficulty();
shuffle.addEventListener('click', ()=>{
  shuffle.style.display = 'none';
})
console.log(ancientsData[0].cardFace);
// lastCard.style.backgroundImage = `url(${ancientsData[0].cardFace})`;

console.log(selectedCardPath);