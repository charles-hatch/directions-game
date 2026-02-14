//gameState.js
export const GameState = {
  screen: "menu", // menu | game
  menuView: "main", // main | start | character | about
  mode: "free", // free | level
  level: 1,
  goal: null,
  currentVisibleDirection: null,
  lastGoalId: null,
};
