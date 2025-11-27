// index.js
import "./styles.css";
import { makeBoard, setBoard } from "./board.js";
import { updateDisplay } from "./renderer.js";
import { createPlayer } from './player.js';

const board = makeBoard();
setBoard(board);
console.log(board);


const player = createPlayer(2, 4);
console.log(player.getPosition());
console.log(player.getOrientation());
console.log(player.turnRight());

updateDisplay(board, player);

const turnRightButton = document.querySelector('turn-right-btn');



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