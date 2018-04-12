var canvas = document.getElementById('myCanvas'),
    ctx = canvas.getContext('2d'),
    x = canvas.width / 2,
    y = canvas.height - 30, dx = 2, dy = -2,
    ballRadius = 10,
    paddleHeight = 10,
    paddleWidth = 95,
    paddleX = (canvas.width - paddleWidth * 8),
    paddleY = (canvas.height - paddleHeight),
    rightPressed = false,
    leftPressed = false,
    brickRowCount = 6,
    brickColumnCount = 14,
    brickWidth = 75,
    brickHeight = 20,
    brickPadding = 5,
    brickOffsetTop = 10,
    brickOffsetLeft = 10,
    bricks = [],
    i, j, brickX, brickY,
    score = 0, lives = 3;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBricks(ctx, brickColumnCount, brickRowCount, brickHeight, brickWidth, brickPadding);
    drawBall(ctx, x, y);
    drawScore(ctx, score);
    drawPaddle(ctx, paddleX, paddleY, paddleWidth, paddleHeight);
    collisionDetection(brickColumnCount, brickRowCount, brickWidth, brickHeight);
    drawLives(ctx, lives);
    moveLogic(ballRadius, paddleX, paddleWidth);

    if(rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 5;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 5;
    }

    x += dx;
    y += dy;
}

for(i = 0; i < brickColumnCount; i += 1) {
    bricks[i] = [];
    for(j = 0; j < brickRowCount; j += 1) {
        bricks[i][j] = {x: 0, y: 0, status: 1};
    }
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

function keyDownHandler(e) {
    if(e.keyCode === 39) {
        rightPressed = true;
    } else if(e.keyCode === 37) {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode === 39) {
        rightPressed = false;
    } else if(e.keyCode === 37) {
        leftPressed = false;
    }
}

setInterval(draw, 5);