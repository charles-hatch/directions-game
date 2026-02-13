// index.js
import "./styles.css";
import { makeBoard, setBoard, isWalkable } from "./board.js";
import { setDisplay, updatePlayer } from "./renderer.js";
import { createPlayer } from "./player.js";
import { GameState } from "./gameState.js";
import { setRandomGoal, checkGoal } from "./goalSystem.js";
import { highlightGoal, clearGoalHighlight } from "./renderer.js";
import { initMenu } from "./menu.js";

/* =====================
   Screen Management
===================== */
const menuScreen = document.getElementById("menu-screen");
const gameScreen = document.getElementById("game-screen");

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

function resetGameState() {
  GameState.goal = null;
  board = null;
  player = null;

  const gameBoardEl = document.getElementById("game-board");
  gameBoardEl.innerHTML = "";
}

const menu = initMenu({
  onStartGame: startGame,
});

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

menuBtn.addEventListener("click", () => {
  menu.showMenuScreen();
  resetGameState();
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

document.getElementById("next-btn").addEventListener("click", resetLevel);

function resetLevel() {
  if (!player || !board) return;

  // Reset player position
  player.y = 4;
  player.x = 2;
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

// Today things I want to do
// Assign names of the buildings to each building
// display the "goal" objective block to the right. "Where is the < bank > ? and display a picture of that building next to it"
// when this is done, there should be a popup that displays a GOAL COMPELTE message (Go to next level? -- GO button) and winning confetti
//for now, this is a random repeated, loop -- but will be expanded on in the future. I should make a note of this in my readme and to do.

//I want to add a "Logo" or some kind of improvements on the main meun
//update stylings on the menu and main game screen
// ensure the game loop is good
// add an "I" information area, where the player can get all the info they need to play, JP translations, etc. and guidance, or legend
//

// note to self, messages and names of buildings need to be assigned
//to each object
// so we can announce XYZ, the names of the buildings...
// the actual "goal" can be shown in the bottom or right or top right
//of the screen "your goal, find this place"
//the LEGEND will explain teh names of each of the buildings
// and japanese translations for direction btns etc.
//but english wont show on the standard screen
