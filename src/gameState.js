//gameState.js
export const GameState = {
  screen: "menu", // menu | game
  menuView: "main", // main | start | character | about
  mode: "free", // free | level
  goal: null,
  currentVisibleDirection: null,
  lastGoalId: null,
  goalComplete: false,
};
