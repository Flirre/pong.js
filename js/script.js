window.onload = () => {
  const canvas = document.getElementById('canvas1');
  const ctx = canvas.getContext('2d');

  let x = canvas.width / 2;
  let y = canvas.height - 30;
  let dx = 2;
  let dy = -2;

  function drawBall(){
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
  }
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    if (x >= canvas.width - 10 || x <= 10) {
      dx = -dx;
    }
    if (y >= canvas.height - 10 || y <= 10) {
      dy = -dy;
    }
    x += dx;
    y += dy;
  }
  setInterval(draw, 10);
};
