// dom.js
// Central DOM lookup (single source of truth)

export function getDom() {
  return {
    gameBoard: document.getElementById("game-board"),
    menuBtn: document.getElementById("menu-btn"),
    nextBtn: document.getElementById("next-btn"),

    turnRightBtn: document.getElementById("turn-right-btn"),
    turnLeftBtn: document.getElementById("turn-left-btn"),
    goStraightBtn: document.getElementById("go-straight-btn"),

    answerLeftBtn: document.getElementById("answer-left"),
    answerFrontBtn: document.getElementById("answer-front"),
    answerRightBtn: document.getElementById("answer-right"),

    goalLabel: document.getElementById("goal-label"),
    goalImg: document.getElementById("goal-img"),
  };
}
