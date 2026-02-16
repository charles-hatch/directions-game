// board.js
// Board creation + static map layout (data only)

export const BOARD_SIZE = 5;

const MAP = {
  BUILDING: "building",
  PATH: "path",
  PATH_CENTER: "path2",
  PATH_H: "path3",
};

const WALKABLE = new Set([MAP.PATH, MAP.PATH_CENTER, MAP.PATH_H]);

const BUILDINGS = [
  { y: 0, x: 0, id: "pet-store", name: "pet store", imgIndex: 0 },
  { y: 0, x: 1, id: "bank", name: "bank", imgIndex: 1 },
  { y: 0, x: 4, id: "temple", name: "temple", imgIndex: 2 },
  { y: 2, x: 1, id: "house", name: "house", imgIndex: 3 },
  { y: 2, x: 3, id: "hospital", name: "hospital", imgIndex: 4 },
  { y: 2, x: 4, id: "supermarket", name: "supermarket", imgIndex: 5 },
  { y: 4, x: 4, id: "school", name: "school", imgIndex: 6 },
];

const PATHS = [
  [4, 2],
  [3, 2],
  [2, 2],
  [1, 2],
  [0, 2],
];

const PATH_CENTER = [
  [3, 2],
  [1, 2],
];

const PATH_HORIZONTAL = [
  [1, 0],
  [1, 1],
  [1, 3],
  [1, 4],
  [3, 0],
  [3, 1],
  [3, 3],
  [3, 4],
];

function createTileEl() {
  const el = document.createElement("div");
  el.className = "tile";
  return el;
}

export function makeBoard(gameBoardEl = document.getElementById("game-board")) {
  const board = [];
  if (gameBoardEl) gameBoardEl.innerHTML = "";

  for (let y = 0; y < BOARD_SIZE; y++) {
    const row = [];
    for (let x = 0; x < BOARD_SIZE; x++) {
      const tileEl = createTileEl();
      if (gameBoardEl) gameBoardEl.appendChild(tileEl);

      row.push({
        map: null,
        building: null,
        el: tileEl,
      });
    }
    board.push(row);
  }

  return board;
}

export function setBoard(board) {
  // Buildings
  for (const b of BUILDINGS) {
    const cell = board?.[b.y]?.[b.x];
    if (!cell) continue;

    cell.map = MAP.BUILDING;
    cell.building = { id: b.id, name: b.name, imgIndex: b.imgIndex };
  }

  // Paths
  for (const [y, x] of PATHS) board[y][x].map = MAP.PATH;
  for (const [y, x] of PATH_CENTER) board[y][x].map = MAP.PATH_CENTER;
  for (const [y, x] of PATH_HORIZONTAL) board[y][x].map = MAP.PATH_H;
}

function nextPos(y, x, orientation) {
  switch (orientation) {
    case "north":
      return { y: y - 1, x };
    case "south":
      return { y: y + 1, x };
    case "west":
      return { y, x: x - 1 };
    case "east":
      return { y, x: x + 1 };
    default:
      return { y, x };
  }
}

export function isWalkable(board, y, x, orientation) {
  const n = nextPos(y, x, orientation);

  if (!board?.length) return false;
  if (n.y < 0 || n.y >= board.length) return false;
  if (n.x < 0 || n.x >= board[0].length) return false;

  return WALKABLE.has(board[n.y][n.x].map);
}
