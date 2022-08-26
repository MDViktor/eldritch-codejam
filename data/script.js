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
    const totalGreenCards = qGreenCards.reduce((acc, num) => acc + num, 0);
    console.log(qGreenCards, totalGreenCards);

    getVisualStageSet();
    // getStageDeck();
    getSome(greenCards, qGreenCards);
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

function getStageDeck(){
  let RandomNum = getRandomNum(0,greenCards.length-1);
  console.log(RandomNum);
  console.log(greenCards[RandomNum].id);
  let stack = [];
  greenCards.forEach(element => { // создание массива по условию сложности
    // if(element.difficulty==='easy'){
    //   stack.push(element.id);
    // }
    stack.push(element.id); // набили стак всеми зелеными
  });
  let shuffeled = shuffeling(stack) // перемешали стак
  console.log(shuffeled, qGreenCards[0]);
  let stage1, stage2, stage3 = [];
  stage1 = shuffeled.splice(0,qGreenCards[0]); // отобрали карты из стака в первый уровень по условию мифа
  shuffeled = shuffeling(shuffeled); // перемешивание после отбора
  console.log(shuffeled);
  stage2 = shuffeled.splice(0, qGreenCards[1]); //отобрали карты из стака во второй уровень по условию мифа
  shuffeled = shuffeling(shuffeled); // перемешивание после отбора
  console.log(shuffeled);
  stage3 = shuffeled.splice(0, qGreenCards[2]); //отобрали карты из стака в третий уровень по условию мифа
  console.log(shuffeled);
  console.log(`shuffeled greens:${stage1}, ${stage2}, ${stage3}`);
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
  console.log(`shuffeled color:${stage1}, ${stage2}, ${stage3}`);
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



