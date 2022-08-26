import ancientsData from "./ancients.js";
import { brownCards, blueCards, greenCards } from "./mythicCards/index.js";


const cards = document.querySelectorAll('.ancient_card');
const difficulty = document.querySelectorAll('.difficulty');
const secondPhase = document.querySelector('.second_phase');
const thirdPhase = document.querySelector('.third_phase');
const shuffle = document.querySelector('.shuffle');
const deck = document.querySelector('.deck');
const lastCard = document.querySelector('.last_card');
const greenDots = document.querySelectorAll('.dot.green');
const brownDots = document.querySelectorAll('.dot.brown');
const blueDots = document.querySelectorAll('.dot.blue');
var selectedCardIndex;
var qGreenCards;
var qBrownCards;
var qBlueCards;
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
    qGreenCards = [ancientsData[selectedCardIndex].firstStage.greenCards, ancientsData[selectedCardIndex].secondStage.greenCards, ancientsData[selectedCardIndex].thirdStage.greenCards];
    qBrownCards = [ancientsData[selectedCardIndex].firstStage.brownCards, ancientsData[selectedCardIndex].secondStage.brownCards, ancientsData[selectedCardIndex].thirdStage.brownCards];
    qBlueCards = [ancientsData[selectedCardIndex].firstStage.blueCards, ancientsData[selectedCardIndex].secondStage.blueCards, ancientsData[selectedCardIndex].thirdStage.blueCards];
    console.log(qGreenCards);
    getVisualStageSet();
    getFirstStageDeck();
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

function getVisualStageSet(){
  for(let i=0;i<3;i++){
      greenDots[i].textContent = qGreenCards[i];
      brownDots[i].textContent = qBrownCards[i];
      blueDots[i].textContent = qBlueCards[i];
  }
}

function getFirstStageDeck(){
  console.log(greenCards[getRandomNum(0,greenCards.length)].id);//подбор
  greenCards.forEach(element => {
    // console.log(element.id);
    // console.log(getRandomNum(0,greenCards.length));
    // console.log(greenCards.length);
  });
  //закончил работу здесь
}

function getRandomNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
  // let bgNum = String(RandomNum).padStart(2, 0);// для того что бы был ноль и 2 знака
}

getDifficulty();
shuffle.addEventListener('click', ()=>{
  shuffle.style.display = 'none';
})
// console.log(ancientsData[selectedCardIndex].cardFace);
// lastCard.style.backgroundImage = `url(${ancientsData[0].cardFace})`;
