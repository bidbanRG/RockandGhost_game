
var box = document.getElementById('box');
document.getElementById('maxscore').innerHTML = `<h3> Max Score: ${localStorage.getItem('maxscore') || 0} </h3>`; 
window.addEventListener('resize',() => {
    HEIGHT = window.innerHeight;
    WIDTH = window.innerWidth;
})

var HEIGHT = window.innerHeight;
var WIDTH = window.innerWidth;
var score = document.getElementById('score');
var above = 100;
var plate = document.getElementById('plate');
var plateX = 0;
var posX = Math.random() * WIDTH;
var posY = 0;
var velX = WIDTH < 768 ? 10 : 40;
var velY = WIDTH < 768 ? 10 : 38;
var plateH = WIDTH < 768 ? 20 : 40;
var plateW = WIDTH < 768 ? 100 : 150
var ghost = WIDTH < 768 ? 60 : 80
var monsterW = WIDTH < 768 ? "60" : "80"
let points = 0;


plate.style.top = `${HEIGHT - above}px`;
plate.style.left = `${plateX}px`

const Allmonsters = new Set();
alert(`Start the Game... Save the ghost from falling into the water...So Move the accordingly Rock v2`);
const MonsterPositions = new Map();
class Monster{
   
   #monster;

   constructor(posX,posY,velY){
      this.posY = posY;
      this.posX = posX;
      this.velY = velY;
       const board = document.querySelector('section');
        this.#monster = document.createElement('img');
       this.#monster.height = monsterW;
       this.#monster.width = monsterW;
       this.#monster.setAttribute('src',`mons${parseInt(Math.random() * 3)}.gif`);
       this.#monster.classList.add('monster');
       this.#monster.style.left = `${posX}px`
       board.prepend(this.#monster);
   }
  update(){
    
    this.#monster.style.top = `${this.posY + this.velY}px`;
    this.posY = this.posY + this.velY;
  }

  getpos(){
    return {x:this.posX,y:this.posY};
  }
  Destroy(){
    this.#monster.remove();
  }
 
}

function AddMonsters(){

   for(let i = 0; i < 7; i++){
       let mposX = Math.max( parseInt(Math.random() * WIDTH) - parseInt(monsterW),150);
       let mvelY = Math.max( parseInt(Math.random() * 15),5);
      Allmonsters.add(new Monster(mposX,0,mvelY));
   }
}     
AddMonsters();

function UpdateMonster(posX,posY){
    for(const monster of Allmonsters.values()){
       monster.update();
       const {x,y} = monster.getpos();
       if(y >= HEIGHT){
          Allmonsters.delete(monster);
          monster.Destroy();
          points = Math.max(points - 12,0);
       }else if(Math.abs(posY - y - 10) < ghost &&  Math.abs(posX - x - 10) < ghost ){
           Allmonsters.delete(monster);
          monster.Destroy();
          points = Math.max(points + 9,0);
       }
   }
}


const MouseMoveEvent = (e) => {
     var x = e.clientX;
     plateX = x;
     if(WIDTH >= 768){

        plate.style.left = `${x}px`  
     }
     
 }
const TouchMoveEvent = (event) => {
    var x = event.touches[0].clientX;
     plateX = x - (plateW) / 2;
     plateX = Math.max(plateX,0);
     plateX = Math.min(WIDTH - plateW,plateX);
     if(WIDTH < 768){

        plate.style.left = `${plateX}px`  
     }
  }   




const GameOn = () => {

   


    if(Allmonsters.size < 4){
        AddMonsters();
    }
    score.innerHTML = `<h3>  Score: ${points}  </h3>`;
   let passed = false;
     if(posX + ghost > WIDTH || posX < 0){
       velX = -velX;        
     }
     if(posY < 0){
       velY = -velY;
     }
      if(posX + ghost  > plateX && posX + ghost < plateX + plateW && posY + ghost >= HEIGHT - above ){
         
           velY = -velY;
        passed = true;
    }

    if(posY + ghost >= HEIGHT && !passed  ){
         
          box.firstElementChild.setAttribute('src','over.png');
          box.style.transform = `rotate(${ 135 * (velX < 0 ? -1 : 1) }deg)`
         
         clearInterval(Interval);
           window.removeEventListener('mousemove',MouseMoveEvent);
          window.removeEventListener('touchmove',TouchMoveEvent);
       if(points > localStorage.getItem('maxscore')){
         localStorage.setItem('maxscore',points);
          return  alert(`Game Over, But Hurray New MAX score ${points} :)`);
       }
         
        return  alert(` score ${points} :)`);
    }
     

     

    if(HEIGHT / 2 > posY){
        if(velY < 0)
        box.firstElementChild.setAttribute('src','g2.png');
        else box.firstElementChild.setAttribute('src','g3.png');
    }else{
        if(velY < 0)
            box.firstElementChild.setAttribute('src','g1.png');
        else box.firstElementChild.setAttribute('src','g4.png');
    }

UpdateMonster(posX,posY);

    posX += velX;
     posY += velY;

   
    box.style.left = `${posX}px`;
    box.style.top = `${posY}px`;

   

}


  window.addEventListener('mousemove',MouseMoveEvent);
window.addEventListener('touchmove',TouchMoveEvent);
var Interval = setInterval(GameOn,100);




// window.addEventListener('keydown',(e) => {
//     if(e.key === 'Enter'){
         
//           window.addEventListener('mousemove',MouseMoveEvent);
//           window.addEventListener('touchmove',TouchMoveEvent);
//           Interval = setInterval(GameOn,100);
       
//    }else if(e.key === 'F4'){
         
//          clearInterval(Interval);
//          window.removeEventListener('mousemove',MouseMoveEvent);
//          window.removeEventListener('touchmove',TouchMoveEvent);
          
//     }
// });