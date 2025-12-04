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

const buildingImgs = [tileBuilding1, tileBuilding2,
    tileBuilding3, tileBuilding4, tileBuilding5,
    tileBuilding6, tileBuilding7];
let buildingCounter = 0;

export function setDisplay(board) {
    // buildingCounter = 0;
    for (let y = 0; y < board.length; y++) {
        for (let x = 0; x < board[y].length; x++) {
            const cell = board[y][x];

            // Draw terrain
            switch (cell.map) {
                case "building":
                    const img = buildingImgs[cell.buildingIndex];
                    cell.el.style.backgroundImage = `url(${img})`;
                    break;
                case "path":
                    cell.el.style.backgroundImage = `url(${tilePath})`;
                    break
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
    // Draw player at its current position
    const playerCell = document.getElementById("player");
    const TILE_SIZE = 100;
    const PLAYER_SIZE = 50;
    playerCell.style.width = PLAYER_SIZE + "px";
    playerCell.style.height = PLAYER_SIZE + "px";
    playerCell.style.left = `${player.x * TILE_SIZE + 35}px`;
    playerCell.style.top = `${player.y * TILE_SIZE + 35}px`;

    switch (player.orientation) {
        case "east":
            playerCell.style.transform = "rotate(90deg)";
            break;
        case "south":
            playerCell.style.transform = "rotate(180deg)";
            break;
        case "west":
            playerCell.style.transform = "rotate(270deg)";
            break;
        case "north":
            playerCell.style.transform = "rotate(0deg)";
            break;
    }
}