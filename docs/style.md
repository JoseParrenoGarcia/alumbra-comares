# Alumbra Comares — Style Reference

## Aesthetic Direction

**Concept:** Warm Mediterranean editorial — the feeling of a carefully made brochure left on a sunlit table. Organic, unhurried, human.

**One thing to remember:** Terracotta warmth meeting botanical quietness. Nothing harsh. Nothing cold.

---

## 1. Color Tokens

```css
:root {
  /* Backgrounds */
  --color-bg-base:        #F7F2EC;   /* warm off-white / light stone */
  --color-bg-soft:        #F0E9DF;   /* slightly warmer section bg */
  --color-bg-wash:        #EDE3D6;   /* card backgrounds, panel fills */

  /* Brand */
  --color-terracotta:     #A0522D;   /* primary headings, CTAs, active states */
  --color-terracotta-mid: #C27045;   /* hover states, softer terracotta */
  --color-terracotta-pale:#E8C9AF;   /* tints, borders, dividers */

  /* Accents */
  --color-ochre:          #C9A84C;   /* gold/ochre accent, decorative */
  --color-blush:          #E8BAA8;   /* soft peach/blush, quote bands */
  --color-sage:           #8A9A7B;   /* icon accents, secondary text tint */
  --color-botanical:      #C8D5A3;   /* corner washes, background accents */

  /* Text */
  --color-text-primary:   #3D2B1F;   /* near-black, warm brown */
  --color-text-secondary: #7A5C48;   /* body secondary, captions */
  --color-text-muted:     #A8917E;   /* placeholders, meta text */
  --color-text-on-dark:   #F7F2EC;   /* text on terracotta backgrounds */

  /* Utility */
  --color-border:         #DDD0C0;   /* subtle dividers */
  --color-focus:          #C27045;   /* focus ring */
}
```

---

## 2. Typography

### Font Recommendations (Google Fonts)

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Nunito:wght@300;400;600&family=Dancing+Script:wght@500;700&display=swap" rel="stylesheet">
```

| Role | Font | Weight | Notes |
|------|------|--------|-------|
| Display / headings | Cormorant Garamond | 600–700 | Elegant, editorial, warm serif |
| Body | Nunito | 300–400 | Rounded, friendly, readable — low harshness |
| Quotes / signature | Dancing Script | 500–700 | Handwritten intimacy |
| Subheadings | Cormorant Garamond italic | 400–600 | Softens hierarchy |

### Type Scale

```css
:root {
  --text-xs:   0.75rem;   /* 12px — meta, labels */
  --text-sm:   0.875rem;  /* 14px — captions, fine print */
  --text-base: 1rem;      /* 16px — body default */
  --text-md:   1.125rem;  /* 18px — comfortable body */
  --text-lg:   1.375rem;  /* 22px — lead paragraphs */
  --text-xl:   1.75rem;   /* 28px — section subheadings */
  --text-2xl:  2.25rem;   /* 36px — section headings */
  --text-3xl:  3rem;      /* 48px — hero subheading */
  --text-4xl:  4rem;      /* 64px — hero display */
  --text-5xl:  5.5rem;    /* 88px — hero statement (desktop) */

  --leading-tight:  1.15;
  --leading-body:   1.7;
  --leading-loose:  1.9;

  --tracking-tight: -0.03em;
  --tracking-wide:  0.08em;  /* uppercase labels */
}
```

---

## 3. Spacing Scale

```css
:root {
  --space-1:   0.25rem;   /* 4px */
  --space-2:   0.5rem;    /* 8px */
  --space-3:   0.75rem;   /* 12px */
  --space-4:   1rem;      /* 16px */
  --space-6:   1.5rem;    /* 24px */
  --space-8:   2rem;      /* 32px */
  --space-12:  3rem;      /* 48px */
  --space-16:  4rem;      /* 64px */
  --space-24:  6rem;      /* 96px */
  --space-32:  8rem;      /* 128px */

  --section-padding-y:  var(--space-24);
  --section-padding-x:  clamp(1.5rem, 6vw, 7rem);
  --content-max-width:  1200px;
}
```

---

## 4. Component Patterns

### Hero

```
Structure:
- Full viewport height on desktop, min 80vh on mobile
- Left column: brand lockup + headline + short positioning statement + CTA
- Right column: main portrait / organic collage image
- Botanical wash element in top-right corner (decorative)
- Headline: Cormorant Garamond 600, --text-4xl to --text-5xl, --color-terracotta
- Subheading: Cormorant Garamond italic, --text-lg, --color-text-secondary
- CTA button: terracotta fill, warm white text, soft rounded corners (border-radius: 2px)
- Scroll indicator: minimal downward arrow in --color-ochre
```

### Profile Card

```
Structure:
- Alternating layout: image left / text right, then text left / image right
- Portrait image: organic oval mask (border-radius 50% / 60% variation)
- Name: Cormorant Garamond 700, --text-2xl, --color-terracotta
- Role tag: Nunito 300, --text-sm, uppercase, letter-spacing wide, --color-text-muted
- Bio: Nunito 400, --text-md, --color-text-primary, --leading-body
- Quote: Dancing Script 500, --text-xl, --color-terracotta-mid, indented with left border in --color-terracotta-pale
- Card bg: --color-bg-wash on alternating cards for rhythm
```

### Quote Band

```
Structure:
- Full-width band, --color-blush background
- Centered quote in Dancing Script 600, --text-3xl, --color-terracotta
- Opening " in --color-ochre, oversized (4rem)
- Thin decorative line above and below in --color-terracotta-pale
- Max-width 800px centered
```

### Service Card

```
Structure:
- Soft card: --color-bg-wash bg, --color-border border (1px), border-radius 4px
- Icon: sage-coloured simple SVG (24px)
- Title: Cormorant Garamond 600, --text-xl, --color-text-primary
- Description: Nunito 300, --text-base, --color-text-secondary
- Pricing placeholder: Nunito 300 italic, --text-sm, --color-text-muted
- Hover: subtle box-shadow lift (0 4px 16px rgba(160,82,45,0.08))
```

### Contact Section

```
Structure:
- Warm bg: --color-bg-soft
- Left: short warm invitation copy + contact channels (phone, email, WhatsApp, Instagram)
- Right: enquiry form (name, email, phone, service interest, preferred language)
- Contact channel items: icon + label, --color-terracotta for icon
- Form inputs: clean, no heavy borders — bottom border only style (1px --color-border)
- Submit button: terracotta, full-width on mobile
- Tone: conversational label text ("Your name", not "NAME *")
```

### Navigation

```
Structure:
- Sticky, transparent on hero, solid --color-bg-base on scroll
- Logo left (script treatment)
- Nav links right: Nunito 300, --text-sm, uppercase, wide tracking
- Active/hover: --color-terracotta underline
- Mobile: hamburger → full-screen overlay, botanical wash bg
```

### Footer

```
Structure:
- --color-bg-wash background
- Brand name + short tagline centred
- Legal links: Nunito 300, --text-xs, --color-text-muted
- Social links: minimal icon row
- Thin top border in --color-border
```

---

## 5. Layout Principles

- **Max content width:** 1200px, centred
- **Section rhythm:** alternate between `--color-bg-base` and `--color-bg-soft` for visual breathing room
- **Columns:** CSS Grid preferred. Profile sections use 2-column alternating layouts. Service cards use 3-column grid (2 on tablet, 1 on mobile).
- **Margins:** Generous horizontal padding via `--section-padding-x`. Never let content touch viewport edges.
- **Image containers:** Rounded organic masks (oval/blob shapes) rather than hard rectangles. Use `border-radius` and `clip-path` combinations.
- **Decorative accents:** Botanical SVG or PNG corner elements in `--color-botanical`. Position with `position: absolute`, low z-index, `pointer-events: none`. Opacity 0.4–0.6.
- **Dividers:** Avoid heavy lines. Use `--color-border` at 1px, or spacing alone to separate sections.

---

## 6. Animation and Interaction Notes

**Principle:** Calm, unhurried. Nothing bounces or flashes. Transitions feel like breath.

```css
:root {
  --transition-base:   200ms ease;
  --transition-slow:   400ms ease;
  --transition-gentle: 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
```

- **Page load:** Sections fade and rise gently on scroll using `IntersectionObserver`. Stagger profile cards by 100ms each.
- **Hero:** Heading fades in over 800ms on load. Image follows at 200ms delay.
- **Hover (cards):** Subtle upward translate (`translateY(-3px)`) + soft shadow. 200ms ease.
- **Hover (links/CTAs):** Background or underline slide from left. 200ms.
- **Form inputs:** Border-bottom transitions from `--color-border` to `--color-terracotta` on focus. 200ms.
- **Navigation scroll:** Background opacity transition 300ms. No abrupt shift.
- **No:** auto-playing anything, looping background video, parallax on mobile, aggressive scale transforms.

```js
// Scroll reveal pattern
const observer = new IntersectionObserver((entries) => {
  entries.forEach(el => {
    if (el.isIntersecting) el.target.classList.add('visible');
  });
}, { threshold: 0.15 });
```

```css
.reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity var(--transition-gentle), transform var(--transition-gentle);
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
```

---

## 7. Do / Don't

### Do
- Use Cormorant Garamond for all display text — it carries the editorial warmth
- Let white space breathe; resist filling every gap
- Use terracotta as the primary accent, gold/ochre only as a secondary highlight
- Round image masks organically — no hard rectangles for portraits
- Write labels and CTAs in a warm, conversational tone
- Add botanical SVG accents sparingly — one or two per page, not everywhere
- Keep the contact section feel low-friction and human
- Use italic Cormorant for softer subheadings and captions

### Don't
- Use blue, purple, or cool grey anywhere — it breaks the Mediterranean warmth
- Use Inter, Roboto, or system sans-serif fonts
- Use hard drop shadows — prefer `box-shadow` with a terracotta-tinted colour at low opacity
- Use uppercase for body text or headings (uppercase is reserved for small labels and nav only)
- Use full-bleed dark backgrounds — the palette is warm and light
- Use animations faster than 200ms or with heavy spring/bounce curves
- Use stock photo visual language — all imagery should feel documentary and intimate
- Add more than two decorative botanical elements per viewport height

---

## 8. Responsive Breakpoints

```css
/* Mobile first */
/* sm */  @media (min-width: 640px)  { ... }
/* md */  @media (min-width: 768px)  { ... }
/* lg */  @media (min-width: 1024px) { ... }
/* xl */  @media (min-width: 1280px) { ... }
```

- Hero: stacks vertically on mobile (image above fold, text below), splits at `lg`
- Profile cards: single column on mobile, split layout at `md`
- Service cards: 1 col mobile → 2 col tablet → 3 col desktop
- Navigation: hamburger below `md`, horizontal above

---

## 9. Accessibility Notes

- All colour combinations must meet WCAG AA contrast (--color-terracotta on --color-bg-base passes)
- Focus states: visible `outline: 2px solid var(--color-focus)` with `outline-offset: 3px`
- Images: meaningful `alt` text for portraits; decorative elements use `aria-hidden="true"`
- Form: explicit `<label>` elements, not placeholder-only
- Scroll animations: respect `prefers-reduced-motion`

```css
@media (prefers-reduced-motion: reduce) {
  .reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
```
