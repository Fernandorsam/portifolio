const btnOpenModal  =  document.querySelector('#btn-open-modal');
const btnCloseModal =  document.querySelector('#btn-close-modal');
const fadeModal     =  document.querySelector('.fadeModal');
const modal         =  document.querySelector('.modal');
const containerSkillsIcon = document.querySelector('.containerSkillsIcon');
const iconSkills = Array.from(document.querySelectorAll('.iconSkills'));


function openMenu(){
   if(window.outerWidth <= 749){
      fadeModal.style.display = 'block';
       modal.style.display = 'block';
      }

}
function closeMenu(){

   fadeModal.style.display = '';
   modal.style.display = '';

}

btnOpenModal.addEventListener('click',() => openMenu());

[btnCloseModal,fadeModal].forEach((el) => el.addEventListener('click',() => closeMenu()));

if (window.outerWidth > 749) {
   modal.style.display  = 'block';

}
   

//percorre o cada icone de habilidades no DOM
iconSkills.forEach(function(icon){

   icon.addEventListener('click', function(){
      suffleEl(icon);

      setTimeout(returnOriginPosition,2000)
   })
})
 //funçao que faz o embaralhamento dos icones
 function suffleEl(){
    iconSkills.forEach(function(el){

       let randomX = Math.floor(Math.random() * 140) - 100;
       let randomY = Math.floor(Math.random() * 100) - 50;

       el.style.transform = `translate(${randomX}px, ${randomY}px)`;
    })
 }
 
 // função que retorna posição de origem após da execução do 'setTimeout()'
 function returnOriginPosition(){
    iconSkills.forEach(function(el){
       el.style.transform = 'translate(0,0)';
    })
 }
