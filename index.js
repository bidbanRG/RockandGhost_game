
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
var moveX = Math.random() * (WIDTH + 1);
var valX = WIDTH < 768 ? 10 : 40;
var moveY = 0;
var valY = WIDTH < 768 ? 10 : 38;

var plateH = WIDTH < 768 ? 20 : 40;
var plateW = WIDTH < 768 ? 100 : 150
var ghost = WIDTH < 768 ? 55 : 80
alert("Let's Start v2.1");


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
      	 plateX = plateX + (parseInt((gamma)) / 10);
      	 plateX = Math.max(plateX,0);
      	 plateX = Math.min(plateX,WIDTH - plateW - 2);
      	 plate.style.left = `${plateX}px`
         
      } 
      
  }







let Interval = setInterval(() => {
     moveX += valX;
     moveY += valY;
     if(moveY + ghost  >= HEIGHT){
         
    	  box.firstElementChild.setAttribute('src','over.png');
          box.style.transform = `rotate(${ 135 * (valX < 0 ? -1 : 1) }deg)`
         
         clearInterval(Interval);

    	  return  alert("GameOver");
      
    }
    
  else{
   
     if(moveX + ghost > WIDTH || moveX < 0){
       valX = -valX;    	
    }
      if( moveY < 0 || moveX + ghost  > plateX && moveX + ghost < plateX + plateW && moveY + ghost >= HEIGHT - above ){
          	valY = -valY;
    }
     
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

},100)

