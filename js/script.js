window.onload = () => {
  const canvas = document.getElementById('canvas1');
  const ctx = canvas.getContext('2d');

  let ballX = canvas.width / 2;
  let ballY = canvas.height / 2;
  let ball_dx = 2;
  let ball_dy = 0;

  const ballRadius = 10;
  const ballColour = '#AADDDD';

  const leftPaddleHeight = 50;
  const leftPaddleWidth = 10;
  const leftPaddleColour = ballColour;
  let leftPaddleX = 0;
  let leftPaddle_dx = 5;
  let leftPaddleY = 0;
  let leftPaddle_dy = -5;

  let upPressed = false;
  let downPressed = false;

  let leftPoint = 0;
  let rightPoint = 0;

  //TODO: make 'restart' function so game doesn't reset when ball is lost.

  function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = ballColour;
    ctx.fill();
    ctx.closePath();
  }

  function drawLeftPaddle() {
    ctx.beginPath();
    ctx.rect(leftPaddleX, (canvas.height - leftPaddleHeight) - leftPaddleY, leftPaddleWidth, leftPaddleHeight);
    ctx.fillStyle = leftPaddleColour;
    ctx.fill();
    ctx.closePath();
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawLeftPaddle();
    // if (ballX + ball_dx > canvas.width - 10) {
    //   rightPoint += 1;
    //   console.log('right point:' + rightPoint);
    //   document.location.reload();
    // }

    // else if(ballX + ball_dx <= ballRadius){
    //   leftPoint += 1;
    //   console.log('left point:' + leftPoint);
    //   document.location.reload();
    // }

    // if (ballY + ball_dy <= ballRadius || ballY + ball_dy >= canvas.height - ballRadius) {
    //   ball_dy = -ball_dy;
    // }

    // ballX += ball_dx;
    // ballY += ball_dy;

    if (upPressed && leftPaddleY <= (canvas.height - leftPaddleHeight)) {
      leftPaddleY -= leftPaddle_dy;
      console.log(canvas.height - leftPaddleHeight);
    }

    else if (downPressed && leftPaddleY > 0) {
      leftPaddleY += leftPaddle_dy;
    }

  }

  document.addEventListener('keydown', keyDownHandler, false);
  document.addEventListener('keyup', keyUpHandler, false);

  function keyDownHandler(e) {
    if (e.keyCode === 38) {
      upPressed = true;
    }

    else if (e.keyCode === 40) {
      downPressed = true;
    }
  }

  function keyUpHandler(e) {
    if (e.keyCode === 38) {
      upPressed = false;
    }

    else if (e.keyCode === 40) {
      downPressed = false;
    }
  }
  setInterval(draw, 10);
};
