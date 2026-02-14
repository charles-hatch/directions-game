// goalSystem.js
// goalSystem.js
import { GameState } from "./gameState.js";

export function setRandomGoal(board) {
  const buildings = [];

  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board[y].length; x++) {
      const cell = board[y][x];
      if (cell.map === "building" && cell.building) {
        buildings.push({ y, x, building: cell.building });
      }
    }
  }

  if (buildings.length === 0) return null;
  if (buildings.length === 1) return buildings[0]; // can’t avoid repeats

  // Re-roll until it differs from lastGoalId (bounded loop)
  let pick = null;
  for (let tries = 0; tries < 10; tries++) {
    pick = buildings[Math.floor(Math.random() * buildings.length)];
    if (pick.building.id !== GameState.lastGoalId) break;
  }

  GameState.lastGoalId = pick.building.id;
  return pick;
}

export function checkGoal(player, goal) {
  const dx = goal.x - player.x;
  const dy = goal.y - player.y;

  // must be adjacent (Manhattan distance 1)
  if (Math.abs(dx) + Math.abs(dy) !== 1) return null;

  return getRelativeDirection(player.orientation, dx, dy);
}

function getRelativeDirection(orientation, dx, dy) {
  if (orientation === "north") {
    if (dy === -1) return "front";
    if (dy === 1) return "behind";
    if (dx === -1) return "left";
    if (dx === 1) return "right";
  }

  if (orientation === "south") {
    if (dy === 1) return "front";
    if (dy === -1) return "behind";
    if (dx === 1) return "left";
    if (dx === -1) return "right";
  }

  if (orientation === "east") {
    if (dx === 1) return "front";
    if (dx === -1) return "behind";
    if (dy === -1) return "left";
    if (dy === 1) return "right";
  }

  if (orientation === "west") {
    if (dx === -1) return "front";
    if (dx === 1) return "behind";
    if (dy === 1) return "left";
    if (dy === -1) return "right";
  }

  return null;
}
