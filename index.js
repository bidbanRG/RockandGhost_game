
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
var plateX = 0;
plate.style.left = `${plateX}px`
let gamma = 0;
var moveX = 0;
var valX = WIDTH < 768 ? 20 : 40;
var moveY = 0;
var valY = WIDTH < 768 ? 15 : 38;

var plateH = WIDTH < 768 ? 20 : 40;
var plateW = WIDTH < 768 ? 100 : 150
var ghost = WIDTH < 768 ? 40 : 80
alert("Let's Start");


var ref = window.addEventListener('mousemove',(e) => {
 	 var x = e.clientX;
 	 plateX = x;
 	 if(WIDTH > 768){

        plate.style.left = `${x}px`  
 	 }
     
 })

	

	window.addEventListener("deviceorientation", handleOrientation, false);
   function handleOrientation(event) {
      
    if(WIDTH <= 768){
         gamma = event.gamma;
      	 plateX = plateX + parseInt((gamma / 50));
      	 plateX = Math.max(plateX,0);
      	 plateX = Math.min(plateX,WIDTH - plateW - 2);
      	 plate.style.left = `${plateX}px`
         
      } 
      
  }







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

