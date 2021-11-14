//creating the world and engine
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

// all the variables

var engine, world, backgroundImg;
var canvas, angle, tower, ground, cannon;
var cannonBall;
var balls = []

// function preload

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
}

//function setup
function setup() {
  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  

//default angle for cannon
  angleMode(DEGREES);
  angle = 15;

  // adding the ground into the world
  ground = Bodies.rectangle(0, height - 1, width * 2, 1, { isStatic: true });
  World.add(world, ground);

  // adding the tower into the world
  tower = Bodies.rectangle(160, 350, 160, 310, { isStatic: true });
  World.add(world, tower);

  //calling the cannon blueprint
  cannon = new Cannon(180, 110, 130, 100, angle);
  cannonBall = new CannonBall(cannon.x, cannon.y);
}

//funtion draw

function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);

  Engine.update(engine);

  push();
  fill("brown");
  rectMode(CENTER);
  rect(ground.position.x, ground.position.y, width * 2, 1);
  pop();

  push();
  imageMode(CENTER);
  image(towerImage, tower.position.x, tower.position.y, 160, 310);
  pop();
  cannonBall.display();
  cannon.display();
  
// access to each cannon ball
  for(var i = 0; i < balls.length; i++) {
    showCannonBalls(balls[i], i);
  }
}

 
// shooting the cannonball
function keyReleased() {
  if (keyCode === DOWN_ARROW) {
   balls[balls.length-1].shoot();
  }
}

// craeting a new cannonball
function keyPressed() {
  if (keyCode==DOWN_ARROW){
    var cannonBall = new CannonBall(cannon.x, cannon.y);
    balls.push(cannonBall);

  }
}

//displaying the cannonball
function showCannonBalls(ball, i) {
 if(ball){
   ball.display()
 } 
}
