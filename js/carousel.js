/**
 * Carousel initialization and control
 * Handles scroll-snap carousels with dot indicators and keyboard navigation
 */

function initCarousel(trackId, dotsId) {
  const track = document.getElementById(trackId);
  const dotsContainer = document.getElementById(dotsId);

  if (!track || !dotsContainer) {
    console.warn(`Carousel elements not found: trackId=${trackId}, dotsId=${dotsId}`);
    return;
  }

  // Get all cards in the carousel
  const cards = track.querySelectorAll('[class*="card"]');
  if (cards.length === 0) {
    console.warn(`No cards found in carousel: ${trackId}`);
    return;
  }

  // Create dots
  dotsContainer.innerHTML = '';
  cards.forEach((card, index) => {
    const dot = document.createElement('button');
    dot.className = 'carousel-dot';
    dot.setAttribute('aria-label', `Ir al elemento ${index + 1}`);
    dot.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
    dot.setAttribute('role', 'tab');

    if (index === 0) {
      dot.classList.add('active');
    }

    dot.addEventListener('click', () => {
      const cardWidth = cards[index].offsetWidth + 16; // 16px is the gap
      const scrollLeft = cards[index].offsetLeft - (track.offsetWidth - cardWidth) / 2;
      track.scrollTo({
        left: scrollLeft,
        behavior: 'smooth',
      });
    });

    dotsContainer.appendChild(dot);
  });

  // Update dots on scroll
  let scrollTimeout;
  track.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      updateActiveDot();
    }, 50);
  });

  function updateActiveDot() {
    const scrollLeft = track.scrollLeft;
    const trackWidth = track.offsetWidth;
    const centerPoint = scrollLeft + trackWidth / 2;

    let closestIndex = 0;
    let closestDistance = Infinity;

    cards.forEach((card, index) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(cardCenter - centerPoint);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    // Update dot styling and aria attributes
    const dots = dotsContainer.querySelectorAll('.carousel-dot');
    dots.forEach((dot, index) => {
      if (index === closestIndex) {
        dot.classList.add('active');
        dot.setAttribute('aria-selected', 'true');
      } else {
        dot.classList.remove('active');
        dot.setAttribute('aria-selected', 'false');
      }
    });
  }

  // Keyboard navigation
  track.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();

      const scrollLeft = track.scrollLeft;
      const cardWidth = cards[0].offsetWidth + 16; // card width + gap

      if (event.key === 'ArrowLeft') {
        track.scrollBy({
          left: -cardWidth,
          behavior: 'smooth',
        });
      } else if (event.key === 'ArrowRight') {
        track.scrollBy({
          left: cardWidth,
          behavior: 'smooth',
        });
      }
    }
  });

  // Make track focusable for keyboard navigation
  track.setAttribute('tabindex', '0');

  // Initial dot update
  updateActiveDot();
}

// Export for use in content-loader.js
window.initCarousel = initCarousel;
