
var box = document.getElementById('box');

var HEIGHT = window.innerHeight;
var WIDTH = window.innerWidth;

window.addEventListener('resize',() => {
	HEIGHT = window.innerHeight;
	WIDTH = window.innerWidth;
})
 var above = 100;

var plate = document.getElementById('plate');
plate.style.top = `${HEIGHT - above}px`;
var plateX = WIDTH / 2 - (plateW / 2);
let alpha = 0;

var ref = window.addEventListener('mousemove',(e) => {
 	 var x = e.clientX;
 	 plateX = x;
 	 if(WIDTH > 768){

        plate.style.left = `${x}px`  
 	 }
     
 })

	

	window.addEventListener("deviceorientation", handleOrientation, true);
   function handleOrientation(event) {
      
    if(WIDTH <= 768){
         alpha = event.alpha;
      	 plateX = plateX + parseInt(alpha * 5);
         document.querySelector('h4').innerText = alpha + "->" + plateX;
      } 
      
  }



var moveX = 0;
var valX = 45;
var moveY = 0;
var valY = 38;

var plateH = WIDTH < 768 ? 20 : 40;
var plateW = WIDTH < 768 ? 100 : 150
var ghost = WIDTH < 768 ? 40 : 80
alert("Let's Start");



let Interval = setInterval(() => {
     
     if(moveY + 80 + 30 >= HEIGHT){
         
    	  box.firstElementChild.setAttribute('src','over.png');
          box.style.transform = `rotate(${ 135 * (valX < 0 ? -1 : 1) }deg)`
      
         clearInterval(Interval);

    	  return  alert("GameOver");
      
    }
    

   
     if(moveX + 90 > WIDTH || moveX < 0){
       valX = -valX;    	
    }
      if( moveY < 0 || moveX + ghost  > plateX && moveX + ghost < plateX + plateW && moveY + ghost >= HEIGHT - above - 10){
          	valY = -valY;
    }
     

     moveX += valX;
     moveY += valY;

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

},100)

