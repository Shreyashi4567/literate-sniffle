var PLAY = 1;
var END = 0;
var gameState = PLAY;
var background,backgroundImg,marioImg,mario,invisibleGround,time=150;
var score = 0;
var lives = 3;
function preload()
{
    backgroundImg = loadImage("Background.jpg");
    marioImg = loadAnimation("run1.png","run2.png","run3.png","run4.png");
    jumpSound = loadSound("Jump.wav");
    mushroomImg = loadImage("mush4.png");
    pipeImg = loadImage("pipe.png");
    gameOverSound = loadSound("smb_gameover.wav");
    signImg = loadImage("sign.png");
    cloudImg = loadImage("cloud2.png");
    qImg = loadImage("question mark.png");
   // coinImg = loadImage("");
}
function setup()
{
    createCanvas(displayWidth-20,displayHeight-150);
    background=createSprite(155,50);
    background.addImage(backgroundImg);
    background.scale = 1.9;
    mario=createSprite(50,390,50,50);
    mario.addAnimation("running",marioImg);
    mario.scale = 0.07;
    invisibleGround=createSprite(70,450,3000,20);
    invisibleGround.visible=false;
    mushroomGroup = createGroup();
    sign = createSprite(120,60,50,50);
    sign.addImage(signImg);
    sign.scale = 0.2;
}
function draw()
{
    if(gameState===1)
    {
    background.velocityX=-3;
    if(background.x<0)
    {
        background.x=background.width/2;
    }
    if(keyDown(UP_ARROW)&&mario.y>250)
    {
      mario.velocityY=-10;
      jumpSound.play();
    }
    mario.velocityY=mario.velocityY+0.5;
    mario.collide(invisibleGround);
    if(frameCount%100===0)
    {
      score = score + 100;
    }
    if(mushroomGroup.collide(mario))
    {
      lives = lives - 1;
    }
    drawSprites();
    spawnMushroom();
    spawnPipes();
    spawnClouds();
    spawnBlocks();
    //To decrease the time:-
    if(frameCount%50===0)
    {
        time = time-1;
    }
    if(lives===0)
    {
      gameState = 0;
    }
    /*if(mario.isTouching(q))
    {
      coin=createSprite(q.x,q.y,q.width,q.height);
      coin.addImage(coinImg);
      q.destroyEach();
      score = score + 200;
    }*/
    //To display the score:-
    strokeWeight(4);
    stroke("black");
    fill("white");
    textSize(30);
    text("Score: "+score,displayWidth-300,50);
    text("Time: "+time,displayWidth-600,50);
    text("Lives: "+lives,displayWidth-900,50);
  }
    if(gameState===0)
    {
      textSize(50);
      stroke("Green");
      fill("Green");
      text("Game Over",200,200);
    }
}
function spawnMushroom()
{
  if(frameCount%800===0)
    {
      mushroom=createSprite(displayWidth,420,50,50);
      mushroom.addImage(mushroomImg);
      mushroom.scale=0.1;
      mushroom.velocityX=-4;
      mushroomGroup.add(mushroom);
    }
}
function spawnPipes()
{
  if(frameCount%250===0)
    {
      pipe=createSprite(displayWidth,385,50,Math.round(random(20,150)));
      pipe.velocityX=-3;
      pipe.addImage(pipeImg);
      pipe.scale = 0.05;
      rand=Math.round(random(1,4));
      switch(rand)
      {
        case 1:
        case 2:
        case 3:
        case 4:
      }
      if(mario.isTouching(pipe))
      {
        mario.velocityY=0;
      }
    }
}
function spawnBlocks()
{
  if(frameCount%1500===0)
  {
    q = createSprite(displayWidth,displayHeight-600,20,20);
    q.addImage(qImg);
    q.scale = 0.05;
    q.velocityX = -4;
  }
}
function spawnClouds()
{
  if(frameCount%300===0)
  {
    cloud = createSprite(displayWidth,displayHeight-700,20,20);
    cloud.addImage(cloudImg);
    cloud.scale=0.3;
    cloud.velocityX=-3;
  }
}
/*function bringPole()
{
  if(frameCount%200000===0)
  {
    pole = createSprite(displayWidth,)
  }
}
/*40-{15-(7-3 of 2)} 
=> 40-{15-(7-3 * 2)} 
=> 40-{15-(7-6)} 
=> 40-{15-1)} 
=> 40-14 
=> 26*/