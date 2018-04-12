function moveLogic(br, paddleX, paddleWidth) {
    if(x + dx > canvas.width - br || x + dx < 0) {
        dx = -dx;
    }

    if(y + dy < br) {
        dy = -dy;
    } else if(y + dy > canvas.height - br) {
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
                paddleX = (canvas.width - paddleWidth) / 2;
            }
        }
    }
}