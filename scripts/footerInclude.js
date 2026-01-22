(() => {
  const mount = document.getElementById("site-footer");
  if (!mount) return;

  const base = getBasePath();

  fetch(`${base}/partials/footer.html`)
    .then((r) => (r.ok ? r.text() : Promise.reject()))
    .then((html) => {
      mount.innerHTML = html;
    })
    .catch(() => {});
})();

function getBasePath() {
  const script =
    document.currentScript ||
    document.querySelector('script[src*="footerInclude.js"]');

  if (script && script.src) {
    try {
      const url = new URL(script.src, window.location.href);
      const parts = url.pathname.split("/").filter(Boolean);
      if (parts.length >= 2) {
        const baseParts = parts.slice(0, -2);
        return baseParts.length ? `/${baseParts.join("/")}` : "";
      }
    } catch (_) {}
  }

  // GitHub Pages project site: https://username.github.io/<repo>/
  if (window.location.hostname.endsWith("github.io")) {
    const parts = window.location.pathname.split("/").filter(Boolean);
    return parts.length ? `/${parts[0]}` : "";
  }
  // Localhost/custom server: site root is /
  return "";
}
