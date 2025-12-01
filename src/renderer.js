//renderer.js
import playerIcon from "./icons/guy.png";
import tileGrass from "./tiles/tileGrass.png";
import tilePath from "./tiles/tilePath.jpg";
import tileCenter from "./tiles/tileCenter.png";
import tileBuilding4 from "./tiles/tileBuilding4.png";

export function updateDisplay(board, player) {
    for (let y = 0; y < board.length; y++) {
        for (let x = 0; x < board[y].length; x++) {
            const cell = board[y][x];

            // Clear everything first
            cell.el.style.backgroundImage = "";
            cell.el.style.transform = "rotate(0deg)";

            // Draw terrain
            switch (cell.map) {
                case "building":
                    cell.el.style.backgroundImage = `url(${tileBuilding4})`;
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

    // Draw player at its current position
    const playerCell = document.getElementById("player");
    const TILE_SIZE = 100;
    const PLAYER_SIZE = 50;

    playerCell.style.width = PLAYER_SIZE + "px";
    playerCell.style.height = PLAYER_SIZE + "px";

    playerCell.style.left = `${player.x * TILE_SIZE + 35}px`;
    playerCell.style.top = `${player.y * TILE_SIZE + 35}px`;
    // playerCell.style.backgroundSize = "cover";
    // playerCell.style.backgroundRepeat = "no-repeat";


    // const playerCell = board[player.y][player.x];
    // playerCell.el.style.backgroundImage = `url(${playerIcon})`;


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
