(() => {
  const mount = document.getElementById("site-footer");
  if (!mount) return;

  // Works for GitHub Pages project sites: /<repo-name>/...
  const parts = window.location.pathname.split("/").filter(Boolean);
  const base = parts.length ? `/${parts[0]}` : "";

  fetch(`${base}/partials/footer.html`)
    .then((r) => (r.ok ? r.text() : Promise.reject()))
    .then((html) => {
      mount.innerHTML = html;
    })
    .catch(() => {});
})();
