function drawPaddle(ctx, paddleX, paddleY, paddleWidth, paddleHeight) {
    ctx.beginPath();
    ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
}