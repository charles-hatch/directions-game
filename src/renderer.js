import playerIcon from "./icons/player.png";


export function updateDisplay(board, player) {
    for (let y = 0; y < board.length; y++) {
        for (let x = 0; x < board[y].length; x++) {
            const cell = board[y][x];

            if (cell.player) {
                // draw player
                cell.el.style.backgroundImage = `url(${playerIcon})`;
                cell.el.style.backgroundSize = "cover";
                cell.el.style.backgroundRepeat = "no-repeat";

                const o = player.getOrientation();
                if (o === "east") cell.el.style.transform = "rotate(90deg)";
                if (o === "south") cell.el.style.transform = "rotate(180deg)";
                if (o === "west") cell.el.style.transform = "rotate(270deg)";
                if (o === "north") cell.el.style.transform = "rotate(0deg)";



            } else {
                // draw terrain
                switch (cell.map) {
                    case "building":
                        cell.el.style.backgroundColor = "grey";
                        break;
                    case "path":
                        cell.el.style.backgroundColor = "red";
                        break;
                    default:
                        cell.el.style.backgroundColor = "green";
                }
            }

        }
    }
}

// UPDATE ORIENTATION ON RENDERER

//       cell.el.style.transform = "rotate(90deg)";