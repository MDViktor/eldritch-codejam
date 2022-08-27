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
var sDeck;
var deckStack;
var qGreenCards;
var qBrownCards;
var qBlueCards;
var lastCardId;
cards.forEach(element => {
  element.addEventListener('click', ()=>{
    if (!element.classList.contains('active')){
      cards.forEach( n=>n.classList.remove('active'));
      element.classList.add('active');
    } 
    for(let i=0;i<ancientsData.length;i++){
      if(getSelectedCardPath()===ancientsData[i].cardFace){
        selectedCardIndex = i;
      }
    }
    qGreenCards = [ancientsData[selectedCardIndex].firstStage.greenCards, ancientsData[selectedCardIndex].secondStage.greenCards, ancientsData[selectedCardIndex].thirdStage.greenCards];
    qBrownCards = [ancientsData[selectedCardIndex].firstStage.brownCards, ancientsData[selectedCardIndex].secondStage.brownCards, ancientsData[selectedCardIndex].thirdStage.brownCards];
    qBlueCards = [ancientsData[selectedCardIndex].firstStage.blueCards, ancientsData[selectedCardIndex].secondStage.blueCards, ancientsData[selectedCardIndex].thirdStage.blueCards];

    getVisualStageSet();
    getShuffeledDeck();
    getDeckStack()
    console.log(sDeck);
    console.log(deckStack);
    // getCard();
  })
});

function getDeckStack () {
  deckStack = [];
  for (let stage in sDeck){
    deckStack.push(sDeck[stage]);
  }
  deckStack = deckStack.flat().reverse();
  return deckStack;
}

function getShuffeledDeck() {
  sDeck = merge_decks(getSome(greenCards, qGreenCards), getSome(blueCards, qBlueCards), getSome(brownCards, qBrownCards));
    sDeck.stage1 = shuffeling(sDeck.stage1);
    sDeck.stage2 = shuffeling(sDeck.stage2);
    sDeck.stage3 = shuffeling(sDeck.stage3);
    return sDeck
}

function merge_decks(obj1,obj2,obj3) {
  var objE = {
    stage1: [],
    stage2: [],
    stage3: [],
  };
  for (var key in obj1) {
    for(let el of obj1[key]){
      objE[key].push(el);
    }
  } 
  for (var key in obj2) { 
    for(let el of obj2[key]){
      objE[key].push(el);
    } 
  }
  for (var key in obj3) {
    for(let el of obj3[key]){
      objE[key].push(el);
    }
  }
  return objE;
};

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

// function difficultyFilter(){

// }

function shuffeling(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i

    // поменять элементы местами
    // мы используем для этого синтаксис "деструктурирующее присваивание"
    // подробнее о нём - в следующих главах
    // то же самое можно записать как:
    // let t = array[i]; array[i] = array[j]; array[j] = t
    [array[i], array[j]] = [array[j], array[i]];

  }
  return array;
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

function getCard() {
  let result = '';
  lastCardId = deckStack.pop();
  for (let keys in greenCards) {
    for (let val in greenCards[keys]){
      // console.log(greenCards[keys][val]);
      if (greenCards[keys][val] === lastCardId) {
        console.log(greenCards[keys].cardFace);
        result = greenCards[keys].cardFace
      }
    }
  }
  for (let keys in blueCards) {
    for (let val in blueCards[keys]){
      // console.log(greenCards[keys][val]);
      if (blueCards[keys][val] === lastCardId) {
        console.log(blueCards[keys].cardFace);
        result = blueCards[keys].cardFace
      }
    }
  }
  for (let keys in brownCards) {
    for (let val in brownCards[keys]){
      // console.log(greenCards[keys][val]);
      if (brownCards[keys][val] === lastCardId) {
        console.log(brownCards[keys].cardFace);
        result = brownCards[keys].cardFace
      }
    }
  }

  let lastCardFacePath = `url(${result})`
  lastCard.style.backgroundImage = lastCardFacePath;
  console.log(deckStack, lastCardId);
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


function getSome(arr, def){
  let stack = [];
  arr.forEach(element => {
    stack.push(element.id);
  });
  let shuffeled = shuffeling(stack);
  let stage1, stage2, stage3 = [];
  stage1 = shuffeled.splice(0,def[0]);
  shuffeled = shuffeling(shuffeled);
  stage2 = shuffeled.splice(0,def[1]);
  shuffeled = shuffeling(shuffeled);
  stage3 = shuffeled.splice(0,def[2]);

  return {stage1, stage2, stage3};

}


// function getRandomNum(min, max) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

getDifficulty();
shuffle.addEventListener('click', ()=>{
  shuffle.style.display = 'none';
})
// console.log(ancientsData[selectedCardIndex].cardFace);
// lastCard.style.backgroundImage = `url(${ancientsData[0].cardFace})`;

deck.addEventListener('click', getCard);

