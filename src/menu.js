// menu.js
// Menu navigation + mode/character selection

import { GameState } from "./gameState.js";
import guy from "./icons/guy.png";
import girl from "./icons/girl.png";

const characterMap = {
  "guy.png": guy,
  "girl.png": girl,
};

export function initMenu({ onStartGame }) {
  const menuScreen = document.getElementById("menu-screen");
  const gameScreen = document.getElementById("game-screen");
  const panels = document.querySelectorAll(".menu-panel");

  function renderMenu() {
    panels.forEach((p) => (p.style.display = "none"));
    const active = document.getElementById(`menu-${GameState.menuView}`);
    if (active) active.style.display = "flex";
  }

  function showMenuScreen() {
    gameScreen.style.display = "none";
    menuScreen.style.display = "block";
    GameState.screen = "menu";
    GameState.menuView = "main";
    renderMenu();
  }

  function showGameScreen() {
    menuScreen.style.display = "none";
    gameScreen.style.display = "flex";
    GameState.screen = "game";
  }

  // Main buttons
  document.getElementById("start-btn").onclick = () => {
    GameState.menuView = "start";
    renderMenu();
  };

  document.getElementById("character-btn").onclick = () => {
    GameState.menuView = "character";
    renderMenu();
  };

  document.getElementById("about-btn").onclick = () => {
    GameState.menuView = "about";
    renderMenu();
  };

  document.querySelectorAll(".back-btn").forEach((btn) => {
    btn.onclick = () => {
      GameState.menuView = "main";
      renderMenu();
    };
  });

  // Mode select
  document.querySelectorAll("#menu-start [data-mode]").forEach((button) => {
    button.onclick = () => {
      GameState.mode = button.dataset.mode;
      showGameScreen();
      onStartGame();
    };
  });

  // Character select
  document
    .querySelectorAll("#menu-character [data-character]")
    .forEach((img) => {
      img.onclick = () => {
        const key = img.dataset.character;
        const src = characterMap[key];
        if (src) document.getElementById("player").src = src;

        GameState.menuView = "main";
        renderMenu();
      };
    });

  return { showMenuScreen, showGameScreen };
}
