//renderer.js
import tileGrass from "./tiles/tileGrass.png";
import tilePath from "./tiles/tilePath.jpg";
import tileCenter from "./tiles/tileCenter.png";
import tileBuilding1 from "./tiles/tileBuilding1.png";
import tileBuilding2 from "./tiles/tileBuilding2.png";
import tileBuilding3 from "./tiles/tileBuilding3.png";
import tileBuilding4 from "./tiles/tileBuilding4.png";
import tileBuilding5 from "./tiles/tileBuilding5.png";
import tileBuilding6 from "./tiles/tileBuilding6.png";
import tileBuilding7 from "./tiles/tileBuilding7.png";

const buildingImgs = [
  tileBuilding1,
  tileBuilding2,
  tileBuilding3,
  tileBuilding4,
  tileBuilding5,
  tileBuilding6,
  tileBuilding7,
];
let buildingCounter = 0;

export function setDisplay(board) {
  // buildingCounter = 0;
  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board[y].length; x++) {
      const cell = board[y][x];
      cell.el.classList.add("tile");

      // Draw terrain
      switch (cell.map) {
        case "building":
          const img = buildingImgs[cell.buildingIndex % buildingImgs.length];

          cell.el.style.backgroundImage = `url(${img})`;
          break;
        case "path":
          cell.el.style.backgroundImage = `url(${tilePath})`;
          break;
        case "path2":
          cell.el.style.backgroundImage = `url(${tileCenter})`;
          break;
        case "path3":
          cell.el.style.backgroundImage = `url(${tilePath})`;
          cell.el.style.transform = "rotate(90deg)";
          break;
        default:
          cell.el.style.backgroundImage = `url(${tileGrass})`;
      }
    }
  }
}

export function updatePlayer(player) {
  const playerEl = document.getElementById("player");

  const firstTile = document.querySelector("#game-board .tile");
  const tileSize = firstTile.offsetWidth;

  const PLAYER_SIZE = tileSize * 0.5; // scale with tile
  playerEl.style.width = PLAYER_SIZE + "px";
  playerEl.style.height = PLAYER_SIZE + "px";

  // Center using transform anchor
  playerEl.style.left = `${player.x * tileSize + tileSize / 2}px`;
  playerEl.style.top = `${player.y * tileSize + tileSize / 2}px`;

  let rotation = 0;

  switch (player.orientation) {
    case "east":
      rotation = 90;
      break;
    case "south":
      rotation = 180;
      break;
    case "west":
      rotation = 270;
      break;
    case "north":
      rotation = 0;
      break;
  }

  playerEl.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
}

export function highlightGoal(board, goal) {
  clearGoalHighlight(board);

  if (!goal) return;

  const cell = board[goal.y][goal.x];
  cell.el.classList.add("goal-highlight");
}

export function clearGoalHighlight(board) {
  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board[y].length; x++) {
      board[y][x].el.classList.remove("goal-highlight");
    }
  }
}
