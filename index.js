
var box = document.getElementById('box');
let version = "3";
var HEIGHT = window.innerHeight;
var WIDTH = window.innerWidth;
var score = document.getElementById('score');
document.getElementById('maxscore').innerHTML = `<h3> Max Score: ${localStorage.getItem('maxscore') || 0} </h3>`; 
window.addEventListener('resize',() => {
	HEIGHT = window.innerHeight;
	WIDTH = window.innerWidth;
})
 var above = 100;

var plate = document.getElementById('plate');
plate.style.top = `${HEIGHT - above}px`;
var plateX = 0;
plate.style.left = `${plateX}px`
let gamma = 0;
var moveX = Math.random() * (WIDTH + 1);
var valX = WIDTH < 768 ? 10 : 40;
var moveY = 0;
var valY = WIDTH < 768 ? 10 : 38;

var plateH = WIDTH < 768 ? 20 : 40;
var plateW = WIDTH < 768 ? 100 : 150
var ghost = WIDTH < 768 ? 55 : 80
alert(`Let's Start version${version}`);


var ref = window.addEventListener('mousemove',(e) => {
 	 var x = e.clientX;
 	 plateX = x;
 	 if(WIDTH > 768){

        plate.style.left = `${x}px`  
 	 }
     
 })

	plate.addEventListener("drag",(e) => {
        console.log('gragging',e);
    })

	// window.addEventListener("deviceorientation", handleOrientation, false);
 //   function handleOrientation(event) {
      
 //    if(WIDTH <= 768){
 //         gamma = event.gamma;
 //      	 plateX = plateX + (parseInt((gamma)) / 10);
 //      	 plateX = Math.max(plateX,0);
 //      	 plateX = Math.min(plateX,WIDTH - plateW - 2);
 //      	 plate.style.left = `${plateX}px`
         
 //      } 
      
 //  }

 window.addEventListener('touchmove',(event) => {
    var x = event.touches[0].clientX;
     plateX = x;
     if(WIDTH < 768){

        plate.style.left = `${x}px`  
     }
 })



let TIME = 100;
let points = 0;
point = 0;
let Interval = setInterval(() => {


   if(TIME % 10000 === 0){

    valX = (valX < 0 ? -1 : 1) * Math.abs(valX) + (valX < 0 ? -1 : 1) * (WIDTH < 768 ? 1 : 2);
    valY = (valY < 0 ? -1 : 1) * Math.abs(valY) + (valY < 0 ? -1 : 1) * (WIDTH < 768 ? 2 : 4);
         point = point + (TIME / 10000) + 10;
         points += point;
        score.innerHTML = `<h3>  Score: ${points}  </h3>`;
   }

     moveX += valX;
     moveY += valY;
   let passed = false;
     if(moveX + ghost > WIDTH || moveX < 0){
       valX = -valX;    	
     }
      if( moveY < 0 || moveX + ghost  > plateX && moveX + ghost < plateX + plateW && moveY + ghost >= HEIGHT - above ){
          	valY = -valY;
            passed = true;
    }

if(moveY + ghost >= HEIGHT && !passed  ){
         
          box.firstElementChild.setAttribute('src','over.png');
          box.style.transform = `rotate(${ 135 * (valX < 0 ? -1 : 1) }deg)`
         
         clearInterval(Interval);
       if(points > localStorage.getItem('maxscore')){
         localStorage.setItem('maxscore',points);
          return  alert(`Game Over, But Hurray New MAX score ${points} :)`);
       }

        return  alert(` score ${points} :)`);
    }
     

     

    if(HEIGHT / 2 > moveY){
    	if(valY < 0)
    	box.firstElementChild.setAttribute('src','g2.png');
        else box.firstElementChild.setAttribute('src','g3.png');
    }else{
    	if(valY < 0)
    		box.firstElementChild.setAttribute('src','g1.png');
    	else box.firstElementChild.setAttribute('src','g4.png');
    }

 

	box.style.left = `${moveX}px`;
	box.style.top = `${moveY}px`;

    TIME += 100;

},100)

