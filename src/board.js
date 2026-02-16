//board.js
const gameBoard = document.querySelector("#game-board");

export const BOARD_SIZE = 5;

export function makeBoard() {
  const board = [];

  // reset (helps if you ever re-init)
  gameBoard.innerHTML = "";

  for (let y = 0; y < BOARD_SIZE; y++) {
    const row = [];
    for (let x = 0; x < BOARD_SIZE; x++) {
      const box = document.createElement("div");
      box.className = "tile"; // let CSS size it

      gameBoard.appendChild(box);
      row.push({
        map: null,
        building: null,
        el: box,
      });
    }
    board.push(row);
  }
  return board;
}

export function setBoard(board) {
  const buildings = [
    { y: 0, x: 0, id: "pet-store", name: "pet store", imgIndex: 0 },
    { y: 0, x: 1, id: "bank", name: "bank", imgIndex: 1 },
    { y: 0, x: 4, id: "temple", name: "temple", imgIndex: 2 },
    { y: 2, x: 1, id: "house", name: "house", imgIndex: 3 },
    { y: 2, x: 3, id: "hospital", name: "hospital", imgIndex: 4 },
    { y: 2, x: 4, id: "supermarket", name: "supermarket", imgIndex: 5 },
    { y: 4, x: 4, id: "school", name: "school", imgIndex: 6 },
  ];

  buildings.forEach((b) => {
    const cell = board[b.y][b.x];
    cell.map = "building";
    cell.building = { id: b.id, name: b.name, imgIndex: b.imgIndex };
  });

  const paths = [
    [4, 2],
    [3, 2],
    [2, 2],
    [1, 2],
    [0, 2],
  ];
  paths.forEach(([y, x]) => (board[y][x].map = "path"));

  const pathCenter = [
    [3, 2],
    [1, 2],
  ];
  pathCenter.forEach(([y, x]) => (board[y][x].map = "path2"));

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
  pathHorizontal.forEach(([y, x]) => (board[y][x].map = "path3"));
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
