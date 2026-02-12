// menu.js
import { GameState } from "./gameState.js";

export function initMenu({ onStartGame }) {
  const menuScreen = document.getElementById("menu-screen");
  const gameScreen = document.getElementById("game-screen");
  const panels = document.querySelectorAll(".menu-panel");

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

  function renderMenu() {
    panels.forEach((p) => (p.style.display = "none"));

    const active = document.getElementById(`menu-${GameState.menuView}`);
    if (active) active.style.display = "flex";
  }

  /* ---------- Main Buttons ---------- */

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

  /* ---------- Start Game ---------- */

  document.querySelectorAll("#menu-start [data-mode]").forEach((button) => {
    button.onclick = () => {
      GameState.mode = button.dataset.mode;
      showGameScreen();
      onStartGame(); // delegate to index.js
    };
  });

  /* ---------- Character Select ---------- */

  document
    .querySelectorAll("#menu-character [data-character]")
    .forEach((btn) => {
      btn.onclick = () => {
        const src = btn.dataset.character;
        document.getElementById("player").src = `./icons/${src}`;
        GameState.menuView = "main";
        renderMenu();
      };
    });

  return {
    showMenuScreen,
    showGameScreen,
  };
}
