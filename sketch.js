var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;
 
var particles = [];
var plinkos = [];
var divisions=[];

var divisionHeight=300;
var score =0;
var turn=5;
var gameState="play";
localStorage["highScore"]=0;

function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;

  ground = new Ground(width/2,height,width,20);

   for (var k = 0; k <=width; k = k + 80) {
     divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
   }

   //create plinkoes
    for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,75));
    }

    for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,175));
    }

     for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,275));
    }

     for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,375));
    }
    
}
 


function draw() {
  background("black");
  Engine.update(engine);
  
   for (var i = 0; i < plinkos.length; i++) {
     plinkos[i].display();
   }
 
  for (var j = 0; j < particles.length; j++) {
     particles[j].display();
   }
   for (var k = 0; k < divisions.length; k++) {
     divisions[k].display();
   }

   //loop to increase the score by 500
   for(var i=0;i<=10;i=i+9){
     increaseScore(divisions[i],7510);
   }

   //increase score by 400
   for(var i=1;i<=8;i=i+7){
    increaseScore(divisions[i],6010);
  }

  //increase score by 300
  for(var i=2;i<=7;i=i+5){
    increaseScore(divisions[i],4510);
  }

  //increase score by 200
  for(var i=3;i<=6;i=i+3){
    increaseScore(divisions[i],3010);
  }

  //increse score by 100
  for(var i=4;i<=5;i=i+1){
    increaseScore(divisions[i],1510);
  }

   //to display score and highScore
   textSize(20);
   fill("yellow")
   text("SCORE  "+score,50,50)

   textSize(20);
   fill("yellow")
   text("HIGH SCORE  "+localStorage["highScore"],180,50)

   //to display num of turns left
   textSize(20);
   fill("yellow");
   text(turn+"  TURNS LEFT",600,50)

   var scorenum=600
   //to display how many score will you get for each bucket
   for(var i=25;i<=350;i=i+80){
    scorenum=scorenum-100;
    textSize(18);
    fill("pink");
    text(scorenum,i,600)
   }

   scorenum=600;
   for(var i=750;i>=425;i=i-80){
    scorenum=scorenum-100;
    textSize(18);
    fill("pink");
    text(scorenum,i,600)
   }

   //to end the game
   if(turn<=0 && particles[4].body.position.y>600&&particles[1].body.position.y>600&&particles[3].body.position.y>600){
     gameState="end";
   }

   if(gameState==="end"){
     textSize(40);
     fill("red");
     text("GAME OVER",300,240)

     textSize(35);
     fill("lightgreen")
     text("YOU SCORED  "+score,290,340)

     textSize(30);
     fill("white");
     text("press space to restart",290,440)
   }
   if(localStorage["highScore"]<score){
     localStorage["highScore"]=score;
  }
}

function mousePressed(){
  if(mouseY<100&&turn>0){
    particles.push(new Particle(mouseX, mouseY,10));
    turn--;
  }
}

function increaseScore(bucket,scoreIncriment){
  for(var i=0;i<particles.length;i++){
    if(particles[i].body.position.y>700){
      if(particles[i].body.position.x<bucket.body.position.x+80&&particles[i].body.position.x>bucket.body.position.x){
        particles[i].score(scoreIncriment);
   `` }
  ``}
  }
}

function keyPressed(){
  if(keyCode===32){
    gameState="play";
    score=0;
    turn=5;
    particles=[]; 
  }
}