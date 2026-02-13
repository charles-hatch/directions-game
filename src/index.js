// index.js
import "./styles.css";
import { makeBoard, setBoard, isWalkable } from "./board.js";
import {
  setDisplay,
  updatePlayer,
  highlightGoal,
  clearGoalHighlight,
  getBuildingImgByIndex, // <-- you need to EXPORT this from renderer.js
} from "./renderer.js";
import { createPlayer } from "./player.js";
import { GameState } from "./gameState.js";
import { setRandomGoal, checkGoal } from "./goalSystem.js";
import { initMenu } from "./menu.js";

/* =====================
   DOM
===================== */
const el = {
  gameBoard: document.getElementById("game-board"),
  menuBtn: document.getElementById("menu-btn"),
  nextBtn: document.getElementById("next-btn"),

  turnRightBtn: document.getElementById("turn-right-btn"),
  turnLeftBtn: document.getElementById("turn-left-btn"),
  goStraightBtn: document.getElementById("go-straight-btn"),

  answerLeftBtn: document.getElementById("answer-left"),
  answerRightBtn: document.getElementById("answer-right"),
  answerFrontBtn: document.getElementById("answer-front"),

  // Optional goal UI (only works if these exist in your HTML)
  goalLabel: document.getElementById("goal-label"), // <div id="goal-label"></div>
  goalImg: document.getElementById("goal-img"), // <img id="goal-img" />
};

/* =====================
   Runtime State
===================== */
let board = null;
let player = null;

/* =====================
   Goal UI + Visibility
===================== */
function renderGoalUI() {
  // If you haven't added the HTML yet, silently do nothing
  if (!el.goalLabel || !el.goalImg) return;

  if (GameState.mode !== "level" || !GameState.goal) {
    el.goalLabel.textContent = "";
    el.goalImg.removeAttribute("src");
    el.goalImg.style.display = "none";
    return;
  }

  const { building } = GameState.goal;
  el.goalLabel.textContent = `Where is the ${building.name}?`;

  el.goalImg.src = getBuildingImgByIndex(building.imgIndex);
  el.goalImg.alt = building.name;
  el.goalImg.style.display = "block";
}

function updateGoalVisibility() {
  if (GameState.mode !== "level" || !GameState.goal || !player) {
    GameState.currentVisibleDirection = null;
    return;
  }

  const direction = checkGoal(player, GameState.goal);
  GameState.currentVisibleDirection = direction; // left/right/front/behind/null
}

/* =====================
   Level Lifecycle
===================== */
function initLevel() {
  // Clear board DOM
  el.gameBoard.innerHTML = "";

  // Build new board + player
  board = makeBoard();
  player = createPlayer(4, 2);

  // Apply map + render tiles
  setBoard(board);
  setDisplay(board);

  // Render player
  updatePlayer(player);

  // Create goal (level mode)
  if (GameState.mode === "level") {
    GameState.goal = setRandomGoal(board);
    highlightGoal(board, GameState.goal);
  } else {
    GameState.goal = null;
  }

  // Sync UI/state
  renderGoalUI();
  updateGoalVisibility();

  // Hide next button until correct
  el.nextBtn.style.display = "none";
}

function resetGameState() {
  GameState.goal = null;
  GameState.currentVisibleDirection = null;
  board = null;
  player = null;
  el.gameBoard.innerHTML = "";
  el.nextBtn.style.display = "none";
  renderGoalUI();
}

/* =====================
   Movement + Turn Helpers
===================== */
function afterPlayerChanged() {
  updatePlayer(player);
  updateGoalVisibility();
  // If you want debug logs, put them here (one place)
  // if (GameState.currentVisibleDirection) console.log(GameState.currentVisibleDirection);
}

function turnRight() {
  if (!player) return;
  player.turnRight();
  afterPlayerChanged();
}

function turnLeft() {
  if (!player) return;
  player.turnLeft();
  afterPlayerChanged();
}

function goStraight() {
  if (!player || !board) return;
  if (!isWalkable(board, player.y, player.x, player.orientation)) return;

  player.move();
  afterPlayerChanged();
}

/* =====================
   Answer / Win Flow
===================== */
function handleAnswer(answer) {
  if (GameState.mode !== "level" || !GameState.goal) return;

  if (GameState.currentVisibleDirection === answer) {
    // Correct
    clearGoalHighlight(board);

    // Keep goal if you want to show it in the UI until next level,
    // or set null if you want the panel to clear:
    // GameState.goal = null;

    el.nextBtn.style.display = "block";
  } else {
    // Wrong
    // console.log("Try again");
  }
}

function resetLevel() {
  if (!player || !board) return;

  // Reset player position
  player.y = 4;
  player.x = 2;
  player.orientation = "north";

  updatePlayer(player);

  // Clear old highlight
  clearGoalHighlight(board);

  // New goal
  GameState.goal = setRandomGoal(board);
  highlightGoal(board, GameState.goal);

  // Sync UI/state
  renderGoalUI();
  updateGoalVisibility();

  // Hide button
  el.nextBtn.style.display = "none";
}

/* =====================
   Menu
===================== */
const menu = initMenu({
  onStartGame: initLevel,
});

el.menuBtn.addEventListener("click", () => {
  menu.showMenuScreen();
  resetGameState();
});

/* =====================
   Controls Wiring
===================== */
el.turnRightBtn.addEventListener("click", turnRight);
el.turnLeftBtn.addEventListener("click", turnLeft);
el.goStraightBtn.addEventListener("click", goStraight);

el.answerLeftBtn.addEventListener("click", () => handleAnswer("left"));
el.answerRightBtn.addEventListener("click", () => handleAnswer("right"));
el.answerFrontBtn.addEventListener("click", () => handleAnswer("front"));

el.nextBtn.addEventListener("click", resetLevel);

// Today things I want to do
// Assign names of the buildings to each building
// display the "goal" objective block to the right. "Where is the < bank > ? and display a picture of that building next to it"
// when this is done, there should be a popup that displays a GOAL COMPELTE message (Go to next level? -- GO button) and winning confetti
//for now, this is a random repeated, loop -- but will be expanded on in the future. I should make a note of this in my readme and to do.

//I want to add a "Logo" or some kind of improvements on the main meun
//update stylings on the menu and main game screen++
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
