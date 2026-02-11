// index.js
import "./styles.css";
import { makeBoard, setBoard, isWalkable } from "./board.js";
import { setDisplay, updatePlayer } from "./renderer.js";
import { createPlayer } from "./player.js";
import { GameState } from "./gameState.js";
import { setRandomGoal, checkGoal } from "./goalSystem.js";
import { highlightGoal, clearGoalHighlight } from "./renderer.js";

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
   Game State
===================== */
let board = null;
let player = null;

function updateGoalVisibility() {
  if (GameState.mode !== "level" || !GameState.goal) return;

  const direction = checkGoal(player, GameState.goal);

  GameState.currentVisibleDirection = direction; // can be left/right/front/behind/null

  if (direction) {
    console.log(`Building is ${direction}`);
  }
}

/* =====================
   Game Setup
===================== */
function startGame() {
  document.getElementById("game-board").innerHTML = "";

  board = makeBoard();
  player = createPlayer(4, 2);
  setBoard(board);
  setDisplay(board);
  updatePlayer(player);
  updateGoalVisibility();

  if (GameState.mode === "level") {
    GameState.goal = setRandomGoal(board);
    highlightGoal(board, GameState.goal);
  }
}

/* =====================
   Controls
===================== */
const turnRightBtn = document.querySelector("#turn-right-btn");
const turnLeftBtn = document.querySelector("#turn-left-btn");
const goStraightBtn = document.querySelector("#go-straight-btn");
const menuBtn = document.getElementById("menu-btn");
const answerLeftBtn = document.getElementById("answer-left");
const answerRightBtn = document.getElementById("answer-right");
const answerFrontBtn = document.getElementById("answer-front");

turnRightBtn.addEventListener("click", () => {
  if (!player) return;
  player.turnRight();
  updatePlayer(player);
  updateGoalVisibility();

  if (GameState.mode === "level" && GameState.goal) {
    const direction = checkGoal(player, GameState.goal);

    if (direction) {
      console.log(`You can see it on your ${direction}`);
    }
  }
});

turnLeftBtn.addEventListener("click", () => {
  if (!player) return;
  player.turnLeft();
  updatePlayer(player);
  updateGoalVisibility();

  if (GameState.mode === "level" && GameState.goal) {
    const direction = checkGoal(player, GameState.goal);

    if (direction) {
      console.log(`You can see it on your ${direction}`);
    }
  }
});

goStraightBtn.addEventListener("click", () => {
  if (!player || !board) return;

  if (isWalkable(board, player.y, player.x, player.orientation)) {
    player.move();
    updatePlayer(player);
    updateGoalVisibility();

    if (GameState.mode === "level" && GameState.goal) {
      const direction = checkGoal(player, GameState.goal);

      if (direction) {
        console.log(`You can see it on your ${direction}`);
      }
    }
  }
});

menuBtn.addEventListener("click", () => {
  showMenuScreen();
});

function handleAnswer(answer) {
  if (GameState.mode !== "level" || !GameState.goal) return;

  if (GameState.currentVisibleDirection === answer) {
    console.log("Correct");
    clearGoalHighlight(board);
    GameState.goal = null;
    const nextBtn = document.getElementById("next-btn");
    nextBtn.style.display = "block";
  } else {
    console.log("Try again");
  }
}

answerLeftBtn.addEventListener("click", () => handleAnswer("left"));
answerRightBtn.addEventListener("click", () => handleAnswer("right"));
answerFrontBtn.addEventListener("click", () => handleAnswer("front"));

/* =====================
   Menu
===================== */
document.querySelectorAll("#menu-screen button").forEach((button) => {
  button.addEventListener("click", () => {
    GameState.mode = button.dataset.mode; // "free" | "level"
    GameState.screen = "game";
    showGameScreen();
    startGame();
  });
});

function showMenuScreen() {
  gameScreen.hidden = true;
  menuScreen.hidden = false;

  GameState.screen = "menu";
  GameState.goal = null;
  board = null;
  player = null;
  if (board) clearGoalHighlight(board);

  document.getElementById("game-board").innerHTML = "";
}

document.getElementById("next-btn").addEventListener("click", resetLevel);

function resetLevel() {
  if (!player || !board) return;

  // Reset player position
  player.x = 4;
  player.y = 2;
  player.orientation = "north"; // match your player system

  updatePlayer(player);

  // Clear old highlight
  clearGoalHighlight(board);

  // Create new goal
  GameState.goal = setRandomGoal(board);

  // Highlight new goal
  highlightGoal(board, GameState.goal);

  // Hide button
  document.getElementById("next-btn").style.display = "none";
}

// note to self, messages and names of buildings need to be assigned
//to each object
// so we can announce XYZ, the names of the buildings...
// the actual "goal" can be shown in the bottom or right or top right
//of the screen "your goal, find this place"
//the LEGEND will explain teh names of each of the buildings
// and japanese translations for direction btns etc.
//but english wont show on the standard screen

//I AM NOT SURE IF THE LEFT RIGHT LOGIC IS PERFECT BASED ON DIRECTION
