// Page transitions — View Transitions API (primary) + JS fade (fallback)

// Fade in on page load (fallback path — View Transitions handles its own entrance)
if (!document.startViewTransition) {
  document.documentElement.classList.add('page-fade-in');
  window.addEventListener('load', () => {
    requestAnimationFrame(() => {
      document.documentElement.classList.add('page-visible');
    });
  });
}

// Intercept nav link clicks for outgoing transition
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href]');
  if (!link) return;

  const href = link.getAttribute('href');

  // Only handle same-origin page navigations — skip anchors, external, mailto, tel
  if (
    !href ||
    href.startsWith('#') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:') ||
    href.startsWith('http') ||
    link.target === '_blank'
  ) return;

  // Skip anchor-only links (e.g. /#contacto — smooth scroll handles these)
  const url = new URL(href, location.href);
  if (url.pathname === location.pathname && url.hash) return;

  e.preventDefault();

  if (document.startViewTransition) {
    document.startViewTransition(() => {
      location.href = href;
    });
  } else {
    // JS fade fallback
    document.documentElement.classList.remove('page-visible');
    setTimeout(() => { location.href = href; }, 200);
  }
});
