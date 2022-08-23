// import ancientsData from "./ancients.js";

const cards = document.querySelectorAll('.ancient_card');

cards.forEach(element => {
  element.addEventListener('click', ()=>{
    if (element.classList.contains('active')){
      element.classList.remove('active');
    } else {
      cards.forEach( n=>n.classList.remove('active'));
      element.classList.add('active');
    }
    
  })
});