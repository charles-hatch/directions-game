// index.js
// Game logic - index is only used for wiring together each module and managing game lifecycle and event handlers.
import "./styles.css";
import { GameState } from "./gameState.js";
import { createPlayer } from "./player.js";
import { makeBoard, setBoard, isWalkable, BOARD_SIZE } from "./board.js";
import { setRandomGoal, checkGoal } from "./goalSystem.js";
import { setDisplay, updatePlayer, getBuildingImgByIndex } from "./renderer.js";
import { getDom } from "./dom.js";
import { initLegend } from "./legend.js";
import { initMenu } from "./menu.js";
import { initController } from "./controller.js";
import { confettiBurst } from "./confetti.js";

/* =========================================================
   Game Setup + DOM
   ========================================================= */
const el = getDom();
initLegend();
const START_STATE = { y: 4, x: 2, orientation: "north" };
let board = null;
let player = null;

/* =========================================================
   Render Goal UI + Register Goal Completion (Level mode)
   ========================================================= */
function renderGoalUI() {
  if (!el.goalLabel || !el.goalImg) return;

  if (GameState.mode !== "level" || !GameState.goal) {
    el.goalLabel.textContent = "";
    el.goalImg.style.display = "none";
    el.goalImg.removeAttribute("src");
    el.goalImg.alt = "";
    return;
  }

  // Level Completed Success State
  if (GameState.goalComplete) {
    el.goalLabel.textContent = "OKAY!";
    el.goalImg.style.display = "none";
    el.goalImg.removeAttribute("src");
    el.goalImg.alt = "";
    return;
  }

  // Active Goal
  el.goalLabel.textContent = `Where is the ${GameState.goal.building.name}?`;
  el.goalImg.src = getBuildingImgByIndex(GameState.goal.building.imgIndex);
  el.goalImg.alt = GameState.goal.building.name;
  el.goalImg.style.display = "block";
}

function computeVisibleDirection() {
  if (GameState.mode !== "level" || !GameState.goal || !player) return null;
  return checkGoal(player, GameState.goal);
}

function syncGoalDirection() {
  GameState.currentVisibleDirection = computeVisibleDirection();
}

/* =========================================================
   Game lifecycle
   ========================================================= */
function initGame() {
  el.gameBoard.innerHTML = "";
  GameState.goalComplete = false;
  GameState.currentVisibleDirection = null;
  board = makeBoard();
  el.gameBoard.style.setProperty("--board-size", BOARD_SIZE);
  setBoard(board);
  setDisplay(board);
  player = createPlayer(START_STATE.y, START_STATE.x);
  player.orientation = START_STATE.orientation;
  updatePlayer(player);
  GameState.goal = GameState.mode === "level" ? setRandomGoal(board) : null;
  renderGoalUI();
  syncGoalDirection();
  if (el.nextBtn) el.nextBtn.style.display = "none";
}

function resetToMenu() {
  //Clear Gameplay State + DOM
  GameState.goal = null;
  GameState.currentVisibleDirection = null;
  GameState.goalComplete = false;
  board = null;
  player = null;
  el.gameBoard.innerHTML = "";
  if (el.nextBtn) el.nextBtn.style.display = "none";
  renderGoalUI();
}

/* =========================================================
   Player sync on window resize
   ========================================================= */
function syncPlayerPosition() {
  if (!player) return;
  updatePlayer(player);
  syncGoalDirection(); // direction depends on geometry + orientation
}

window.addEventListener("resize", syncPlayerPosition);
window.addEventListener("orientationchange", syncPlayerPosition);
requestAnimationFrame(syncPlayerPosition);

/* =========================================================
   Movement handlers
   ========================================================= */
function syncAfterMove() {
  if (!player) return;
  updatePlayer(player);
  syncGoalDirection();
}

function turnRight() {
  if (!player) return;
  player.turnRight();
  syncAfterMove();
}

function turnLeft() {
  if (!player) return;
  player.turnLeft();
  syncAfterMove();
}

function goStraight() {
  if (!player || !board) return;
  if (!isWalkable(board, player.y, player.x, player.orientation)) return;

  player.move();
  syncAfterMove();
}

/* =========================================================
   Answer / progression (Level mode)
   ========================================================= */
function handleAnswer(answer) {
  if (GameState.mode !== "level" || !GameState.goal) return;
  if (GameState.goalComplete) return;
  if (GameState.currentVisibleDirection !== answer) return;

  GameState.goalComplete = true;
  renderGoalUI();

  confettiBurst();
  if (el.nextBtn) el.nextBtn.style.display = "block";
}

function nextLevel() {
  if (!player || !board) return;
  player.y = START_STATE.y;
  player.x = START_STATE.x;
  player.orientation = START_STATE.orientation;

  updatePlayer(player);

  GameState.goalComplete = false;
  GameState.goal = setRandomGoal(board);

  renderGoalUI();
  syncGoalDirection();

  if (el.nextBtn) el.nextBtn.style.display = "none";
}

/* =========================================================
   Menu + Controller Wiring
   ========================================================= */
const menu = initMenu({ onStartGame: initGame });

initController(el, {
  turnRight,
  turnLeft,
  goStraight,
  answer: handleAnswer,
  next: nextLevel,
  menu: () => {
    menu.showMenuScreen();
    resetToMenu();
  },
});
