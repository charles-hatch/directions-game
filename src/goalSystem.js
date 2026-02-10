export function setRandomGoal(board) {
  const buildings = [];

  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board[y].length; x++) {
      if (board[y][x].map === "building") {
        buildings.push({ y, x });
      }
    }
  }

  return buildings[Math.floor(Math.random() * buildings.length)];
}

export function checkGoal(player, goal) {
  const dx = goal.x - player.x;
  const dy = goal.y - player.y;

  // must be adjacent (Manhattan distance 1)
  if (Math.abs(dx) + Math.abs(dy) !== 1) return null;

  return getRelativeDirection(player.orientation, dx, dy);
}

function getRelativeDirection(orientation, dx, dy) {
  if (orientation === "north") return dx === -1 ? "left" : "right";
  if (orientation === "south") return dx === 1 ? "left" : "right";
  if (orientation === "east") return dy === -1 ? "left" : "right";
  if (orientation === "west") return dy === 1 ? "left" : "right";
}
