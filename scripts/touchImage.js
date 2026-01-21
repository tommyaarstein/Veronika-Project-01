(() => {
  const openImage = document.getElementById("openImage");
  const overlay = document.getElementById("overlay");
  const zoomWrap = document.getElementById("zoomWrap");
  const zoomImg = document.getElementById("zoomImg");

  if (!openImage || !overlay || !zoomWrap || !zoomImg) return;

  let scale = 1;
  const MIN = 1;
  const MAX = 4;

  let startDist = 0;
  let startScale = 1;

  function distance(t1, t2) {
    const dx = t1.clientX - t2.clientX;
    const dy = t1.clientY - t2.clientY;
    return Math.hypot(dx, dy);
  }

  function setScale(next) {
    scale = Math.min(MAX, Math.max(MIN, next));
    zoomImg.style.transform = `scale(${scale})`;
  }

  function resetZoom() {
    setScale(1);
    zoomWrap.scrollTop = 0;
    zoomWrap.scrollLeft = 0;
  }

  openImage.addEventListener("click", () => {
    overlay.hidden = false;
    document.body.style.overflow = "hidden";
    resetZoom();
  });

  /* Close on ANY tap */
  overlay.addEventListener("click", () => {
    overlay.hidden = true;
    document.body.style.overflow = "";
    resetZoom();
  });

  /* Pinch to zoom */
  zoomWrap.addEventListener(
    "touchstart",
    (e) => {
      if (e.touches.length === 2) {
        startDist = distance(e.touches[0], e.touches[1]);
        startScale = scale;
      }
    },
    { passive: false },
  );

  zoomWrap.addEventListener(
    "touchmove",
    (e) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        const dist = distance(e.touches[0], e.touches[1]);
        setScale(startScale * (dist / startDist));
      }
    },
    { passive: false },
  );

  /* Double-tap zoom toggle */
  let lastTap = 0;
  zoomWrap.addEventListener("touchend", () => {
    const now = Date.now();
    if (now - lastTap < 300) {
      setScale(scale === 1 ? 2 : 1);
    }
    lastTap = now;
  });

  /* ESC (desktop) */
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !overlay.hidden) {
      overlay.hidden = true;
      document.body.style.overflow = "";
      resetZoom();
    }
  });
})();
