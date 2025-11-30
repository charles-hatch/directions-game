// index.js
import "./styles.css";
import { makeBoard, setBoard, isWalkable } from "./board.js";
import { updateDisplay } from "./renderer.js";
import { createPlayer } from './player.js';

const board = makeBoard();
setBoard(board);
console.log(board);
const player = createPlayer(4, 2);
updateDisplay(board, player);
//game setup

console.log(player.y, player.x);
console.log(player.getPosition())


//btns
const turnRightBtn = document.querySelector('#turn-right-btn');
turnRightBtn.addEventListener("click", () => {
    console.log("Turn Right Button clicked");
    player.turnRight();
    updateDisplay(board, player);
    console.log(player.getOrientation())
});

const turnLeftBtn = document.querySelector('#turn-left-btn');
turnLeftBtn.addEventListener("click", () => {
    console.log("Turn Left Button clicked");

    player.turnLeft();
    updateDisplay(board, player);
        console.log(player.getOrientation())
});


const goStraightBtn = document.querySelector('#go-straight-btn');
goStraightBtn.addEventListener("click", () => {
    console.log("Go Straight Button clicked");
    board[player.y][player.x].player = null;
    //clears the current pos

    if (isWalkable(board, player.y, player.x, player.orientation)) {
        console.log("It is walkable, proceed!")
        player.move();
    } else {
        console.log("It is not walkable. Stop.")
        return;
    };

    board[player.y][player.x].player = player;
    updateDisplay(board, player);
    console.log("Checking player stats")
    console.log(player.y, player.x);
    console.log(player.getPosition());
    console.log(board)
        console.log("Checking player stats end")
});



// MAJOR ERROR WHEN TRYING TO GO OFF SCREEN! FIX!!!

// You could make a movePlayer(board, player) function that handles clearing, moving, and updating the board—then all buttons just call that.

// Later, you could add a isWalkable check before moving so the player doesn’t go through buildings.

// This keeps player and board in sync, so the renderer always shows the correct cell.

// console.log(player.getPosition());
// console.log(player.getOrientation());

//GAME LOOP, display everything, wait for input, when input, update display everything


// console.log(player.x, player.y);  // reads from the board
// player.position = { x: 3, y: 1 }; // updates the board

//self memos
//default vs named exports, i should only export one or the other

//import testImage from "./resturauntImg.png"
// const image = document.createElement("img");
// image.src = testImage;

// document.body.appendChild(image);
//importing an image
// board[player.y][player.x].player = player;

// index.js → bootstrapping only

// This file should just:

// create the board

// place initial stuff

// attach event listeners

// call renderer initially

// start the game loop (if you add one)


// future implementations ( a legend, for self study) -- explains game logic in JP and English
//you can see it on your left etc. how to make it work.
// memo, my PATH should be thinner than the rest of the board