// index.js
// App entry: wires modules + manages game lifecycle

import "./styles.css";

import { GameState } from "./gameState.js";
import { getDom } from "./dom.js";

import { createPlayer } from "./player.js";
import { makeBoard, setBoard, isWalkable, BOARD_SIZE } from "./board.js";
import { setRandomGoal, checkGoal } from "./goalSystem.js";
import { setDisplay, updatePlayer, getBuildingImgByIndex } from "./renderer.js";

import { initLegend } from "./legend.js";
import { initMenu } from "./menu.js";
import { initController } from "./controller.js";
import { confettiBurst } from "./confetti.js";

/* ---------- Setup ---------- */
const el = getDom();
initLegend();

const START = { y: 4, x: 2, orientation: "north" };

let board = null;
let player = null;

/* ---------- Goal UI (level mode) ---------- */
function computeVisibleDirection() {
  if (GameState.mode !== "level" || !GameState.goal || !player) return null;
  return checkGoal(player, GameState.goal);
}

function syncGoalDirection() {
  GameState.currentVisibleDirection = computeVisibleDirection();
}

function renderGoalUI() {
  if (!el.goalLabel || !el.goalImg) return;

  if (GameState.mode !== "level" || !GameState.goal) {
    el.goalLabel.textContent = "";
    el.goalImg.style.display = "none";
    el.goalImg.removeAttribute("src");
    el.goalImg.alt = "";
    return;
  }

  if (GameState.goalComplete) {
    el.goalLabel.textContent = "OKAY!";
    el.goalImg.style.display = "none";
    el.goalImg.removeAttribute("src");
    el.goalImg.alt = "";
    return;
  }

  el.goalLabel.textContent = `Where is the ${GameState.goal.building.name}?`;
  el.goalImg.src = getBuildingImgByIndex(GameState.goal.building.imgIndex);
  el.goalImg.alt = GameState.goal.building.name;
  el.goalImg.style.display = "block";
}

/* ---------- Lifecycle ---------- */
function initGame() {
  if (!el.gameBoard) return;

  el.gameBoard.innerHTML = "";
  el.gameBoard.style.setProperty("--board-size", BOARD_SIZE);

  GameState.goalComplete = false;
  GameState.currentVisibleDirection = null;

  board = makeBoard(el.gameBoard);
  setBoard(board);
  setDisplay(board);

  player = createPlayer(START.y, START.x);
  player.orientation = START.orientation;
  updatePlayer(player);

  GameState.goal = GameState.mode === "level" ? setRandomGoal(board) : null;

  renderGoalUI();
  syncGoalDirection();

  if (el.nextBtn) el.nextBtn.style.display = "none";
}

function resetToMenu() {
  GameState.goal = null;
  GameState.currentVisibleDirection = null;
  GameState.goalComplete = false;

  board = null;
  player = null;

  if (el.gameBoard) el.gameBoard.innerHTML = "";
  if (el.nextBtn) el.nextBtn.style.display = "none";

  renderGoalUI();
}

function syncAfterMove() {
  if (!player) return;
  updatePlayer(player);
  syncGoalDirection();
}

/* ---------- Movement ---------- */
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

/* ---------- Answer + next (level mode) ---------- */
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

  player.y = START.y;
  player.x = START.x;
  player.orientation = START.orientation;
  updatePlayer(player);

  GameState.goalComplete = false;
  GameState.goal = setRandomGoal(board);

  renderGoalUI();
  syncGoalDirection();

  if (el.nextBtn) el.nextBtn.style.display = "none";
}

/* ---------- Resize sync ---------- */
function syncPlayerPosition() {
  if (!player) return;
  updatePlayer(player);
  syncGoalDirection();
}

window.addEventListener("resize", syncPlayerPosition);
window.addEventListener("orientationchange", syncPlayerPosition);
requestAnimationFrame(syncPlayerPosition);

/* ---------- Wiring ---------- */
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
