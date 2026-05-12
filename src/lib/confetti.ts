import confetti from "canvas-confetti";

export function celebrate() {
  const end = Date.now() + 1200;
  const colors = ["#FF8C00", "#003366", "#FFD27A", "#4A90E2"];
  (function frame() {
    confetti({ particleCount: 4, angle: 60, spread: 70, origin: { x: 0 }, colors });
    confetti({ particleCount: 4, angle: 120, spread: 70, origin: { x: 1 }, colors });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
  confetti({ particleCount: 120, spread: 90, origin: { y: 0.6 }, colors });
}
