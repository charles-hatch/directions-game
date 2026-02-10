// index.js
import "./styles.css";
import { makeBoard, setBoard, isWalkable } from "./board.js";
import { setDisplay, updatePlayer } from "./renderer.js";
import { createPlayer } from "./player.js";
import { GameState } from "./gameState.js";

import tileBuilding1 from "./tiles/tileBuilding1.png";
import tileBuilding2 from "./tiles/tileBuilding2.png";
import tileBuilding3 from "./tiles/tileBuilding3.png";
import tileBuilding4 from "./tiles/tileBuilding4.png";
import tileBuilding5 from "./tiles/tileBuilding5.png";
import tileBuilding6 from "./tiles/tileBuilding6.png";
import tileBuilding7 from "./tiles/tileBuilding7.png";

/* =====================
   Screen Management
===================== */
const menuScreen = document.getElementById("menu-screen");
const gameScreen = document.getElementById("game-screen");

function showGameScreen() {
  menuScreen.hidden = true;
  gameScreen.hidden = false;
}

/* =====================
   Assets
===================== */
const buildingImgs = [
  tileBuilding1,
  tileBuilding2,
  tileBuilding3,
  tileBuilding4,
  tileBuilding5,
  tileBuilding6,
  tileBuilding7,
];

/* =====================
   Game State
===================== */
let board = null;
let player = null;

/* =====================
   Game Setup
===================== */
function startGame() {
  // Clear old board if restarting
  document.getElementById("game-board").innerHTML = "";

  board = makeBoard();
  player = createPlayer(4, 2);
  setBoard(board, buildingImgs);
  setDisplay(board);
  updatePlayer(player);
}

/* =====================
   Controls
===================== */
const turnRightBtn = document.querySelector("#turn-right-btn");
const turnLeftBtn = document.querySelector("#turn-left-btn");
const goStraightBtn = document.querySelector("#go-straight-btn");

turnRightBtn.addEventListener("click", () => {
  if (!player) return;
  player.turnRight();
  updatePlayer(player);
});

turnLeftBtn.addEventListener("click", () => {
  if (!player) return;
  player.turnLeft();
  updatePlayer(player);
});

goStraightBtn.addEventListener("click", () => {
  if (!player || !board) return;

  if (isWalkable(board, player.y, player.x, player.orientation)) {
    player.move();
    updatePlayer(player);
  }
});

/* =====================
   Menu
===================== */
document.querySelectorAll("#menu-screen button").forEach((button) => {
  button.addEventListener("click", () => {
    GameState.mode = button.dataset.mode; // "free" | "teacher"
    GameState.screen = "game";
    showGameScreen();
    startGame();
  });
});
