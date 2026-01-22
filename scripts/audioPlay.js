(() => {
  const audio = document.getElementById("sound");
  const button = document.getElementById("audio-play-button");

  if (!audio || !button) return;

  audio.volume = 0.5;

  button.addEventListener("click", async () => {
    if (audio.paused) {
      try {
        await audio.play();
        button.textContent = "Pause";
      } catch (_) {}
    } else {
      audio.pause();
      button.textContent = "Spill av";
    }
  });

  audio.addEventListener("ended", () => {
    button.textContent = "Spill av";
  });
})();
