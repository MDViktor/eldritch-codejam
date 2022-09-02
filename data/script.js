import ancientsData from "./ancients.js";
import { brownCards, blueCards, greenCards } from "./mythicCards/index.js";

var copyGreenCards ;
var copyBlueCards ;
var copyBrownCards ;
const cards = document.querySelectorAll('.ancient_card');
const difficulty = document.querySelectorAll('.difficulty');
const secondPhase = document.querySelector('.second_phase');
const thirdPhase = document.querySelector('.third_phase');
const shuffle = document.querySelector('.shuffle');
const deck = document.querySelector('.deck');
const deckContainer = document.querySelector('.deck_container');
const lastCard = document.querySelector('.last_card');
const greenDots = document.querySelectorAll('.dot.green');
const brownDots = document.querySelectorAll('.dot.brown');
const blueDots = document.querySelectorAll('.dot.blue');
var selectedDifficulty;
var selectedCardIndex;
var sDeck;
var deckStack;
var qGreenCards;
var qBrownCards;
var qBlueCards;
var lastCardId;
var greenDotsNumber;
var blueDotsNumber;
var brownDotsNumber;

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


  })
});

// добавляет карты из объекта колода в стэк колода
function getDeckStack () {
  deckStack = [];
  for (let stage in sDeck){
    deckStack.push(sDeck[stage]);
  }
  deckStack = deckStack.flat().reverse();
  console.log(deckStack);
  return deckStack;
}
// перемешивает каждый уровень объекта колоды
function getShuffeledDeck() {
  // console.log(getDiff());
  // // copyGreenCards = getDiff();
  // console.log(copyGreenCards);
  greenDotsNumber = getSome(copyGreenCards, qGreenCards);
  blueDotsNumber = getSome(copyBlueCards, qBlueCards);
  brownDotsNumber = getSome(copyBrownCards, qBrownCards);
  sDeck = merge_decks(greenDotsNumber, blueDotsNumber, brownDotsNumber);
    sDeck.stage1 = shuffeling(sDeck.stage1);
    sDeck.stage2 = shuffeling(sDeck.stage2);
    sDeck.stage3 = shuffeling(sDeck.stage3);
    return sDeck
}
// функция перемешивания
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
// визуализация выборов карт и сложностей
function difficultyChoise () {
  difficulty.forEach(element => {
    element.addEventListener('click', (event)=>{
      if (!element.classList.contains('active')){
        difficulty.forEach( n=>n.classList.remove('active'));
        element.classList.add('active');
        thirdPhase.style.display = 'block';
        getDifficultySelect();
        getDiff1();
      } 
    })
  });
  
}
function getDiff1(){
  // console.log(selectedDifficulty + 'test!');
  if (selectedDifficulty === 'Normal'){
    copyGreenCards = greenCards;
    copyBlueCards = blueCards;
    copyBrownCards = brownCards;
    getShuffeledDeck();
    getDeckStack();
  }
  if (selectedDifficulty === 'Hard'){
    copyGreenCards = greenCards;
    copyBlueCards = blueCards;
    copyBrownCards = brownCards;
    for (let i=0; i<greenCards.length; i++){
        
        if (copyGreenCards[i].difficulty === 'easy'){
          copyGreenCards.splice(i,1,'');
        }
    }
    for (let i=0; i<blueCards.length; i++){
        
        if (copyBlueCards[i].difficulty === 'easy'){
          copyBlueCards.splice(i,1,'');
        }
    }
    for (let i=0; i<brownCards.length; i++){
        
        if (copyBrownCards[i].difficulty === 'easy'){
          copyBrownCards.splice(i,1,'');
        }
    }
    console.log(copyGreenCards);
    getShuffeledDeck();
    getDeckStack();
  }
  if (selectedDifficulty === 'Easy'){
    copyGreenCards = greenCards;
    copyBlueCards = blueCards;
    copyBrownCards = brownCards;
    for (let i=0; i<greenCards.length; i++){
        
        if (copyGreenCards[i].difficulty === 'hard'){
          copyGreenCards.splice(i,1,'');
        }
    }
    for (let i=0; i<blueCards.length; i++){
        
        if (copyBlueCards[i].difficulty === 'hard'){
          copyBlueCards.splice(i,1,'');
        }
    }
    for (let i=0; i<brownCards.length; i++){
        
        if (copyBrownCards[i].difficulty === 'hard'){
          copyBrownCards.splice(i,1,'');
        }
    }
    console.log(copyGreenCards);
    getShuffeledDeck();
    getDeckStack();
  }
  if (selectedDifficulty === 'Very easy'){
    copyGreenCards = [];
    copyBlueCards = [];
    copyBrownCards = [];

    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    let sumGreen = qGreenCards.reduce(reducer);
    let sumBlue = qBlueCards.reduce(reducer);
    let sumBrown = qBrownCards.reduce(reducer);
    
    for (let i=0; i<greenCards.length; i++){
      if (greenCards[i].difficulty === 'easy'){
        copyGreenCards.push(greenCards[i]);
      }
    }
    if (copyGreenCards.length < sumGreen){
      for (let i=0; i<greenCards.length; i++){
        if (greenCards[i].difficulty === 'normal'){
          copyGreenCards.push(greenCards[i]);
          if(copyGreenCards.length === sumGreen){
            break;
          }
        }
      }
    }

    for (let n=0; n<blueCards.length; n++){
      if (blueCards[n].difficulty === 'easy'){
        copyBlueCards.push(blueCards[n]);
      }
    }
    if (copyBlueCards.length < sumBlue){
      for (let n=0; n<blueCards.length; n++){
        if (blueCards[n].difficulty === 'normal'){
          copyBlueCards.push(blueCards[n]);
          if(copyBlueCards.length === sumBlue){
            break;
          }
        }
      }
    }

    for (let z=0; z<brownCards.length; z++){
      if (brownCards[z].difficulty === 'easy'){
        copyBrownCards.push(brownCards[z]);
      }
    }
    if (copyBrownCards.length < sumBrown){
      for (let z=0; z<brownCards.length; z++){
        if (brownCards[z].difficulty === 'normal'){
          copyBrownCards.push(brownCards[z]);
          if(copyBrownCards.length === sumBrown){
            break;
          }
        }
      }
    }
    console.log(copyBlueCards, copyGreenCards, copyBrownCards);
    getShuffeledDeck();
    getDeckStack();
  }
  if (selectedDifficulty === 'Very hard'){
    copyGreenCards = [];
    copyBlueCards = [];
    copyBrownCards = [];

    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    let sumGreen = qGreenCards.reduce(reducer);
    let sumBlue = qBlueCards.reduce(reducer);
    let sumBrown = qBrownCards.reduce(reducer);
    
    for (let i=0; i<greenCards.length; i++){
      if (greenCards[i].difficulty === 'hard'){
        copyGreenCards.push(greenCards[i]);
      }
    }
    if (copyGreenCards.length < sumGreen){
      for (let i=0; i<greenCards.length; i++){
        if (greenCards[i].difficulty === 'normal'){
          copyGreenCards.push(greenCards[i]);
          if(copyGreenCards.length === sumGreen){
            break;
          }
        }
      }
    }

    for (let n=0; n<blueCards.length; n++){
      if (blueCards[n].difficulty === 'hard'){
        copyBlueCards.push(blueCards[n]);
      }
    }
    if (copyBlueCards.length < sumBlue){
      for (let n=0; n<blueCards.length; n++){
        if (blueCards[n].difficulty === 'normal'){
          copyBlueCards.push(blueCards[n]);
          if(copyBlueCards.length === sumBlue){
            break;
          }
        }
      }
    }

    for (let i=0; i<brownCards.length; i++){
      if (brownCards[i].difficulty === 'hard'){
        copyBrownCards.push(brownCards[i]);
      }
    }
    if (copyBrownCards.length < sumBrown){
      for (let i=0; i<brownCards.length; i++){
        if (brownCards[i].difficulty === 'normal'){
          copyBrownCards.push(brownCards[i]);
          if(copyBrownCards.length === sumBrown){
            break;
          }
        }
      }
    }
    
    getShuffeledDeck();
    getDeckStack();
  }
}
/// функция перемешивания списка
function shuffeling(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); 
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
// отнимает от миниколоды по цвету значение вынутой карты
function getDiffLastCard(dots){
  let temp = dots;
  for (let val in temp){
    for (let j in temp[val]){
      if(temp[val][j] === lastCardId){
        temp[val].splice(temp[val].indexOf(lastCardId),1);
      }
    }
  }
  return temp
}
// трекер 
function tracker (){
  let green = getDiffLastCard(greenDotsNumber);
  let blue = getDiffLastCard(blueDotsNumber);
  let brown = getDiffLastCard(brownDotsNumber);
  let i = 0;
  let j = 0;
  let k = 0;
  for (let val in green){
    greenDots[i].textContent = green[val].length;
    i++;
  }
  for (let val in blue){
    blueDots[j].textContent = blue[val].length;
    j++;
  }
  for (let val in brown){
    brownDots[k].textContent = brown[val].length;
    k++;
  }
}

// визуализация кнопки замешивания
function getDifficultySelect() {
  cards.forEach(element => {
    if (element.classList.contains('active')){
      secondPhase.style.display = 'block';
      difficultyChoise();
    }

  });
  difficulty.forEach(element => {
    if (element.classList.contains('active')){
      selectedDifficulty = element.textContent;
      
    }
  });
  if(selectedDifficulty){
    console.log(selectedDifficulty);


  }
  setTimeout(getDifficultySelect, 500)
}

// взятие карты из колоды
function getCard() {
  let result = '';
  lastCardId = deckStack.pop();
  for (let keys in greenCards) {
    for (let val in greenCards[keys]){
      if (greenCards[keys][val] === lastCardId) {
        console.log(greenCards[keys].cardFace);
        result = greenCards[keys].cardFace
      }
    }
  }
  for (let keys in blueCards) {
    for (let val in blueCards[keys]){
      if (blueCards[keys][val] === lastCardId) {
        console.log(blueCards[keys].cardFace);
        result = blueCards[keys].cardFace
      }
    }
  }
  for (let keys in brownCards) {
    for (let val in brownCards[keys]){
      if (brownCards[keys][val] === lastCardId) {
        console.log(brownCards[keys].cardFace);
        result = brownCards[keys].cardFace
      }
    }
  }

  let lastCardFacePath = `url(${result})`
  lastCard.style.backgroundImage = lastCardFacePath;
  console.log(deckStack, lastCardId, deckStack.length);
  tracker();
}

// получение пути выбранного мифа
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
// возвращает миниколоду по цвету по условию мифа в виде объекта разбитого на 3 уровня принимая весь набор карт и условие 
function getSome(arr, def){
  let stack = [];
  // arr.forEach(element => {
  //   stack.push(element.id);
  // });
  for (let i=0;i<arr.length;i++){
    if (arr[i] !== ''){
      stack.push(arr[i].id);
    }
  }
  let shuffeled = shuffeling(stack);
  let stage1, stage2, stage3 = [];
  stage1 = shuffeled.splice(0,def[0]);
  shuffeled = shuffeling(shuffeled);
  stage2 = shuffeled.splice(0,def[1]);
  shuffeled = shuffeling(shuffeled);
  stage3 = shuffeled.splice(0,def[2]);
  return {stage1, stage2, stage3};

}

getDifficultySelect();


shuffle.addEventListener('click', ()=>{
  shuffle.style.display = 'none';
  deckContainer.style.display = 'flex';
})


deck.addEventListener('click', getCard);

