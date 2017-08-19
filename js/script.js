window.onload = () => {
  const canvas = document.getElementById('canvas1');
  const ctx = canvas.getContext('2d');


  const ballRadius = 5;
  const ballColour = '#AADDDD';

  const leftPaddleHeight = 50;
  const leftPaddleWidth = 10;
  const leftPaddleColour = ballColour;


  const rightPaddleHeight = 50;
  const rightPaddleWidth = 10;
  const rightPaddleColour = ballColour;
  let ballX = canvas.width / 2;
  let ballY = canvas.height / 2;
  let ball_dx = randInt(-5, 5);
  let ball_dy = randInt(-5, 5);


  let leftPaddleX = 30;
  let leftPaddle_dx = 5;
  let leftPaddleY = 135;
  let leftPaddle_dy = -5;

  let rightPaddleX = canvas.width - (rightPaddleWidth + 30);
  let rightPaddle_dx = 5;
  let rightPaddleY = 135;
  let rightPaddle_dy = -5;


  let upPressed = false;
  let downPressed = false;

  let leftPoint = 0;
  let rightPoint = 0;

  let error = false;

  function newGame() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ball_dx = 4;
    ball_dy = 4;

    leftPaddleX = 30;
    leftPaddle_dx = 5;
    leftPaddleY = 135;
    leftPaddle_dy = -5;

    rightPaddleX = canvas.width - (rightPaddleWidth + 30);
    rightPaddle_dx = 5;
    rightPaddleY = 135;
    rightPaddle_dy = -5;

    error = false;
  }

  function randInt(minimum, maximum) {
    const min = Math.ceil(minimum);
    const max = Math.floor(maximum);
    return Math.floor(Math.random() * ((max - min) + 1)) + min;
  }

  function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = ballColour;
    ctx.fill();
    ctx.closePath();
  }

  function drawLeftPaddle() {
    ctx.beginPath();
    ctx.rect(leftPaddleX, leftPaddleY, leftPaddleWidth, leftPaddleHeight);
    ctx.fillStyle = leftPaddleColour;
    ctx.fill();
    ctx.closePath();
  }

  function drawRightPaddle() {
    ctx.beginPath();
    ctx.rect(rightPaddleX, rightPaddleY, rightPaddleWidth, rightPaddleHeight);
    ctx.fillStyle = rightPaddleColour;
    ctx.fill();
    ctx.closePath();
  }

  function drawScore() {
    ctx.font = '16px Arial';
    ctx.fillStyle = '#AADDDD';
    ctx.fillText(leftPoint + ' - ' + rightPoint, 10, 20);
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawLeftPaddle();
    drawRightPaddle();
    drawScore();
    if(!error) {
      window.requestAnimationFrame(draw);
    }
    // ball goes out of bounds, giving points.
    if (ballX + ball_dx > canvas.width - ballRadius) {
      leftPoint += 1;
      ball_dx = 0;
      ball_dy = 0;
      newGame();
    }
    // ball goes out of bounds, giving points.
    else if(ballX + ball_dx < ballRadius){
      rightPoint += 1;
      ball_dx = 0;
      ball_dy = 0;
      newGame();
    }

    // ball bounces against the ceiling.
    if (ballY + ball_dy <= ballRadius || ballY + ball_dy >= canvas.height - ballRadius) {
      ball_dy = -ball_dy;
    }

    // ball bounces when it hits the right bracket.
    if ((ballX + ball_dx) === rightPaddleX && ((ballY) <= (rightPaddleY + rightPaddleHeight)) && ((ballY) >= rightPaddleY)) {
      ball_dx = -ball_dx;
      ball_dy = randInt(-4, 4);
    }

    // ball bounces when it hits the left bracket.
    if ((ballX + ball_dx) === (leftPaddleX + leftPaddleWidth) && ((ballY) <= (leftPaddleY + leftPaddleHeight)) && ((ballY) >= leftPaddleY)) {
      ball_dx = -ball_dx;
      ball_dy = randInt(-4, 4);
    }

    ballX += ball_dx;
    ballY += ball_dy;

    if (upPressed && (leftPaddleY > 0)) {
      leftPaddleY += leftPaddle_dy;
      rightPaddleY += rightPaddle_dy;
    }

    else if (downPressed && leftPaddleY < (canvas.height - leftPaddleHeight)) {
      leftPaddleY -= leftPaddle_dy;
      rightPaddleY -= rightPaddle_dy;
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
  // setInterval(draw, 10);
  if(!error){
    window.requestAnimationFrame(draw);
  }
};
