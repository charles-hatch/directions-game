//board.js
const gameBoard = document.querySelector("#game-board");

export function makeBoard() {
  const size = 5;
  const boxSize = 100;
  const board = [];

  gameBoard.style.width = size * boxSize + "px";

  for (let y = 0; y < size; y++) {
    const row = [];
    for (let x = 0; x < size; x++) {
      const box = document.createElement("div");
      box.style.width = boxSize + "px";
      box.style.height = boxSize + "px";
      box.style.backgroundColor = "white";
      box.style.boxSizing = "border-box";

      gameBoard.appendChild(box);
      row.push({
        map: null,
        building: null, // <- add this
        el: box,
      });
    }
    board.push(row);
  }
  return board;
}

export function setBoard(board) {
  const buildings = [
    { y: 0, x: 0, id: "pet-shop", name: "Pet Shop", imgIndex: 0 },
    { y: 0, x: 1, id: "bank", name: "Bank", imgIndex: 1 },
    { y: 0, x: 4, id: "temple", name: "Temple", imgIndex: 2 },
    { y: 2, x: 1, id: "house", name: "House", imgIndex: 3 },
    { y: 2, x: 3, id: "hospital", name: "Hospital", imgIndex: 4 },
    { y: 2, x: 4, id: "supermarket", name: "Supermarket", imgIndex: 5 },
    { y: 4, x: 4, id: "school", name: "School", imgIndex: 6 },
  ];

  buildings.forEach((b) => {
    const cell = board[b.y][b.x];
    cell.map = "building";
    cell.building = { id: b.id, name: b.name, imgIndex: b.imgIndex };
  });

  // paths stay the same
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
