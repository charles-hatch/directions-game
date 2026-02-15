// controller.js
export function initController(el, actions) {
  el.turnRightBtn?.addEventListener("click", actions.turnRight);
  el.turnLeftBtn?.addEventListener("click", actions.turnLeft);
  el.goStraightBtn?.addEventListener("click", actions.goStraight);

  el.answerLeftBtn?.addEventListener("click", () => actions.answer("left"));
  el.answerRightBtn?.addEventListener("click", () => actions.answer("right"));
  el.answerFrontBtn?.addEventListener("click", () => actions.answer("front"));

  el.nextBtn?.addEventListener("click", actions.next);
  el.menuBtn?.addEventListener("click", actions.menu);
}
