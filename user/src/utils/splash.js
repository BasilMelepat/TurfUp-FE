const MIN_VISIBLE_MS = 1100;

export const hideSplash = () => {
  const splash = document.getElementById("splash");
  if (!splash) return;
  const wait = Math.max(0, MIN_VISIBLE_MS - performance.now());
  setTimeout(() => {
    splash.classList.add("out");
    setTimeout(() => splash.remove(), 500);
  }, wait);
};
