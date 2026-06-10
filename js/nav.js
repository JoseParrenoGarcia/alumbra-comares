// Scroll effect on nav
const nav = document.querySelector('.nav');
let lastScrollPos = 0;

window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// Mobile menu toggle
const navToggle = document.querySelector('.nav-toggle');
const navOverlay = document.querySelector('.nav-overlay');
const navOverlayClose = document.querySelector('.nav-overlay-close');
const navOverlayLinks = document.querySelectorAll('.nav-overlay-links a');

navToggle.addEventListener('click', () => {
  navOverlay.classList.toggle('open');
});

navOverlayClose.addEventListener('click', () => {
  navOverlay.classList.remove('open');
});

// Close menu when a link is clicked
navOverlayLinks.forEach(link => {
  link.addEventListener('click', () => {
    navOverlay.classList.remove('open');
  });
});

// Handle CTA buttons
const buttons = document.querySelectorAll('[data-href]');
buttons.forEach(button => {
  button.addEventListener('click', (e) => {
    const href = button.getAttribute('data-href');
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
