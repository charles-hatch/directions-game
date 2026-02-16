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

export function setDisplay(board) {
  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board[y].length; x++) {
      const cell = board[y][x];
      cell.el.classList.add("tile");

      // Draw terrain
      switch (cell.map) {
        case "building": {
          const idx = cell.building?.imgIndex ?? 0;
          const img = buildingImgs[idx % buildingImgs.length];
          cell.el.style.backgroundImage = `url(${img})`;

          // optional: helpful for debugging / hover tooltips
          cell.el.title = cell.building?.name ?? "";
          break;
        }

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
  const boardEl = document.getElementById("game-board");
  const firstTile = boardEl?.querySelector(".tile");
  if (!playerEl || !boardEl || !firstTile) return;

  const tileSize = firstTile.getBoundingClientRect().width;

  // board position relative to the element player is positioned against
  const parent = playerEl.offsetParent || document.body;

  const boardRect = boardEl.getBoundingClientRect();
  const parentRect = parent.getBoundingClientRect();

  const boardLeft = boardRect.left - parentRect.left;
  const boardTop = boardRect.top - parentRect.top;

  const playerSize = Math.round(tileSize * 0.5);
  playerEl.style.width = `${playerSize}px`;
  playerEl.style.height = `${playerSize}px`;

  const cx = boardLeft + player.x * tileSize + tileSize / 2;
  const cy = boardTop + player.y * tileSize + tileSize / 2;

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
    default:
      rotation = 0;
  }

  playerEl.style.left = `${cx}px`;
  playerEl.style.top = `${cy}px`;
  playerEl.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
}

export function getBuildingImgByIndex(idx) {
  return buildingImgs[idx % buildingImgs.length];
}
