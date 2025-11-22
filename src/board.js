
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
            row.push(null); // your “empty cell”
        }

        board.push(row); //push each cell on each row and repeat for loop
    }
    console.log(board)
    return board;

}


