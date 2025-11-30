import playerIcon from "./icons/player.png";
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
                    break;
                default:
                    cell.el.style.backgroundImage = `url(${tileGrass})`;
            }
        }
    }

    // Draw player at its current position
    const playerCell = board[player.y][player.x];

    playerCell.el.style.backgroundImage = `url(${playerIcon})`;
    playerCell.el.style.backgroundSize = "cover";
    playerCell.el.style.backgroundRepeat = "no-repeat";

    switch (player.orientation) {
        case "east":
            playerCell.el.style.transform = "rotate(90deg)";
            break;
        case "south":
            playerCell.el.style.transform = "rotate(180deg)";
            break;
        case "west":
            playerCell.el.style.transform = "rotate(270deg)";
            break;
        case "north":
            playerCell.el.style.transform = "rotate(0deg)";
            break;
    }
}
