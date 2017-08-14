window.onload = () => {
  const canvas = document.getElementById('canvas1');
  const ctx = canvas.getContext('2d');

  let ballX = canvas.width / 2;
  let ballY = canvas.height - 30;
  let ball_dx = 2;
  let ball_dy = -2;

  const ballRadius = 10;
  const ballColour = '#AADDDD';

  const paddleHeight = 10;
  const paddleWidth = 75;
  const paddleColour = ballColour;
  let paddleX = (canvas.width - paddleWidth) / 2;
  const paddle_dx = 7;

  let rightPressed = false;
  let leftPressed = false;

  function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = ballColour;
    ctx.fill();
    ctx.closePath();
  }

  function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = paddleColour;
    ctx.fill();
    ctx.closePath();
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    if (ballX + ball_dx >= canvas.width - 10 || ballX + ball_dx <= ballRadius) {
      ball_dx = -ball_dx;
    }
    if (ballY + ball_dy >= canvas.height - 10 || ballY + ball_dy <= ballRadius) {
      ball_dy = -ball_dy;
    }
    ballX += ball_dx;
    ballY += ball_dy;

    if (rightPressed && paddleX < canvas.width-paddleWidth) {
      paddleX += paddle_dx;
    }
    else if (leftPressed && paddleX > 0) {
      paddleX -= paddle_dx;
    }
  }

  document.addEventListener('keydown', keyDownHandler, false);
  document.addEventListener('keyup', keyUpHandler, false);

  function keyDownHandler(e) {
    if (e.keyCode === 39) {
      rightPressed = true;
    }

    else if (e.keyCode === 37) {
      leftPressed = true;
    }
  }

  function keyUpHandler(e) {
    if (e.keyCode === 39) {
      rightPressed = false;
    }

    else if (e.keyCode === 37) {
      leftPressed = false;
    }
  }
  setInterval(draw, 10);
};
