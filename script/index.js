
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
    // console.log(el.id);
    document.querySelectorAll(`.${el.parentNode.className} img`).forEach(tool => tool.classList.remove("active"));
    if (["axe", "pickaxe", "shovel"].includes(el.id)){
        tool = el.id;
        document.querySelector(`#${tool}`).classList.add("active");
    }
    else if (["rocks", "trees", "dirt"].includes(el.id)){
        build = el.id;
        document.querySelector(`#${build}`).classList.add("active");
    }
    console.log(el);
}



const movePlayer = (e) => {
    let playerPosition = getPlayerRowsAndColsByPosition();
    console.log(playerPosition.row, playerPosition.col);
    document.querySelectorAll(".red").forEach(red => red.classList.remove("red"));
    if (e.keyCode == '87') {// up arrow
        direction = "up";
        if (tilesArray[playerPosition.row - 1][playerPosition.col] === 0)
            topPosition -= 1;
        else {
            document.getElementById(tilesArray[playerPosition.row - 1][playerPosition.col].id).classList.add("red");
            tile = tilesArray[playerPosition.row - 1][playerPosition.col].type;

        }
        player.style.top = topPosition + "%"
    }
    else if (e.keyCode == '83') { // down arrow
        direction = "down";
        if (tilesArray[playerPosition.row + 1][playerPosition.col] === 0)
            topPosition += 1;
        else {
            document.getElementById(tilesArray[playerPosition.row + 1][playerPosition.col].id).classList.add("red");
            tile = tilesArray[playerPosition.row + 1][playerPosition.col].type;

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
            tile = tilesArray[playerPosition.row][playerPosition.col - 1].type;

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
            tile = tilesArray[playerPosition.row][playerPosition.col + 1].type;
        }
        player.style.left = left + "%"
    }
    else if ([49, 50, 51].includes(e.keyCode)) {
        changeTool(toolBox.querySelector(`img:nth-child(${e.keyCode - 48})`))
    }
    else if ([52, 53, 54].includes(e.keyCode)) {
        changeTool(inventoryItems[e.keyCode - 52])
    }

    else if (e.keyCode == '32') { // space
        console.log(tool, tile);
        if ((tool === "axe" && tile === "trees") || (tool === "pickaxe" && tile === "rocks") || (tool === "shovel" && tile === "dirt")) {
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
            inventoryArray[inventoryArray.findIndex(x => { return x.name == tile })].quantity++;
            createInventory();
        }
    }
    else if (e.keyCode == '13') { // enter
        console.log(tile);
        let temp = (playerPosition.row * 20) + playerPosition.col;
        if (inventoryArray[inventoryArray.findIndex(x => { return x.name == build })].quantity > 0) {
            let pos = document.getElementsByClassName(temp)[0];
            let img = document.createElement("img");
            img.src = `./images/${build}.jpg`;
            img.className = build;
            img.id =temp;
            pos.appendChild(img);
            tilesArray[playerPosition.row][playerPosition.col] =  { "type": build, "id":temp }
            inventoryArray[inventoryArray.findIndex(x => { return x.name == build })].quantity--;
            createInventory();
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
    createInventory();
    let id = 0;
    for (let i = 0; i < 10; i++) {
        tilesArray[i] = [];

        for (let j = 0; j < 20; j++) {
            tilesArray[i][j] = 0;
            let tile = document.createElement("div");
            if (((i == 3) || (i == 4)) && ((j == 12) || (j == 13) || (j == 14))) {  // create trees
                let pic = document.createElement("img");
                pic.src = "./images/trees.jpg";
                pic.className = "trees"
                pic.id = id;
                tilesArray[i][j] = { "type": "trees", "id": id };
                tile.appendChild(pic)
            }

            if (((i == 6) || (i == 5)) && (j == 13)) {
                let pic = document.createElement("img");
                pic.src = "./images/log.jpg";
                pic.className = "trees"
                pic.id = id;
                tilesArray[i][j] = { "type": "trees", "id": id };
                tile.appendChild(pic)
            }
            if ((i === 7) && (j != 0) && (j != 1)) {
                let pic = document.createElement("img");
                pic.src = "./images/rocks.jpg";
                pic.className = "rock"
                pic.id = id;
                tilesArray[i][j] = { "type": "rocks", "id": id };
                tile.appendChild(pic)
            }
            if ((i == 9) || (i == 8)) {
                let pic = document.createElement("img");
                pic.src = "./images/dirt.jpg";
                pic.className = "dirt"
                pic.id = id;
                tilesArray[i][j] = { "type": "dirt", "id": id };
                tile.appendChild(pic)
            }
            tile.className = "tile" + " " + id;
            world.appendChild(tile);
            id++;
        }
    }
}

const toolBoxArray = [
    { "name": "axe", "image": "axe.png" },
    { "name": "pickaxe", "image": "Pickaxe.png" },
    { "name": "shovel", "image": "Shovel.png" }
]
const inventoryArray = [
    { "name": "trees", "image": "trees.jpg", "quantity": 0 },
    { "name": "rocks", "image": "rocks.jpg", "quantity": 0 },
    { "name": "dirt", "image": "dirt.jpg", "quantity": 0 }
]
const toolBox = document.querySelector(".toolbox");
const inventory = document.querySelector(".inventory");
const player = document.querySelector("#player");
const world = document.querySelector(".world");
let tool = toolBoxArray[0].name;
let build = "trees";
let tilesArray = [];
let direction;
let left = 0;
let topPosition = 0;
let tilesY = [];
let tilesX = [];
let tile = "trees";


toolBoxArray.forEach(tool => {
    let img = document.createElement("img");
    img.src = `./images/${tool.image}`
    img.id = tool.name;
    img.addEventListener("click", e => changeTool(e.target));
    toolBox.appendChild(img);
})
const createInventory = () => {
    inventory.innerHTML = "";
    inventoryArray.forEach(tile => {
        let div = document.createElement("div");
        div.className = "inventory-item";
        let img = document.createElement("img");
        img.src = `./images/${tile.image}`;
        img.id = tile.name;
        let badge = document.createElement("span");
        badge.className = "badge";
        badge.style.position = "absolute";
        badge.innerHTML = tile.quantity;
        div.appendChild(img);
        div.appendChild(badge)
        inventory.appendChild(div);
    });
    console.log(build);
    document.querySelector(`#${build}`).classList.add("active");
}

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
createBoard();
setArrayOfObstacles();
player.style.width = document.querySelector(".tile").getBoundingClientRect().width + "px";
player.style.height = document.querySelector(".tile").getBoundingClientRect().height + "px";
document.querySelectorAll(".inventory img")[0].className = "active"


const inventoryItems = document.querySelectorAll(".inventory-item img");
