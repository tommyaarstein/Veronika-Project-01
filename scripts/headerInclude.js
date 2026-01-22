(() => {
  const mount = document.getElementById("site-header");
  if (!mount) return;

  const base = getBasePath();

  fetch(`${base}/partials/header.html`)
    .then((r) => (r.ok ? r.text() : Promise.reject()))
    .then((html) => {
      mount.innerHTML = html;

      // Apply base path to all header links
      document.querySelectorAll("#site-header [data-route]").forEach((a) => {
        const route = a.getAttribute("data-route") || "/";
        a.href = `${base}${route}`;
      });

      // Hamburger menu
      const toggle = document.getElementById("menuToggle");
      const nav = document.getElementById("siteNav");

      if (toggle && nav) {
        toggle.addEventListener("click", () => {
          const open = nav.classList.toggle("is-open");
          toggle.setAttribute("aria-expanded", String(open));
        });

        nav.addEventListener("click", (e) => {
          if (e.target.tagName === "A") {
            nav.classList.remove("is-open");
            toggle.setAttribute("aria-expanded", "false");
          }
        });

        document.addEventListener("click", (e) => {
          if (!nav.classList.contains("is-open")) return;
          const target = e.target;
          if (target instanceof Node && !nav.contains(target) && !toggle.contains(target)) {
            nav.classList.remove("is-open");
            toggle.setAttribute("aria-expanded", "false");
          }
        });
      }

      // Breadcrumbs
      const bc = document.getElementById("breadcrumbs");
      if (!bc) return;

      const trail = getBreadcrumbTrail(base);
      bc.innerHTML = trail
        .map((item, i) => {
          const isLast = i === trail.length - 1;
          if (isLast) return `<span class="crumb current">${item.label}</span>`;
          return `<a class="crumb" href="${item.href}">${item.label}</a>`;
        })
        .join(`<span class="sep">›</span>`);
    })
    .catch(() => {});
})();

function getBasePath() {
  const script =
    document.currentScript ||
    document.querySelector('script[src*="headerInclude.js"]');

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

function getBreadcrumbTrail(base) {
  const path = window.location.pathname;

  const trail = [{ label: "Hjem", href: `${base}/` }];

  if (path.endsWith("/pages/categories/animals.html")) {
    trail.push({ label: "Dyr", href: `${base}/pages/categories/animals.html` });
    return trail;
  }

  if (path.endsWith("/pages/animals/polar-bear.html")) {
    trail.push({ label: "Dyr", href: `${base}/pages/categories/animals.html` });
    trail.push({
      label: "Isbjørn",
      href: `${base}/pages/animals/polar-bear.html`,
    });
    return trail;
  }

  if (path.endsWith("/pages/about.html")) {
    trail.push({ label: "Om oss", href: `${base}/pages/about.html` });
    return trail;
  }

  return trail;
}
