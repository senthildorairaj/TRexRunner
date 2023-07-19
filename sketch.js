var trex,trexImg,trexCollidedImg;

var invisiblegtound;

var ground, groundImg;

var cloud, cloudImg;
var obstacle
var gameover, gameoverImg;
var restart, restartImg;
var obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6


var obstacle ;

var obstacleGroup;

var cloudGroup;


var gamestate;

var jumpsound;

var checkpointsound;

var diesound;

var score;

function preload(){
  trexImg= loadAnimation("trex1.png","trex3.png","trex4.png" )
  trexCollidedImg=loadAnimation("trex_collided.png")
  groundImg= loadImage("ground2.png")
  cloudImg=loadImage("cloud.png");
  obstacle1=loadImage("obstacle1.png")
  obstacle2=loadImage("obstacle2.png")
  obstacle3=loadImage("obstacle3.png")
  obstacle4=loadImage("obstacle4.png")
  obstacle5=loadImage("obstacle5.png")
  obstacle6=loadImage("obstacle6.png")
  restartImg=loadImage("restart.png")
  gameoverImg=loadImage("gameOver.png")   
  jumpsound=loadSound("jump.mp3")
  checkpointsound=loadSound("checkpoint.mp3")
  diesound=loadSound("die.mp3")
}

function setup(){
  
  createCanvas(600, 200);
  
  ground=createSprite(300, 165);
  ground.addImage( groundImg);
 

  trex=createSprite(50, 150  ,10,10);
  trex.addAnimation("running",trexImg);
  trex.addAnimation("end",trexCollidedImg);
  trex.scale=0.4

  invisibleground=createSprite(300, 170, 600, 1)
  invisibleground.visible=false;


  gameover=createSprite(300, 80)
  gameover.addImage(gameoverImg)
  gameover.scale=0.5
  
  restart=createSprite(300, 120)
  restart.addImage(restartImg)
  restart.scale=0.5

  gameover.visible=false;
  restart.visible=false;

  obstacleGroup=createGroup()

  cloudGroup=createGroup()
  
  gamestate="play";
  
  score=0
}



function draw(){
  background("black")

  fill ("white")
  textSize(15)
  text("score: "+ score,500, 30)


  if(gamestate=="play"){

    score=score+Math.round(frameRate() / 60)

    if(score % 100==0){
      checkpointsound.play()
    }


    if (ground.x<0){
      ground.x=ground.width/2;
    }

    ground.velocityX=-(4+score/100)
    gameover.visible=false;
    restart.visible=false;

    if(keyDown("space") && trex.y>135){
      trex.velocityY=-13;
      jumpsound.play()
    }
    cloudspawner()

    obstaclespawner()

    trex.changeAnimation("running",trexImg);

    if(trex.isTouching(obstacleGroup)){
      gamestate="end"
      diesound.play()
      
    }

  }
  if(gamestate=="end"){
    ground.velocityX=0;
    gameover.visible=true
    restart.visible=true
    cloudGroup.setVelocityXEach(0)
    obstacleGroup.setVelocityXEach(0)

    trex.changeAnimation("end",trexCollidedImg);

    if(mousePressedOver(restart)){
       reset()
    }
    
  }
 
  
  
  trex.velocityY=trex.velocityY+1
  trex.collide(invisibleground)

  drawSprites()
  
}

function cloudspawner(){
 if (frameCount % 50 == 0) {
  cloud=createSprite(600, 100)
  cloud.addImage(cloudImg)
  cloud.velocityX=-(5+score/100)
  cloud.y=random(30, 100)
  cloud.scale=random(0.4,0.8)
  trex.depth=cloud.depth+1;

  cloudGroup.add(cloud)
  
 }
}

function obstaclespawner(){
  if (frameCount % 70 == 0){
    obstacle=createSprite(600,160 )
    obstacle.velocityX=-(5+score/100)
    obstacle.scale=0.45

    obstacleGroup.add(obstacle)
    
    var rand= Math.round(random(1,6))
    
    switch(rand){
      case 1:obstacle.addImage(obstacle1);
      break;
      case 2:obstacle.addImage(obstacle2);
      break;
      case 3:obstacle.addImage(obstacle3);
      break;
      case 4:obstacle.addImage(obstacle4);
      break;
      case 5:obstacle.addImage(obstacle5);
      break;
      case 6:obstacle.addImage(obstacle6);
      break;
   
      
    
    }
  }
}
function reset(){
  gamestate="play"
  score=0
  obstacleGroup.destroyEach()
  cloudGroup.destroyEach()
  
}