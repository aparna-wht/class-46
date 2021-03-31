var END = 0;
var PLAY = 1;
var gameState = PLAY;
var moon,moonImg;
var distance = 0;
var edges;
var gameOver, gameOverImage, pathImg, path, alive, aliveimg, deadimg, knife, knifeimg;

function preload(){

  pathImg = loadImage("images/sketch.jpg");
  
  gameOverImage = loadImage("images/soldier.gif");
  //aliveimg = loadImage("images/alive.png");
  aliveimg = loadImage("images/boy.gif");
  deadimg = loadImage("images/dead.png");
  knifeimg = loadImage("images/knife.png");
  moonImg = loadImage("images/moon.png")
}

function setup(){
  
createCanvas(displayWidth-25,displayHeight-180);

path = createSprite(0,350);
//path = createSprite(0,350)
path.addImage(pathImg);
path.x = path.width/2
//path.scale=1.7;
path.scale=1.2;

alive  = createSprite(0, 0, 20, 20);
alive.addAnimation("player", aliveimg);
alive.addAnimation("bone", deadimg);
alive.scale = 0.5;
 
moon= createSprite(displayWidth-400,100);
moon.addImage(moonImg);
moon.scale=0.5;



KnifeGroup = new Group();

gameOver = createSprite(displayWidth, displayHeight-300);

gameOver.addImage(gameOverImage);

  gameOver.scale = 0.5;
  //gameOver.visible = false;

}

function draw(){

  background("black");
  
  drawSprites();
  textSize(50);
  fill(255);
  text("🌟"+ distance, 400,50);
 //text("🌟",200,200);
  if(gameState===PLAY){
    
    distance = distance + Math.round(getFrameRate()/60);
    
    alive.y = World.mouseY;
   
    camera.position.x = alive.x+500;
   
    path.velocityX = -4;
    gameOver.velocityX = -4;
   
    if(path.x < 0 ){

      path.x = width/2;

    }

    alive.changeAnimation("player", aliveimg);
      
    Knife();

    if(KnifeGroup.isTouching(alive)){

      gameState = END;

    }

  }
    
  else if(gameState === END){

    gameOver.visible = true;

    textSize(20);
    fill(255);
    text("Press Up Arrow to Restart the game!", camera.position.x-100,displayHeight-500);
  
    alive.changeAnimation("bone", deadimg);

    path.velocityX = 0

    KnifeGroup.destroyEach();
    
    if(keyDown("UP_ARROW")) {

      reset();

    }

  }

}

function Knife(){
  
  if(World.frameCount % 250 == 0){

    knife = createSprite(displayWidth, random(displayHeight-240, displayHeight-750));
    knife.addImage(knifeimg);

    knife.velocityX = -(10 + distance/100);
    knife.scale = 0.1;
    knife.setLifetime = 220;

    KnifeGroup.add(knife);

  }

}

function reset(){

  gameState = PLAY;
  gameOver.visible = false;
  
  distance = 0;

}
