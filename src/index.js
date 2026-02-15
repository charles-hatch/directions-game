// index.js

import "./styles.css";
import { GameState } from "./gameState.js";
import { createPlayer } from "./player.js";
import { makeBoard, setBoard, isWalkable } from "./board.js";
import { setRandomGoal, checkGoal } from "./goalSystem.js";
import { setDisplay, updatePlayer, getBuildingImgByIndex } from "./renderer.js";
import { getDom } from "./dom.js";
import { initLegend } from "./legend.js";
import { initMenu } from "./menu.js";
import { initController } from "./controller.js";
import { confettiBurst } from "./confetti.js";

/* ---------------------
   Setup
--------------------- */
const el = getDom();
initLegend();

const START_POS = { y: 4, x: 2, orientation: "north" };

let board = null;
let player = null;

/* ---------------------
   Goal UI
--------------------- */
function renderGoalUI() {
  if (!el.goalLabel || !el.goalImg) return;

  if (GameState.mode !== "level" || !GameState.goal) {
    el.goalLabel.textContent = "";
    el.goalImg.style.display = "none";
    el.goalImg.removeAttribute("src");
    return;
  }

  if (GameState.goalComplete) {
    el.goalLabel.textContent = "OKAY!";
    el.goalImg.style.display = "none";
    el.goalImg.removeAttribute("src");
    return;
  }

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

  GameState.currentVisibleDirection = checkGoal(player, GameState.goal);
}

/* ---------------------
   Level lifecycle
--------------------- */
function initLevel() {
  el.gameBoard.innerHTML = "";
  GameState.goalComplete = false;

  board = makeBoard();
  player = createPlayer(START_POS.y, START_POS.x);

  setBoard(board);
  setDisplay(board);
  updatePlayer(player);

  GameState.goal = GameState.mode === "level" ? setRandomGoal(board) : null;

  renderGoalUI();
  updateGoalVisibility();

  el.nextBtn.style.display = "none";
}

function resetGameState() {
  GameState.goal = null;
  GameState.currentVisibleDirection = null;
  GameState.goalComplete = false;

  board = null;
  player = null;

  el.gameBoard.innerHTML = "";
  el.nextBtn.style.display = "none";
  renderGoalUI();
}

/* ---------------------
   Movement
--------------------- */
function syncAfterMove() {
  updatePlayer(player);
  updateGoalVisibility();
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

/* ---------------------
   Answer / progression
--------------------- */
function handleAnswer(answer) {
  if (GameState.mode !== "level" || !GameState.goal) return;
  if (GameState.goalComplete) return;

  if (GameState.currentVisibleDirection !== answer) return;

  GameState.goalComplete = true;
  renderGoalUI();

  confettiBurst();
  el.nextBtn.style.display = "block";
}

function resetLevel() {
  if (!player || !board) return;

  player.y = START_POS.y;
  player.x = START_POS.x;
  player.orientation = START_POS.orientation;

  updatePlayer(player);

  GameState.goalComplete = false;
  GameState.goal = setRandomGoal(board);

  renderGoalUI();
  updateGoalVisibility();

  el.nextBtn.style.display = "none";
}

/* ---------------------
   Menu + controls
--------------------- */
const menu = initMenu({ onStartGame: initLevel });

initController(el, {
  turnRight,
  turnLeft,
  goStraight,
  answer: handleAnswer,
  next: resetLevel,
  menu: () => {
    menu.showMenuScreen();
    resetGameState();
  },
});
