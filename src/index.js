// index.js
import "./styles.css";
import { makeBoard, setBoard, isWalkable } from "./board.js";
import {
  setDisplay,
  updatePlayer,
  getBuildingImgByIndex, // <-- you need to EXPORT this from renderer.js
} from "./renderer.js";
import { createPlayer } from "./player.js";
import { GameState } from "./gameState.js";
import { setRandomGoal, checkGoal } from "./goalSystem.js";
import { initMenu } from "./menu.js";
import { confettiBurst } from "./confetti.js";
import { initLegend } from "./legend.js";

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

initLegend();

/* =====================
   Runtime State
===================== */
let board = null;
let player = null;

/* =====================
   Goal UI + Visibility
===================== */
function renderGoalUI() {
  if (!el.goalLabel || !el.goalImg) return;

  // No goal
  if (GameState.mode !== "level" || !GameState.goal) {
    el.goalLabel.textContent = "";
    el.goalImg.style.display = "none";
    el.goalImg.removeAttribute("src");
    return;
  }

  // Goal completed (show OKAY!)
  if (GameState.goalComplete) {
    el.goalLabel.textContent = "OKAY!";
    el.goalImg.style.display = "none";
    el.goalImg.removeAttribute("src");
    return;
  }

  // Normal goal display
  el.goalLabel.textContent = `Where is the ${GameState.goal.building.name}?`;
  el.goalImg.src = getBuildingImgByIndex(GameState.goal.building.imgIndex);
  el.goalImg.alt = GameState.goal.building.name;
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
  GameState.goalComplete = false;

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
    // highlightGoal(board, GameState.goal);
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
    GameState.goalComplete = true; // <- new
    renderGoalUI(); // shows OKAY!
    confettiBurst(); // confetti

    el.nextBtn.style.display = "block"; // keep your existing flow
  }
}

function resetLevel() {
  if (!player || !board) return;

  // Reset player position
  player.y = 4;
  player.x = 2;
  player.orientation = "north";

  updatePlayer(player);
  GameState.goalComplete = false;

  // New goal
  GameState.goal = setRandomGoal(board);

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
