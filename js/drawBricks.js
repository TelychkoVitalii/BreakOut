function drawBricks(ctx, col, row, height, width, pad) {
    var i, j;
    for(i = 0; i < col; i += 1) {
        for(j = 0; j < row; j += 1) {
            if(bricks[i][j].status === 1) {
                brickX = (i * (width + pad)) + brickOffsetLeft;
                brickY = (j * (height + pad)) + brickOffsetTop;
                bricks[i][j].x = brickX;
                bricks[i][j].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, width, height);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}