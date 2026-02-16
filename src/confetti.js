//confetti.js
const confettiCanvas = document.getElementById("confetti");
const confettiCtx = confettiCanvas?.getContext("2d");
let confettiRAF = null;
let confettiParticles = [];

function resizeConfetti() {
  if (!confettiCanvas) return;
  const dpr = window.devicePixelRatio || 1;
  confettiCanvas.width = Math.floor(window.innerWidth * dpr);
  confettiCanvas.height = Math.floor(window.innerHeight * dpr);
  confettiCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
window.addEventListener("resize", resizeConfetti);
resizeConfetti();

export function confettiBurst() {
  if (!confettiCanvas || !confettiCtx) return;
  resizeConfetti();

  const colors = ["#ffd166", "#06d6a0", "#118ab2", "#ef476f", "#ffffff"];
  const originX = window.innerWidth / 2;
  const originY = window.innerHeight * 0.25;

  confettiParticles = Array.from({ length: 120 }, () => {
    const angle = Math.random() * Math.PI - Math.PI / 2; // spray outward
    const speed = 3 + Math.random() * 5;
    return {
      x: originX + (Math.random() * 60 - 30),
      y: originY + (Math.random() * 30 - 15),
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      w: 5 + Math.random() * 6,
      h: 7 + Math.random() * 10,
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.25,
      color: colors[(Math.random() * colors.length) | 0],
    };
  });

  const gravity = 0.12;
  const drag = 0.995;
  const start = performance.now();
  const duration = 1400;

  if (confettiRAF) cancelAnimationFrame(confettiRAF);

  function tick(now) {
    const elapsed = now - start;

    confettiCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for (const p of confettiParticles) {
      p.vx *= drag;
      p.vy = p.vy * drag + gravity;

      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;

      confettiCtx.save();
      confettiCtx.translate(p.x, p.y);
      confettiCtx.rotate(p.rot);
      confettiCtx.fillStyle = p.color;
      confettiCtx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      confettiCtx.restore();
    }

    const allOff = confettiParticles.every(
      (p) => p.y > window.innerHeight + 40,
    );
    if (elapsed > duration || allOff) {
      confettiCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      confettiRAF = null;
      return;
    }

    confettiRAF = requestAnimationFrame(tick);
  }

  confettiRAF = requestAnimationFrame(tick);
}
