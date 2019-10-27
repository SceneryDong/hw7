function setup() {
  createCanvas(400, 400);
}

function preload() {
  soundFormats("wav");
  mySound = loadSound("catch.wav");
  mySound2 = loadSound("gameover.wav")
  mySound3 = loadSound("crash.wav")

}


var cartX = 150
var cartSpeed = 4
var ballX = []
var ballY = 0
var ballSpeed = 0
var acceleration = 0.05
var i = 0
var score = 0
var chance = 3
let screen = 0
var ballSize = 40
var alert_timer = 60;
var prize_timer = 40
var opa = 0

function draw() {
  if (mouseIsPressed) {
    screen = 1
  }
  if (screen == 1) {
    game()
  } else if (screen == 0) {
    preface()
  }
}

function preface() {
  background(150, 200, 30)
  noStroke()
  fill(51, 116, 41)
  ellipse(30, 0, 200)
  ellipse(200, 0, 100)
  ellipse(300, 0, 200)
  ellipse(400, 20, 100)
  fill(0)
  textSize(12)
  text("score:" + score, 350, 20)
  text("chance:" + chance, 345, 40)
  textSize(20)
  text("click to start", 200, 200)
  textSize(10)
  text("use ← → on your keyboard to control the basket and catch the apples", 35, 220)
  // text("developed by S. Dong",215,240)
  fill(121, 73, 47)
  arc(cartX, height - 40, 120, 120, 0, PI)
  noStroke()
  fill(230, 70, 20)
  ellipse(50, 70, 40)
  ellipse(200, 30, 20)
  ellipse(300, 60, 40)
}


function game() {
  background(150, 200, 30);
  fill(51, 116, 41)
  ellipse(30, 0, 200)
  ellipse(200, 0, 100)
  ellipse(300, 0, 200)
  ellipse(400, 20, 100)
  noStroke()
  fill(230, 70, 20)
  ellipse(50, 70, 40)
  ellipse(200, 30, 20)
  ellipse(300, 60, 40)
  //background

  ballX.push(random(50, 350))

  fill(0)
  textSize(12)
  text("score:" + score, 350, 20)
  text("chance:" + chance, 345, 40)






  if (ballY > 400) {
    ballY = 0
    ballSpeed = 0

    i++
  }


  noStroke()
  fill(255, 70, 20, opa)
  opa += 15
  if (opa >= 255) {
    ellipse(ballX[i], ballY, ballSize)


    ballSpeed = ballSpeed + acceleration
    ballY = ballY + ballSpeed
  } else {
    ellipse(ballX[i], 0, ballSize)
  }

  fill(121, 73, 47)
  arc(cartX, height - 40, 120, 120, 0, PI)

  if (keyIsDown(RIGHT_ARROW)) {
    cartX = cartX + cartSpeed
  }

  if (keyIsDown(LEFT_ARROW)) {
    cartX = cartX - cartSpeed
  }

  if (ballY > 400) {
    if (cartX - 40 < ballX[i] && ballX[i] < cartX + 40) {
      // caught the ball
      mySound.play()
      score++
      acceleration = 0.05 + 0.01 * score
      cartSpeed = 4 + 0.08 * score
      ballSize = random(30, 50)
      opa = 0



    } else {
      // didn't catch the ball
      chance = chance - 1;
      // alert_timer = 60;
      opa = 0




      if (chance == 0) {
        fill(0)
        textSize(20);
        text('Game over', 200, 200);
        text('Better luck next time!', 110, 220)
        mySound2.play()
        noLoop()
      } else {
        mySound3.play()
      }
    }


  }

  if (prize_timer > 0 && score == 5) {
    fill(255)
    textSize(30)
    text("WELL DONE!", 180, 200)
    prize_timer--
  }

  if (prize_timer < 40 && score == 10) {
    fill(255)
    textSize(30)
    text("WONDERFUL!", 180, 200)
    prize_timer++
  }

  if (prize_timer > 0 && score == 20) {
    fill(255)
    textSize(30)
    text("YOU ACED IT!", 180, 200)
    prize_timer--
  }

  if (alert_timer > 0 && chance == 2) {
    fill(255);
    textSize(20);
    text("No worries!", 50, 200);
    alert_timer--;
    //console.log('a_t'+alert_timer);
  }

  if (alert_timer < 60 && chance == 1) {
    fill(255);
    textSize(20);
    text("Be careful!", 50, 200);
    alert_timer++;
    //console.log('a_t'+alert_timer);
  }



}
