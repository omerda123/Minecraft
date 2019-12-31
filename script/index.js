
const getPlayerRowsAndColsByPosition = () => {
    const tile = document.querySelector(".tile")
    let row = 0;
    let col = 0;
    console.log(`${(player.offsetTop)}  / ${tile.offsetHeight} = ${(player.offsetTop)  / tile.offsetHeight} `)
    row = Math.floor((player.offsetTop)  / tile.offsetHeight);
    col = Math.floor((player.offsetLeft +8) / tile.offsetWidth);
    console.log(row, col)
    return { "row": row, "col": col };
}




const movePlayer = (e) => {
    let playerPosition = getPlayerRowsAndColsByPosition();

    if (e.keyCode == '87') {// up arrow
        direction = "up";
        if (tilesArray[playerPosition.row - 1][playerPosition.col] === 0)
            topPosition -= 1;
        player.style.top = topPosition + "%"
    }
    else if (e.keyCode == '83') { // down arrow
        direction = "down";
        if (tilesArray[playerPosition.row + 1][playerPosition.col] === 0)
            topPosition += 1;
        player.style.top = topPosition + "%"
    }
    else if (e.keyCode == '65') { // left arrow
        direction = "left";
        player.style.transform = "rotateY(180deg)";
        if (tilesArray[playerPosition.row][playerPosition.col] === 0)
            left -= 1;
        player.style.left = left + "%"

    }
    else if (e.keyCode == '68') { // right arrow
        direction = "right";
        player.style.transform = "rotateY(0deg)";
        if (tilesArray[playerPosition.row][playerPosition.col +1] === 0)
            left += 1;
        player.style.left = left + "%"
    }
    else if (e.keyCode == '32') {
        if (direction === "right") {
            console.log(tilesArray[playerPosition.row][playerPosition.col + 1].id)
            document.getElementById(tilesArray[playerPosition.row][playerPosition.col + 1].id).remove();
            tilesArray[playerPosition.row][playerPosition.col + 1] = 0;
        }
        if (direction === "left") {
            console.log(tilesArray[playerPosition.row][playerPosition.col + 1].id)
            document.getElementById(tilesArray[playerPosition.row][playerPosition.col - 1].id).remove();
            tilesArray[playerPosition.row][playerPosition.col - 1] = 0;
        }
    }
}

const setArrayOfObstacles = () => {
    const tiles = document.querySelectorAll(".tile img");
    tiles.forEach(tile => {
        tilesX.push(tile.x);
        tilesY.push(tile.y);
    })
    // console.log(tilesX);
    // console.log(tilesY)

}
const createBoard = () => {

    for (let i = 0; i < 10; i++) {
        tilesArray[i] = [];
        let id = 0;
        for (let j = 0; j < 20; j++) {
            tilesArray[i][j] = 0;
            let tile = document.createElement("div");
            tile.addEventListener("click", (e) => console.log(`obsticle : ${e.pageX} , ${e.pageY}`))
            if (((i == 3) || (i == 4)) && ((j == 12) || (j == 13) || (j == 14))) {
                let pic = document.createElement("img");
                pic.src = "./images/trees.jpg";
                pic.id = id;
                tilesArray[i][j] = { "type": "tree", "id": id++ };
                tile.appendChild(pic)
            }

            if (((i == 6) || (i == 5) || (i == 4)) && (j == 13)) {
                let pic = document.createElement("img");
                pic.src = "./images/log.jpg";
                tilesArray[i][j] = { "type": "tree", "id": id++ };
                tile.appendChild(pic)
            }
            if ((i === 7) && (j != 0) && (j != 1)) {
                let pic = document.createElement("img");
                pic.src = "./images/rocks.jpg";
                tilesArray[i][j] = { "type": "rocks", "id": id++ };
                tile.appendChild(pic)
            }
            if ((i == 9) || (i == 8)) {
                let pic = document.createElement("img");
                pic.src = "./images/dirt.jpg";
                tilesArray[i][j] = { "type": "dirt", "id": id++ };
                tile.appendChild(pic)
            }
            tile.className = "tile";
            world.appendChild(tile);
        }
    }
}

const toolBoxArray = [{ "name": "Axe", "image": "axe.png" }, { "name": "Pickaxe", "image": "Pickaxe.png" }, { "name": "Shovel", "image": "Shovel.png" }]
const inventoryArray = [{ "name": "rocks", "image": "rocks.jpg", "quantity": 0 }, { "name": "trees", "image": "trees.jpg", "quantity": 0 }, { "name": "dirt", "image": "dirt.jpg", "quantity": 0 }]
const toolBox = document.querySelector(".toolbox");
const inventory = document.querySelector(".inventory");
const player = document.querySelector("#player");
const world = document.querySelector(".world");
let tilesArray = [];
let direction;
let left = 0;
let topPosition = 0;
let tilesY = [];
let tilesX = [];


toolBoxArray.forEach(tool => {
    let img = document.createElement("img");
    img.src = `./images/${tool.image}`
    toolBox.appendChild(img);
})

inventoryArray.forEach(tile => {
    let img = document.createElement("img");
    img.src = `./images/${tile.image}`
    inventory.appendChild(img);
    let bubble = document.createElement("div");
    bubble.innerHTML = 1;
    img.appendChild(bubble)
});

document.addEventListener("keydown", movePlayer);
document.querySelectorAll(".toolbox img")[0].className = "active"
document.querySelectorAll(".inventory img")[0].className = "active"
createBoard();
setArrayOfObstacles();
player.style.width = document.querySelector(".tile").getBoundingClientRect().width + "px";
player.style.height = document.querySelector(".tile").getBoundingClientRect().height + "px";
