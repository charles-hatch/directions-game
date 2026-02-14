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

// ===== Confetti (vanilla canvas) =====
const confettiCanvas = document.getElementById("confetti");
const confettiCtx = confettiCanvas?.getContext("2d");
let confettiRAF = null;
let confettiParticles = [];

function resizeConfetti() {
  if (!confettiCanvas) return;
  const dpr = window.devicePixelRatio || 1;
  confettiCanvas.width = Math.floor(window.innerWidth * dpr);
  confettiCanvas.height = Math.floor(window.innerHeight * dpr);
  confettiCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
window.addEventListener("resize", resizeConfetti);
resizeConfetti();

function confettiBurst() {
  if (!confettiCanvas || !confettiCtx) return;
  resizeConfetti();

  const colors = ["#ffd166", "#06d6a0", "#118ab2", "#ef476f", "#ffffff"];
  const originX = window.innerWidth / 2;
  const originY = window.innerHeight * 0.25;

  confettiParticles = Array.from({ length: 120 }, () => {
    const angle = Math.random() * Math.PI - Math.PI / 2; // spray outward
    const speed = 3 + Math.random() * 5;
    return {
      x: originX + (Math.random() * 60 - 30),
      y: originY + (Math.random() * 30 - 15),
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      w: 5 + Math.random() * 6,
      h: 7 + Math.random() * 10,
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.25,
      color: colors[(Math.random() * colors.length) | 0],
    };
  });

  const gravity = 0.12;
  const drag = 0.995;
  const start = performance.now();
  const duration = 1400;

  if (confettiRAF) cancelAnimationFrame(confettiRAF);

  function tick(now) {
    const elapsed = now - start;

    confettiCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for (const p of confettiParticles) {
      p.vx *= drag;
      p.vy = p.vy * drag + gravity;

      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;

      confettiCtx.save();
      confettiCtx.translate(p.x, p.y);
      confettiCtx.rotate(p.rot);
      confettiCtx.fillStyle = p.color;
      confettiCtx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      confettiCtx.restore();
    }

    const allOff = confettiParticles.every(
      (p) => p.y > window.innerHeight + 40,
    );
    if (elapsed > duration || allOff) {
      confettiCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      confettiRAF = null;
      return;
    }

    confettiRAF = requestAnimationFrame(tick);
  }

  confettiRAF = requestAnimationFrame(tick);
}

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

// when this is done winning confetti
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

// PREVENT SAME GOAL REPEATING TWICE
// REMOVE BORDER
