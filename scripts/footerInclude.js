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
  // GitHub Pages project site: https://username.github.io/<repo>/
  if (window.location.hostname.endsWith("github.io")) {
    const parts = window.location.pathname.split("/").filter(Boolean);
    return parts.length ? `/${parts[0]}` : "";
  }
  // Localhost/custom server: site root is /
  return "";
}
