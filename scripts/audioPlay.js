(() => {
  const audio = document.getElementById("sound");
  const toggle = document.getElementById("toggle");

  if (!audio || !toggle) return;

  audio.volume = 0.5;

  toggle.addEventListener("click", async () => {
    if (audio.paused) {
      try {
        await audio.play();
        toggle.textContent = "Pause";
      } catch (_) {}
    } else {
      audio.pause();
      toggle.textContent = "Play";
    }
  });

  audio.addEventListener("ended", () => {
    toggle.textContent = "Play";
  });
})();
