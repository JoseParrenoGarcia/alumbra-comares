const SUBPAGE_NAV_HTML = `
  <a href="index.html" class="nav-logo">Alumbra Comares</a>
  <ul class="nav-links">
    <li class="nav-item">
      <a href="index.html#quienes-somos">Nosotras</a>
      <ul class="nav-dropdown">
        <li><a href="index.html#quienes-somos">Quiénes Somos</a></li>
        <li><a href="index.html#por-que">Por Qué</a></li>
        <li><a href="index.html#equipo">Equipo</a></li>
      </ul>
    </li>
    <li class="nav-item">
      <a href="servicios.html">Servicios</a>
      <ul class="nav-dropdown">
        <li><a href="servicios.html">Servicios</a></li>
        <li><a href="como-trabajamos.html">Cómo Trabajamos</a></li>
        <li><a href="formacion.html">Formación</a></li>
      </ul>
    </li>
    <li class="nav-item">
      <a href="faq.html">Información</a>
      <ul class="nav-dropdown">
        <li><a href="faq.html">FAQ</a></li>
        <li><a href="recursos.html">Recursos</a></li>
        <li><a href="eventos.html">Eventos</a></li>
      </ul>
    </li>
    <li><a href="index.html#contacto">Contacto</a></li>
  </ul>
  <div class="nav-lang">
    <select class="lang-select" aria-label="Idioma">
      <option value="es" selected>🇪🇸 ES</option>
      <option value="en">🇬🇧 EN</option>
    </select>
  </div>
  <button class="nav-toggle" aria-label="Abrir menú">☰</button>
  <nav class="nav-overlay">
    <button class="nav-overlay-close" aria-label="Cerrar menú">✕</button>
    <ul class="nav-overlay-links">
      <li class="nav-overlay-group">
        <span class="nav-overlay-group-label">Nosotras</span>
        <a href="index.html#quienes-somos">Quiénes Somos</a>
        <a href="index.html#por-que">Por Qué</a>
        <a href="index.html#equipo">Equipo</a>
      </li>
      <li class="nav-overlay-group">
        <span class="nav-overlay-group-label">Servicios</span>
        <a href="servicios.html">Servicios</a>
        <a href="como-trabajamos.html">Cómo Trabajamos</a>
        <a href="formacion.html">Formación</a>
      </li>
      <li class="nav-overlay-group">
        <span class="nav-overlay-group-label">Información</span>
        <a href="faq.html">FAQ</a>
        <a href="recursos.html">Recursos</a>
        <a href="eventos.html">Eventos</a>
      </li>
      <li><a href="index.html#contacto">Contacto</a></li>
    </ul>
  </nav>
`;

function injectNav() {
  const nav = document.getElementById("main-nav");
  if (!nav) {
    return;
  }

  if (nav.dataset.nav === "subpage") {
    nav.innerHTML = SUBPAGE_NAV_HTML;
  }
}

function initNavScroll() {
  const nav = document.querySelector(".nav");
  if (!nav) {
    return;
  }

  window.addEventListener("scroll", () => {
    if (window.scrollY > 80) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  });
}

function initMobileMenu() {
  const navToggle = document.querySelector(".nav-toggle");
  const navOverlay = document.querySelector(".nav-overlay");
  const navOverlayClose = document.querySelector(".nav-overlay-close");

  if (!navToggle || !navOverlay || !navOverlayClose) {
    return;
  }

  navToggle.addEventListener("click", () => {
    navOverlay.classList.toggle("open");
  });

  navOverlayClose.addEventListener("click", () => {
    navOverlay.classList.remove("open");
  });

  navOverlay.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navOverlay.classList.remove("open");
    });
  });
}

function initCtaButtons() {
  document.querySelectorAll("[data-href]").forEach((button) => {
    button.addEventListener("click", () => {
      const href = button.getAttribute("data-href");
      const element = href ? document.querySelector(href) : null;

      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  injectNav();
  initNavScroll();
  initMobileMenu();
  initCtaButtons();
});
