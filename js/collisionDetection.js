function collisionDetection(col, row, width, height) {
    var i, j;
    for(i = 0; i < col; i += 1) {
        for(j = 0; j < row; j += 1) {
            var brick = bricks[i][j];
            if(brick.status === 1) {
                if(x > brick.x && x < brick.x + width && y > brick.y && y < brick.y + height) {
                    dy = -dy;
                    brick.status = 0;
                    score++;
                    if(score === row * col) {
                        alert("YOU WIN, CONGRATULATIONS!");
                        // document.location.reload();
                    }
                }
            }
        }
    }
}