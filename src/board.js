//board.js
const gameBoard = document.querySelector("#game-board");

export function makeBoard() {
  const size = 5;
  let boxSize = 100;
  const board = [];
  let boardWidth = size * boxSize;
  gameBoard.style.width = boardWidth + "px";

  for (let y = 0; y < size; y++) {
    const row = [];
    for (let x = 0; x < size; x++) {
      const box = document.createElement("div");
      box.style.width = boxSize + "px";
      box.style.height = boxSize + "px";
      // box.style.border = "solid red 1px"
      box.style.backgroundColor = "white";
      box.style.boxSizing = "border-box";

      gameBoard.appendChild(box);
      row.push({
        map: null,
        buildingIndex: null,
        el: box,
      });
    }
    board.push(row);
  }
  return board;
}

export function setBoard(board) {
  let i = 0;
  // Buildings
  const buildings = [
    [0, 0],
    [0, 1],
    [0, 4],
    [2, 1],
    [2, 3],
    [2, 4],
    [4, 4],
  ];

  buildings.forEach(([y, x]) => {
    board[y][x].map = "building";
    board[y][x].buildingIndex = i;

    i++;
  });

  // Walkable paths
  const paths = [
    [4, 2],
    [3, 2],
    [2, 2],
    [1, 2],
    [0, 2],
  ];
  paths.forEach(([y, x]) => {
    board[y][x].map = "path";
  });

  const pathCenter = [
    [3, 2],
    [1, 2],
  ];
  pathCenter.forEach(([y, x]) => {
    board[y][x].map = "path2";
  });

  const pathHorizontal = [
    [1, 0],
    [1, 1],
    [1, 3],
    [1, 4],
    [3, 0],
    [3, 1],
    [3, 3],
    [3, 4],
  ];
  pathHorizontal.forEach(([y, x]) => {
    board[y][x].map = "path3";
  });
}

export function isWalkable(board, y, x, orientation) {
  switch (orientation) {
    case "north":
      y--;
      break;
    case "south":
      y++;
      break;
    case "west":
      x--;
      break;
    case "east":
      x++;
      break;
  }
  if (x < 0 || x >= board.length) return false;
  if (y < 0 || y >= board[0].length) return false;

  if (
    board[y][x].map === "path" ||
    board[y][x].map === "path2" ||
    board[y][x].map === "path3"
  ) {
    return true;
  } else {
    return false;
  }
}
