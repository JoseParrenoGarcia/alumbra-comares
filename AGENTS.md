# Alumbra Comares Project Guide

## Purpose

This repository is for building and iterating on the first public website for **Alumbra Comares**, a small private midwife working group based in Valencia, Spain.

The first release is intentionally lightweight:

- Static site built with `HTML + CSS + JavaScript`
- Hosted on `GitHub Pages`
- Designed for fast stakeholder review on mobile and desktop
- Treated as a `v0` prototype for content, tone, and aesthetics

The goal of this repository is not to build the final production platform yet. The goal is to create a clear, reviewable first version that helps the founders react to structure, copy, visual direction, and contact flows before investing in a more robust React/Vercel build.

## Product Snapshot

- Official public name: `Alumbra Comares`
- Meaning:
  - `Alumbra` relates to giving light / giving birth in Spanish
  - `Comares` is the Valencian term for midwives
- Primary audience: pregnant families, including first-time and second-time+ parents
- Service area: Valencia city and surrounding metropolitan area
- Primary v0 user goal: learn about the group and contact them
- Brand direction: warm, calm, Mediterranean, human, community-led

## Current Scope

The first website should act as a scaffold with realistic content and placeholders where details are still being confirmed.

Planned content areas:

- Group philosophy / why Alumbra exists
- Presentation of the 3 midwives
- Services overview
- Pricing placeholders
- Contact form
- Contact methods: email, phone, WhatsApp, Instagram
- Events / group sessions section
- Placeholder testimonial area
- Placeholder brochure or downloadable resource area
- Language-aware content structure

## Non-Goals For v0

These items are explicitly out of scope for the first release unless priorities change:

- Full backend or database setup
- Advanced booking logic
- Authentication
- Final SEO optimization
- Final analytics setup
- Legal-entity-specific trust or compliance content beyond basic placeholders
- Final multilingual rollout in all 3 languages
- Perfect copy, pricing, or service descriptions

## Working Assumptions

- `Spanish` is the default language at launch
- `English` is planned soon after
- `Valenciano/Catalan` is required, but can come later
- Content from the JPG reference materials is inspiration and partial source material, not final truth
- Pricing should use placeholders until the founders confirm details
- Events can start as sample or provisional cards rather than a live system
- Forms can route to a temporary personal email before moving to a shared inbox
- The site should feel simple, warm, and low-friction rather than overly clinical

## Content Sources

The directory [`assets/reference-docs`](/Users/joseparreno/Documents/GitHub/alumbra-comares/assets/reference-docs) contains image-based reference material that should be used for:

- Early content extraction
- Understanding service framing and founder bios
- Inferring visual direction
- Informing a future downloadable brochure/resource strategy

These assets are currently in Spanish and should be treated as:

- A starting point for website copy
- A starting point for style capture
- A source to transcribe and structure into reusable content files

## Documentation We Should Maintain

- [`AGENTS.md`](/Users/joseparreno/Documents/GitHub/alumbra-comares/AGENTS.md): how the project is run, scoped, and evolved
- [`docs/PRD.md`](/Users/joseparreno/Documents/GitHub/alumbra-comares/docs/PRD.md): product goals, requirements, structure, assumptions, phases
- Future recommended docs:
  - `docs/content-inventory.md`
  - `docs/style-notes.md`
  - `docs/decision-log.md`
  - `docs/research-plan.md`

## Implementation Direction

For v0, prefer:

- Small, understandable static architecture
- Content stored in JSON where practical
- Reusable sections and content models
- Clean structure that can later inform a React migration

Do not over-engineer the first version. The priority is momentum and reviewability.

## Default UX Direction

- Likely structure: `single-page` site with anchored sections
- Contact style: simple and warm
- CTA style: repeated but soft and human
- Events: cards first, optionally with a light visual calendar treatment later
- Midwife profiles: consistent layout with room for individual voice
- Contact emphasis: form + WhatsApp primary, Instagram secondary

## Required Open Questions To Track

These do not block the first docs or scaffold, but should remain visible:

- Final sitemap: single-page vs small multi-page static site
- Final contact tone and form depth
- Final copy approval process with the founders
- Final pricing and service packaging
- Final translation workflow
- Final legal/privacy wording
- Final brochure/download strategy
- Final brand assets export from Canva

## Research And Discovery Tasks

The PRD should preserve these as explicit future tasks:

- Competitor/reference audit of private midwife group websites
- Extraction and transcription of content from image-based source material
- Written style-system draft based on Canva/reference visuals
- Identification of trust signals commonly used in this category
- Documentation of multilingual content needs

## Suggested Delivery Phases

1. Documentation and content extraction
2. Static v0 website scaffold
3. Stakeholder review and iteration
4. Improved static release
5. Later React/Vercel rebuild with stronger SEO and structured content systems

## Collaboration Rules

- Prefer shipping reviewable increments over polishing in isolation
- Keep placeholders explicit when facts are not confirmed
- Separate confirmed content from inferred content
- Treat references as inspiration unless the founders approve them
- Capture decisions in docs as the project evolves
- Keep the technical implementation simple until the product direction stabilizes

## Definition Of Success For v0

The first release is successful if:

- The founders can open it easily on phone and desktop
- It clearly explains who Alumbra Comares are
- Visitors understand what kind of support they offer
- A visitor can contact them without friction
- The team can react to structure, wording, visual tone, and priorities
- The project has enough documentation to guide the next iteration confidently
