// index.js
import "./styles.css";
import { makeBoard, setBoard, isWalkable } from "./board.js";
import { setDisplay, updatePlayer } from "./renderer.js";
import { createPlayer } from './player.js';
import tileBuilding1 from "./tiles/tileBuilding1.png";
import tileBuilding2 from "./tiles/tileBuilding2.png";
import tileBuilding3 from "./tiles/tileBuilding3.png";
import tileBuilding4 from "./tiles/tileBuilding4.png";
import tileBuilding5 from "./tiles/tileBuilding5.png";
import tileBuilding6 from "./tiles/tileBuilding6.png";
import tileBuilding7 from "./tiles/tileBuilding7.png";

const buildingImgs = [
    tileBuilding1,
    tileBuilding2,
    tileBuilding3,
    tileBuilding4,
    tileBuilding5,
    tileBuilding6,
    tileBuilding7
];


const board = makeBoard();
const player = createPlayer(4, 2);
setBoard(board, buildingImgs);
setDisplay(board);
updatePlayer(player)
//Game Setup

console.log(board)

//btns
const turnRightBtn = document.querySelector('#turn-right-btn');
turnRightBtn.addEventListener("click", () => {
    player.turnRight();
    updatePlayer(player);
});

const turnLeftBtn = document.querySelector('#turn-left-btn');
turnLeftBtn.addEventListener("click", () => {
    player.turnLeft();
    updatePlayer(player);
});


const goStraightBtn = document.querySelector('#go-straight-btn');
goStraightBtn.addEventListener("click", () => {
    if (isWalkable(board, player.y, player.x, player.orientation)) {
        player.move();
    } else {
        return;
    };
    updatePlayer(player);
});

//RESET BTN


// To Dp: Add GOAL building, add "you can see it on your right etc."
// create a nice design
//reset button
//levels
//how are goals set
//how are buildings set?
//start screen
//refactor my code, using odin principles. Each function should have a single purpose
//multipurpose functiosn can be condensed



// 4. A tiny off-center issue on the player

// You offset by 35px:

// left = x * 100 + 35
// top  = y * 100 + 35


// Correct center = (100 - 50) / 2 = 25.
// If it looked “a bit left,” your source icon probably has empty padding.

// Use translate(-50%, -50%) instead. That removes pixel-magic completely.

// Example (not code you must use; concept):

// Place player at (x * TILE_SIZE + 50, y * TILE_SIZE + 50)

// Apply CSS transform to center it.


// 5. isWalkable should check allowed types more cleanly

// Right now:

// if (map === "path" || map === "path2" || map === "path3")


// Consider a whitelist:



// 9. Path types (path, path2, path3) feel arbitrary

// You could unify them:

// type: "path"
// variant: "straight" | "center" | "horizontal"


// Cleaner long-term.

// const walkable = new Set(["path", "path2", "path3"]);
// return walkable.has(board[y][x].map);

// future implementations ( a legend, for self study) -- explains game logic in JP and English
//you can see it on your left etc. how to make it work.
// memo, my PATH should be thinner than the rest of the board



// console.log("Checking player stats")
// console.log(player.y, player.x);
// console.log(player.getPosition());
// console.log(board)
// console.log("Checking player stats end")
//     console.log(player.y, player.x);
// console.log(player.getPosition())
//Note to self, when you expand to multiple levels, you need to clear the DOM and the baord etc. before setting it.