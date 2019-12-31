console.log(player.getBoundingClientRect().left + " : " + (player.getBoundingClientRect().top));

    console.log ( player.getBoundingClientRect())
    let obstaclesArray = [];
    let obstacles =  document.querySelectorAll(".tile img");
    obstacles.forEach( obstacle => obstaclesArray.push (obstacle.getBoundingClientRect()) ) 
    var _player = { x: player.getBoundingClientRect().left +1 , y: player.getBoundingClientRect().top, width: 40, height: 80 }
    let closestObstacle = obstaclesArray.filter( (obstacle) => { return (obstacle.x < _player.x && obstacle.x + obstacle.width > _player.x)});
    let closestObstacleY = obstaclesArray.filter( (obstacle) => { return (obstacle.y < _player.y + _player.height && obstacle.y  + obstacle.height < _player.y + _player.height )});
    closestObstacleY = closestObstacleY.sort(((a, b) => (a.x > b.x) ? 1 : ((b.x > a.x) ? -1 : 0)));
    console.log (closestObstacle    ) 
    console.log (closestObstacleY) 
    console.log(obstaclesArray);
    let closeObsticalesOnX = tilesX.filter((tile) => { return (tile > player.getBoundingClientRect().left) && (tile < player.getBoundingClientRect().left + 40) })
    let closeObsticalesOnY = tilesY.filter((tile) => { return (tile > player.getBoundingClientRect().top) && (tile < player.getBoundingClientRect().top + 80) })
    console.log(closeObsticalesOnX)
    console.log(closeObsticalesOnY)

    if (_player.x < closestObstacle[0].x + closestObstacle[0].width &&
        _player.x + _player.width > closestObstacle[0].x &&
        _player.y < closestObstacle[0].y + closestObstacle[0].height &&
        _player.y + _player.height > closestObstacle[0].y) {
            console.log("errrrrrrrrrrrrrrrrrrrr")
    }
    else {