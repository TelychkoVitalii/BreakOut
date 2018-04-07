let canvas = document.getElementById('myCanvas'),
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

function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: " + lives, canvas.width - 65, 200);
}

function drawScore() {
    ctx.font = '16px Arial';
    ctx.fillStyle = "#0095DD";
    ctx.fillText('Score: ' + score, 8, 200);
}

for(i = 0; i < brickColumnCount; i += 1) {
    bricks[i] = [];
    for(j = 0; j < brickRowCount; j += 1) {
        bricks[i][j] = {x: 0, y: 0, status: 1};
    }
}

function collisionDetection() {
    for(i = 0; i < brickColumnCount; i += 1) {
        for(j = 0; j < brickRowCount; j += 1) {
            let brick = bricks[i][j];
            if(brick.status === 1) {
                if(x > brick.x && x < brick.x + brickWidth && y > brick.y && y < brick.y + brickHeight) {
                    dy = -dy;
                    brick.status = 0;
                    score++;
                    if(score === brickRowCount * brickColumnCount) {
                        alert("YOU WIN, CONGRATULATIONS!");
                        // document.location.reload();
                    }
                }
            }
        }
    }
}

function drawBricks() {
    for(i = 0; i < brickColumnCount; i += 1) {
        for(j = 0; j < brickRowCount; j += 1) {
            if(bricks[i][j].status === 1) {
                brickX = (i * (brickWidth + brickPadding)) + brickOffsetLeft;
                brickY = (j * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[i][j].x = brickX;
                bricks[i][j].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
// document.addEventListener("mousemove", mouseMoveHandler, false);

// function mouseMoveHandler(e) {
//     const relativeX = e.clientX - canvas.offsetLeft;
//     if(relativeX > 0 && relativeX < canvas.width) {
//         paddleX = relativeX - paddleWidth / 2;
//     }
// }

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

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBricks();
    drawBall();
    drawScore();
    drawPaddle();
    collisionDetection();
    drawLives();

    if(x + dx > canvas.width - ballRadius || x + dx < 0) {
        dx = -dx;
    }

    if(y + dy < ballRadius) {
        dy = -dy;
    } else if(y + dy > canvas.height - ballRadius) {
        if(x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        } else {
            lives--;
            if(!lives) {
                // alert("GAME OVER");
                // document.location.reload();
            }
            else {
                x = canvas.width / 2;
                y = canvas.height - 30;
                dx = 2;
                dy = -2;
                paddleX = (canvas.width-paddleWidth)/2;
            }
        }
    }

    if(rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 5;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 5;
    }

    x += dx;
    y += dy;
}

setInterval(draw, 5);