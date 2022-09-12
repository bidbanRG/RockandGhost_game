// var canvas = document.querySelector('canvas');

// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;


// var ctx = canvas.getContext('2d');

// // ctx.fillRect(100,100,100,100);
// //ctx.fillStyle = 'color';
// ctx.beginPath();


// // for(let x = 50; x < canvas.height   ; x += 10){
// // ctx.moveTo(x,x);
// // ctx.lineTo(x+5,x+5);
// // ctx.stroke();
// // ctx.strokeStyle = 'teal';
// // }
 


//  var x = 400;
//  var y = 400;
// var dirX = 5;
// var dirY = 3;

// // window.addEventListener('mousemove', (event) => {
// // 	x = event.x;
// // 	y = event.y;
// // })

//  function animate(){

//     requestAnimationFrame(animate);
   
//      ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
//     ctx.beginPath();
//     ctx.strokeStyle = 'teal';
//     ctx.arc(x,y,30, Math.PI * 2,false);

//     ctx.stroke();

//     x += dirX;
//     y += dirY;
    
//     if(x + 30 >= window.innerWidth || x - 30 < 0 )
//     	dirX = dirX * -1;
    
//     if(y + 30 >= window.innerHeight || y - 30 < 0 )
//    	    dirY = dirY * -1;




//  }
// animate();

// console.log(ctx);



// var plate = document.getElementById('plate');
// var plateCTX = plate.getContext('2d');

// console.log(plateCTX);


let WIDTH = parseInt(window.innerWidth);
let HEIGHT = parseInt(window.innerHeight);
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let plateX = WIDTH/2 - 75;

//   const image = new Image();
// image.src = 'back.png';
// console.log(image);
// image.addEventListener('load', () => {
//   ctx.drawImage(image, 0, 0, WIDTH, HEIGHT);
// })



 var x = 400;
 var y = 400;
var dirX = 14;
var dirY = 10;
var plateWidth = 150;
var plateHeight = 40;
var Radius = 80;

let InterVal = setInterval(() => {
   Radius += 5;
   plateWidth -= 7;
 
},10000)


class Ghost {
    
   
   constructor(x,y,len,HEIGHT){
      this.x = x;
      this.y = y;
      this.len = len;
      this.HEIGHT = HEIGHT; 
   }

   draw(url){
        const ghost = new Image();

         ghost.src = url;
  
     
     ctx.drawImage(ghost,this.x,this.y,this.len,this.len);
   }
   update(x,y,Radius,HEIGHT){
      this.x = x;
      this.y = y;
      this.len = Radius;
   }

}


const ghost = new Ghost(x,y,Radius,HEIGHT)




 function animate(){

    
     ref = window.requestAnimationFrame(animate);
     ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
    ctx.beginPath();

     const image = new Image();
       image.src = 'back.png';
       ctx.drawImage(image,0,0,WIDTH, HEIGHT);
      

     ghost.update(x,y,Radius,HEIGHT);

 const ghost = new Image();
    
        ghost.src = "q1.png";
  
   
   
     if(y / 2 >= HEIGHT){
       ctx.drawImage(ghost,0,0,150,150,x,y,Radius,Radius);
     }
   else ctx.drawImage(ghost,0,150,150,150,x,y,Radius,Radius);


 ctx.fillStyle = 'blue';

ctx.fillRect(plateX,HEIGHT - 100,plateWidth,plateHeight);


 ctx.stroke();

    x += dirX;
    y += dirY;

    if(y + Radius >= HEIGHT ){
    	alert('GameOver :(');
    	clearInterval(InterVal);
       window.cancelAnimationFrame(ref);
    	return;
    }
    if( y + Radius >= HEIGHT && (plateX > x || plateX + plateWidth < x))
       dirX = dirX * -1;
    if( y  <= 0  || y + Radius >= HEIGHT - 100  && plateX <= x + (Radius) / 2  && plateX + plateWidth >= x + (Radius) / 2 )
 	            dirY = dirY * -1;
            
    if(x + Radius >= window.innerWidth || x <= 0  )
    	dirX = dirX * -1;
   

}


var ref;


  
window.addEventListener('keydown', (e) => {
   console.log(e.key);

   let mouseEvent;
   if(e.key === 'Enter'){
          mouseEvent = (event) => {
            let {x,y} = event;
            plateX = x;
        }
      window.addEventListener('mousemove',mouseEvent);
     animate();
  
}
   else if(e.key === 'F4'){
    window.cancelAnimationFrame(ref);
    window.removeEventListener('mousemove',mouseEvent);
     
   }
});
alert('start')

