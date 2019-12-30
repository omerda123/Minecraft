const movePlayer = (e) => {
    let closeObsticalesOnX = tilesX.filter((tile)=> {return (tile > player.getBoundingClientRect().left) && (tile < player.getBoundingClientRect().left+40)})
    let closeObsticalesOnY = tilesY.filter((tile)=> {return (tile > player.getBoundingClientRect().top) && (tile < player.getBoundingClientRect().top+80)})
    console.log(closeObsticalesOnX)
    console.log(closeObsticalesOnY)
    console.log(player.getBoundingClientRect().left + " : " + (player.getBoundingClientRect().top) );
    if (e.keyCode == '87') {
        if (topPosition>0)
            topPosition -= 1;
        player.style.top = topPosition + "%"
        // up arrow
    }
    else if (e.keyCode == '83') {
        if(topPosition < 57)
            topPosition += 1;
        player.style.top = topPosition + "%"
        // down arrow
    }
    else if (e.keyCode == '65') {
        player.style.transform = "rotateY(180deg)";
        if (left > 0)
            left -= 1;
        player.style.left = left + "%"
        // left arrow
    }
    else if (e.keyCode == '68') {
        player.style.transform = "rotateY(0deg)";
        if (left < 95) 
            left += 1;
        player.style.left = left + "%"
        // right arrow
    }
}

const setArrayOfObstacles = () =>{
    const tiles = document.querySelectorAll(".tile img");
    tiles.forEach( tile => {
        tilesX.push(tile.x);
        tilesY.push(tile.y);
    })
    console.log (tilesX);
    console.log (tilesY)

}
const createBoard = () => {
    
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 20; j++) {

            let tile = document.createElement("div");
            tile.addEventListener("click",  (e) => console.log(`obsticle : ${e.pageX} , ${e.pageY}`))
            if (( (i==3) || (i==4) )&&( (j==12) || (j==13) || (j==14))){
                let pic = document.createElement("img");
                pic.src= "./images/trees.jpg";
                tile.appendChild(pic)
            }

            if (((i==6) || (i==5) || (i==4) )&& (j==13)){
                let pic = document.createElement("img");
                pic.src= "./images/log.jpg";
                tile.appendChild(pic)
            }
            if (i===7){
                let pic = document.createElement("img");
                pic.src= "./images/rocks.jpg";
                tile.appendChild(pic)
            }
            if ((i==9) || (i==8)) {
                let pic = document.createElement("img");
                pic.src= "./images/dirt.jpg";
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
});

document.addEventListener("keydown", movePlayer);
document.querySelectorAll(".toolbox img")[0].className = "active"
document.querySelectorAll(".inventory img")[0].className = "active"
createBoard();
setArrayOfObstacles();