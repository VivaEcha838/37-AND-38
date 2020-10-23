var PLAY=1;
var END=0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;

var gameOver,restart;
var Overani, restani;

var calming

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  Overani = loadImage("gameOver.png");
  restani = loadImage("restart.png")

  calming = loadImage("Calm.jpg"); 
}

function setup() {
  createCanvas(displayWidth, displayHeight);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  
  trex.scale = 0.5;
  trex.velocityX = 1;
  trex.velocityY = 0;

  camera.position.x = trex.x;
  camera.position.y = trex.y;
  
  ground = createSprite(200,180,displayWidth*1000,displayHeight - 100);
  ground.addImage("ground",groundImage);
  
  
  
  invisibleGround = createSprite(displayWidth*500,190,displayWidth*1000,10);
   
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
  
  gameOver = createSprite(300,55);
  restart = createSprite(300,100);
  gameOver.addImage("Over",Overani);
  gameOver.scale = 0.5;
  restart.addImage("redo",restani);
  restart.scale = 0.5;
  
  gameOver.visible = false;
  restart.visible = false;
  
  
}

function draw() {
  background(calming);
  trex.collide(invisibleGround);
  if (gameState===PLAY){
  score = score + Math.round(getFrameRate()/60);
  text("Score: "+ score, 500,50);

  camera.position.x = trex.x;
  //camera.position.y = trex.y - 20;
  
  
  if(keyDown("space")&&trex.y>161) {
    trex.velocityY = -15;
  }
  
  trex.velocityY = trex.velocityY + 0.8
  console.log(invisibleGround.y)
  console.log(trex.y);
  console.log(displayHeight);
  
  
 
  spawnClouds();
  spawnObstacles();
 if(trex.isTouching(obstaclesGroup)){
     gameState = END;
     }
  }
  
 
  else if(gameState===END){
   trex.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0); 
    
    
    gameOver.visible = true;
    restart.visible = true;
    
    
    
    trex.addImage("end",trex_collided);
    
     obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
    reset();
  }
    
  }
  
  
  drawSprites();
}

function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeImage("running",trex_running);
  
  score = 0;
  
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(displayWidth,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 500;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(displayWidth,165,10,40);
    obstacle.velocityX = -4;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 400;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}