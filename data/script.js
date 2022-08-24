import ancientsData from "./ancients.js";

const cards = document.querySelectorAll('.ancient_card');
const difficulty = document.querySelectorAll('.difficulty');
const secondPhase = document.querySelector('.second_phase');
const thirdPhase = document.querySelector('.third_phase');
const shuffle = document.querySelector('.shuffle');
const deck = document.querySelector('.deck');
const lastCard = document.querySelector('.last_card');
var selectedCardIndex;

cards.forEach(element => {
  element.addEventListener('click', ()=>{
    if (!element.classList.contains('active')){
      cards.forEach( n=>n.classList.remove('active'));
      element.classList.add('active');
    } 
    for(let i=0;i<ancientsData.length;i++){
      if(getSelectedCardPath()===ancientsData[i].cardFace){
        selectedCardIndex = i;
        console.log(`selectedCardIndex:${selectedCardIndex}`);
      }
    }
    console.log(`firststagebc: ${ancientsData[selectedCardIndex].firstStage.blueCards}`);
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

  });
  setTimeout(getDifficulty, 500)
}


function getSelectedCardPath () {
  for (let card of cards){
    if (card.classList.contains('active')){
      var selectedCardPath = card.style.backgroundImage.replace('url(', '').replace(')', '').replace('"', '').replace('"', '');
      return selectedCardPath;
    }
  }
}

function getFirstStageSet(){
  let arr = [ancientsData[selectedCardIndex].firstStage.greenCards, ancientsData[selectedCardIndex].secondStage.greenCards, ancientsData[selectedCardIndex].thirdStage.greenCards];
  document.querySelectorAll('.dot.green').forEach(element => {
    for(let i=0;i<arr.length;i++){
      element.textContent = arr[i];
    }
    
  });

}

getFirstStageSet();
getDifficulty();
shuffle.addEventListener('click', ()=>{
  shuffle.style.display = 'none';
})
// console.log(ancientsData[selectedCardIndex].cardFace);
// lastCard.style.backgroundImage = `url(${ancientsData[0].cardFace})`;
