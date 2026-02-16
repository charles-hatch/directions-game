// legend.js
// Legend panel toggle (accessibility attrs)

export function initLegend({
  toggleId = "legend-toggle",
  panelId = "legend-panel",
} = {}) {
  const legendToggle = document.getElementById(toggleId);
  const legendPanel = document.getElementById(panelId);

  function setLegendOpen(open) {
    if (!legendToggle || !legendPanel) return;

    legendToggle.setAttribute("aria-expanded", String(open));
    legendPanel.classList.toggle("hidden", !open);
    legendPanel.setAttribute("aria-hidden", String(!open));
  }

  legendToggle?.addEventListener("click", () => {
    const isOpen = legendToggle.getAttribute("aria-expanded") === "true";
    setLegendOpen(!isOpen);
  });

  setLegendOpen(false);
  return { setLegendOpen };
}
