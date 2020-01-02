
const getPlayerRowsAndColsByPosition = () => {
    const tile = document.querySelector(".tile");
    let dirOffset = 0;
    if (direction === "left") {
        dirOffset = player.width;
    }
    else if (direction === "right") {
        dirOffset = 8
    }
    let row = 0;
    let col = 0;
    row = Math.floor((player.offsetTop) / tile.offsetHeight);
    col = Math.floor((player.offsetLeft + dirOffset) / tile.offsetWidth);
    return { "row": row, "col": col };
}

const changeTool = (el) => {
    console.log(el)
    console.log(el.id);
    if (["axe", "pickaxe", "shovel"].includes(tool))
        tool = el.id;
    else if (["rocks", "trees", "dirt"])
        build = el.id

    document.querySelectorAll(`.${el.parentNode.className} img`).forEach(tool => tool.classList.remove("active"));
    el.className = "active";
}



const movePlayer = (e) => {
    let playerPosition = getPlayerRowsAndColsByPosition();
    document.querySelectorAll(".red").forEach(red => red.classList.remove("red"));
    if (e.keyCode == '87') {// up arrow
        direction = "up";
        if (tilesArray[playerPosition.row - 1][playerPosition.col] === 0)
            topPosition -= 1;
        else {
            document.getElementById(tilesArray[playerPosition.row - 1][playerPosition.col].id).classList.add("red");
            tile = tilesArray[playerPosition.row-1][playerPosition.col].type;

        }
        player.style.top = topPosition + "%"
    }
    else if (e.keyCode == '83') { // down arrow
        direction = "down";
        if (tilesArray[playerPosition.row + 1][playerPosition.col] === 0)
            topPosition += 1;
        else {
            document.getElementById(tilesArray[playerPosition.row + 1][playerPosition.col].id).classList.add("red");
            tile = tilesArray[playerPosition.row +1][playerPosition.col].type;

        }
        player.style.top = topPosition + "%"
    }
    else if (e.keyCode == '65') { // left arrow
        direction = "left";
        player.style.transform = "rotateY(180deg)";
        if (tilesArray[playerPosition.row][playerPosition.col - 1] === 0)
            left -= 1;
        else {
            document.getElementById(tilesArray[playerPosition.row][playerPosition.col - 1].id).classList.add("red");
            tile = tilesArray[playerPosition.row ][playerPosition.col - 1].type;

        }
        player.style.left = left + "%"

    }
    else if (e.keyCode == '68') { // right arrow
        direction = "right";
        player.style.transform = "rotateY(0deg)";
        if (tilesArray[playerPosition.row][playerPosition.col + 1] === 0)
            left += 1;
        else {
            document.getElementById(tilesArray[playerPosition.row][playerPosition.col + 1].id).classList.add("red");
            tile = tilesArray[playerPosition.row ][playerPosition.col +1].type;
        }
        player.style.left = left + "%"
    }
    else if ([49, 50, 51].includes(e.keyCode)) {
        changeTool(toolBox.querySelector(`img:nth-child(${e.keyCode - 48})`))
    }
    else if ([52, 53, 54].includes(e.keyCode)) {
        changeTool(inventory.querySelector(`img:nth-child(${e.keyCode - 51})`))
    }

    else if (e.keyCode == '32') { // space
        console.log(tool, tile);
        if ((tool === "axe" && tile === "tree") || (tool === "pickaxe" && tile === "rocks") || (tool === "shovel" && tile === "dirt")) {
            if (direction === "right") {
                document.getElementById(tilesArray[playerPosition.row][playerPosition.col + 1].id).remove();
                tilesArray[playerPosition.row][playerPosition.col + 1] = 0;
            }
            if (direction === "left") {
                document.getElementById(tilesArray[playerPosition.row][playerPosition.col - 1].id).remove();
                tilesArray[playerPosition.row][playerPosition.col - 1] = 0;
            }
            if (direction === "up") {
                document.getElementById(tilesArray[playerPosition.row - 1][playerPosition.col].id).remove();
                tilesArray[playerPosition.row - 1][playerPosition.col] = 0;
            }
            if (direction === "down") {
                document.getElementById(tilesArray[playerPosition.row + 1][playerPosition.col].id).remove();
                tilesArray[playerPosition.row + 1][playerPosition.col] = 0;
            }
        }
    }
}

const setArrayOfObstacles = () => {
    const tiles = document.querySelectorAll(".tile img");
    tiles.forEach(tile => {
        tilesX.push(tile.x);
        tilesY.push(tile.y);
    })


}
const createBoard = () => {
    let id = 0;
    for (let i = 0; i < 10; i++) {
        tilesArray[i] = [];

        for (let j = 0; j < 20; j++) {
            tilesArray[i][j] = 0;
            let tile = document.createElement("div");
            if (((i == 3) || (i == 4)) && ((j == 12) || (j == 13) || (j == 14))) {  // create trees
                let pic = document.createElement("img");
                pic.src = "./images/trees.jpg";
                pic.className = "tree"
                pic.id = id;
                tilesArray[i][j] = { "type": "tree", "id": id++ };
                tile.appendChild(pic)
            }

            if (((i == 6) || (i == 5)) && (j == 13)) {
                let pic = document.createElement("img");
                pic.src = "./images/log.jpg";
                pic.className = "tree"
                pic.id = id;
                tilesArray[i][j] = { "type": "tree", "id": id++ };
                tile.appendChild(pic)
            }
            if ((i === 7) && (j != 0) && (j != 1)) {
                let pic = document.createElement("img");
                pic.src = "./images/rocks.jpg";
                pic.className = "rock"
                pic.id = id;
                tilesArray[i][j] = { "type": "rocks", "id": id++ };
                tile.appendChild(pic)
            }
            if ((i == 9) || (i == 8)) {
                let pic = document.createElement("img");
                pic.src = "./images/dirt.jpg";
                pic.className = "dirt"
                pic.id = id;
                tilesArray[i][j] = { "type": "dirt", "id": id++ };
                tile.appendChild(pic)
            }
            tile.className = "tile";
            world.appendChild(tile);
        }
    }
}

const toolBoxArray = [
    { "name": "axe", "image": "axe.png" },
    { "name": "pickaxe", "image": "Pickaxe.png" },
    { "name": "shovel", "image": "Shovel.png" }
]
const inventoryArray = [{ "name": "rocks", "image": "rocks.jpg", "quantity": 0 }, { "name": "trees", "image": "trees.jpg", "quantity": 0 }, { "name": "dirt", "image": "dirt.jpg", "quantity": 0 }]
const toolBox = document.querySelector(".toolbox");
const inventory = document.querySelector(".inventory");
const player = document.querySelector("#player");
const world = document.querySelector(".world");
let tool = toolBoxArray[0].name;
let build = inventoryArray[0].name;
let tilesArray = [];
let direction;
let left = 0;
let topPosition = 0;
let tilesY = [];
let tilesX = [];
let tile;


toolBoxArray.forEach(tool => {
    let img = document.createElement("img");
    img.src = `./images/${tool.image}`
    img.id = tool.name;
    img.addEventListener("click", e => changeTool(e.target));
    toolBox.appendChild(img);
})

inventoryArray.forEach(tile => {
    let img = document.createElement("img");
    img.src = `./images/${tile.image}`;
    img.id = tile.name;
    inventory.appendChild(img);
    let bubble = document.createElement("div");
    bubble.innerHTML = 1;
    img.appendChild(bubble)
});
document.querySelector("#info").addEventListener("click", (e) => {
    let infoBox = document.querySelector(".information");
    if (infoBox.style.display === "none") {
        infoBox.style.display = "flex"
    }
    else
        infoBox.style.display = "none"

})
document.addEventListener("keydown", movePlayer);
document.querySelectorAll(".toolbox img")[0].className = "active"
document.querySelectorAll(".inventory img")[0].className = "active"
createBoard();
setArrayOfObstacles();
player.style.width = document.querySelector(".tile").getBoundingClientRect().width + "px";
player.style.height = document.querySelector(".tile").getBoundingClientRect().height + "px";
