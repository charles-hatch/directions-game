//board.js
export const greet = "Hello, Odinite!";

const gameBoard = document.querySelector("#game-board");

export function makeBoard() {
    const size = 5;
    const board = [];

    let boxSize = 100;
    let boardWidth = size * boxSize; //the physical width of our boxes are 100px, and we set the pixel width of our board to 100 x the amoutn of boxes
    gameBoard.style.width = boardWidth + "px";

    for (let y = 0; y < size; y++) {
        const row = [];

        for (let x = 0; x < size; x++) {
            const box = document.createElement("div");
            box.style.width = boxSize + "px";
            box.style.height = boxSize + "px";
            box.style.border = "solid red 1px"
            box.style.backgroundColor = "white";
            box.style.boxSizing = "border-box";

            gameBoard.appendChild(box);
            row.push({
                map: null,
                player: null,
                el: box
            }); // your “empty cell”s properties, map, player, and element (the div)
        }

        board.push(row); //push each cell on each row and repeat for loop
    }
    console.log(board)
    return board;

}


export function setBoard(board) {
    // Buildings
    const buildings = [
        [0, 1], [0, 3], [2, 1], [2, 3]
    ];
    buildings.forEach(([y, x]) => {
        board[y][x].map = "building";
    });

    // Walkable paths
    const paths = [
        [4, 2], [3, 2], [2, 2], [1, 2], [0, 2],

    ];
    paths.forEach(([y, x]) => {
        board[y][x].map = "path";
    });

    const pathCenter = [
        [3, 2], [1, 2]
    ];
    pathCenter.forEach(([y, x]) => {
        board[y][x].map = "path2";
    });

    const pathHorizontal = [
        [1, 0], [1, 1], [1, 3], [1, 4],
        [3, 0], [3, 1], [3, 3], [3, 4]
    ];
    pathHorizontal.forEach(([y, x]) => {
        board[y][x].map = "path3";
    });


    // Player
    const [playerY, playerX] = [4, 2];  // first = row, second = column
    board[playerY][playerX].player = "player";

}


export function isWalkable(board, y, x, orientation) {
    console.log("CHECKING IF WALKABLE")
    console.log("O = " + orientation + " , Position Y: " + y + " Position X: " + x)

    switch (orientation) {
        case "north": y--; break;
        case "south": y++; break;
        case "west": x--; break;
        case "east": x++; break;
    }
    if (x < 0 || x >= board.length) return false;
    if (y < 0 || y >= board[0].length) return false;

    console.log("Checking Position at " + y + " ," + x)

    if (board[y][x].map === "path" || "path2" || "path3") {
        console.log("loction at " + y + " and " + x + " " + " is a path")
        return true;
    } else {
        console.log("loction at " + y + " and " + x + " " + " is not a path")
        return false;
    }

}


