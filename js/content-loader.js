// -- Utilities -----------------------------------------------------

async function loadSection(id, path) {
  try {
    const res = await fetch(path);
    if (!res.ok) {
      throw new Error(`Failed to load ${path}: ${res.status}`);
    }

    const html = await res.text();
    const target = document.getElementById(id);
    if (target) {
      target.innerHTML = html;
    }
  } catch (error) {
    console.error(error);
  }
}

async function loadJSON(path) {
  try {
    const res = await fetch(path);
    if (!res.ok) {
      throw new Error(`Failed to load ${path}: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

function channelIcon(type) {
  const icons = { email: "✉️", phone: "📞", instagram: "📸", whatsapp: "💬" };
  return icons[type] || "→";
}

function getFriendlyPlaceholder() {
  return "Información disponible próximamente — contacta para más detalles";
}

function getFriendlyAnswer(item) {
  if (item.placeholder || item.answer.es.includes("__PLACEHOLDER__")) {
    return "Contacta directamente para información actualizada";
  }

  return item.answer.es;
}

function renderFriendlyAnswer(item) {
  const answerEl = document.createElement("p");
  answerEl.className = item.placeholder ? "faq-answer placeholder" : "faq-answer";
  answerEl.innerHTML = getFriendlyAnswer(item);
  return answerEl;
}

function revealSection(id) {
  document.querySelectorAll(`#${id} .reveal`).forEach((el) => el.classList.add("visible"));
}

// -- Page detection ------------------------------------------------

function isHomepage() {
  const pathname = window.location.pathname;
  return pathname === "/" || pathname.endsWith("/") || pathname.endsWith("index.html");
}

function isFaqPage() {
  return window.location.pathname === "/faq.html" || window.location.pathname.endsWith("/faq.html");
}

function isComoTrabajamosPage() {
  return window.location.pathname === "/como-trabajamos.html" || window.location.pathname.endsWith("/como-trabajamos.html");
}

function isRecursosPage() {
  return window.location.pathname === "/recursos.html" || window.location.pathname.endsWith("/recursos.html");
}

function isFormacionPage() {
  return window.location.pathname === "/formacion.html" || window.location.pathname.endsWith("/formacion.html");
}

function isEventosPage() {
  return window.location.pathname === "/eventos.html" || window.location.pathname.endsWith("/eventos.html");
}

function isServiciosPage() {
  return window.location.pathname === "/servicios.html" || window.location.pathname.endsWith("/servicios.html");
}

// -- Homepage section populators -----------------------------------

async function populateTeam() {
  const data = await loadJSON("content/team.json");
  if (!data) {
    return;
  }

  document.getElementById("team-heading").textContent = data.heading.es;

  ["isabel", "alicia", "leticia"].forEach((prefix, index) => {
    const member = data.members[index];
    document.getElementById(`${prefix}-initial`).textContent = member.name.charAt(0);
    document.getElementById(`${prefix}-name`).textContent = member.name;
    document.getElementById(`${prefix}-role`).textContent = member.role.es;
    document.getElementById(`${prefix}-bio`).textContent = member.bio.es;
    document.getElementById(`${prefix}-quote`).textContent = member.quote.es;
  });

  document.getElementById("quote-band-text").textContent = data.members[1].quote.es;
}

async function populateServices() {
  const data = await loadJSON("content/services.json");
  if (!data) {
    return;
  }

  document.getElementById("services-heading").textContent = data.heading.es;

  data.items.forEach((item, index) => {
    document.getElementById(`service-${index}-title`).textContent = item.title.es;
    document.getElementById(`service-${index}-desc`).textContent = item.description.es;

    const priceEl = document.getElementById(`service-${index}-price`);
    if (item.price.placeholder) {
      priceEl.textContent = "Precio a consultar";
      priceEl.classList.add("price--placeholder");
    } else {
      priceEl.textContent = `${item.price.amount} ${item.price.currency}`;
    }
  });

  const grid = document.querySelector("#servicios .services-grid");
  if (!grid) {
    return;
  }

  const linkContainer = document.createElement("div");
  linkContainer.className = "services-all-link";
  linkContainer.innerHTML = '<a href="servicios.html" class="btn btn-secondary">Ver todos los servicios →</a>';
  grid.parentNode.insertBefore(linkContainer, grid.nextSibling);
}

async function populateTestimonials() {
  const data = await loadJSON("content/testimonials.json");
  if (!data) {
    return;
  }

  document.getElementById("testimonials-heading").textContent = data.heading.es;

  const grid = document.getElementById("testimonials-grid");
  data.items.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "testimonial-card reveal";
    card.style.transitionDelay = `${index * 80}ms`;

    const isPlaceholder = item.placeholder === true;
    const quoteClass = isPlaceholder ? "testimonial-quote placeholder" : "testimonial-quote";
    const nameClass = isPlaceholder ? "testimonial-name placeholder" : "testimonial-name";
    const roleClass = isPlaceholder ? "testimonial-role placeholder" : "testimonial-role";

    card.innerHTML = `
      <p class="${quoteClass}">${item.quote.es}</p>
      <p class="${nameClass}">${item.name}</p>
      <p class="${roleClass}">${item.role.es}</p>
    `;

    grid.appendChild(card);
  });
}

function populatePageLinks() {
  const section = document.getElementById("page-links");
  if (!section) {
    return;
  }

  section.innerHTML = `
    <div class="page-links-group">
      <a href="como-trabajamos.html" class="page-link-card reveal">
        <div class="page-link-card__icon" aria-hidden="true">🤝</div>
        <h3 class="page-link-card__title">¿Quieres saber cómo trabajamos?</h3>
        <p class="page-link-card__desc">Conoce nuestro modelo de atención compartida y cómo acompañamos cada etapa.</p>
        <span class="page-link-card__cta">Ver cómo trabajamos →</span>
      </a>
      <a href="formacion.html" class="page-link-card reveal">
        <div class="page-link-card__icon" aria-hidden="true">🎓</div>
        <h3 class="page-link-card__title">Formación y credenciales</h3>
        <p class="page-link-card__desc">Conoce la formación, especialización y experiencia de nuestras tres matronas.</p>
        <span class="page-link-card__cta">Ver formación →</span>
      </a>
    </div>
  `;
}

function populatePageLinksSecondary() {
  const section = document.getElementById("page-links-secondary");
  if (!section) {
    return;
  }

  section.innerHTML = `
    <div class="page-links-group">
      <a href="faq.html" class="page-link-card reveal">
        <div class="page-link-card__icon" aria-hidden="true">💬</div>
        <h3 class="page-link-card__title">¿Tienes más preguntas?</h3>
        <p class="page-link-card__desc">Resolvemos tus dudas sobre servicios, precios, seguridad y logística.</p>
        <span class="page-link-card__cta">Ver preguntas frecuentes →</span>
      </a>
      <a href="eventos.html" class="page-link-card reveal">
        <div class="page-link-card__icon" aria-hidden="true">📅</div>
        <h3 class="page-link-card__title">Eventos y talleres</h3>
        <p class="page-link-card__desc">Próximos talleres y actividades para acompañarte durante el embarazo y la maternidad.</p>
        <span class="page-link-card__cta">Ver eventos →</span>
      </a>
      <a href="recursos.html" class="page-link-card reveal">
        <div class="page-link-card__icon" aria-hidden="true">📚</div>
        <h3 class="page-link-card__title">Recursos recomendados</h3>
        <p class="page-link-card__desc">Libros, asociaciones, podcasts y recursos online seleccionados para acompañarte.</p>
        <span class="page-link-card__cta">Ver biblioteca →</span>
      </a>
    </div>
  `;
}

async function populateContact() {
  const [contactData, servicesData] = await Promise.all([
    loadJSON("content/contact.json"),
    loadJSON("content/services.json"),
  ]);

  if (!contactData) {
    return;
  }

  document.getElementById("contact-heading").textContent = contactData.heading.es;
  document.getElementById("contact-subheading").textContent = contactData.subheading.es;
  document.getElementById("label-name").textContent = contactData.form.name_label.es;
  document.getElementById("label-email").textContent = contactData.form.email_label.es;
  document.getElementById("label-message").textContent = contactData.form.message_label.es;
  document.getElementById("contact-submit").textContent = contactData.form.submit_label.es;

  const list = document.getElementById("contact-channel-list");
  contactData.channels.forEach((channel) => {
    const li = document.createElement("li");
    li.className = "contact-channel";

    let href = "#";
    if (channel.type === "email") {
      href = `mailto:${channel.value}`;
    }
    if (channel.type === "phone") {
      href = `tel:${channel.value.replace(/\s/g, "")}`;
    }
    if (channel.type === "instagram") {
      href = "https://instagram.com/alumbracomares";
    }

    li.innerHTML = `<a href="${href}" class="contact-channel__link" target="${channel.type === "email" || channel.type === "phone" ? "_self" : "_blank"}" rel="noopener">
      <span class="contact-channel__icon" aria-hidden="true">${channelIcon(channel.type)}</span>
      <span class="contact-channel__label">${channel.label.es}</span>
      <span class="contact-channel__value">${channel.value}</span>
    </a>`;

    list.appendChild(li);
  });

  const select = document.getElementById("contact-service");
  (servicesData?.items || []).forEach((item) => {
    const opt = document.createElement("option");
    opt.value = item.title.es;
    opt.textContent = item.title.es;
    select.appendChild(opt);
  });
}

// -- Standalone page populators ------------------------------------

async function populateHowWeWorkPage() {
  const data = await loadJSON("content/how-we-work.json");
  if (!data) {
    return;
  }

  document.getElementById("hww-page-heading").textContent = data.section.es;
  document.getElementById("hww-page-intro").textContent = data.intro.es;

  const grid = document.getElementById("hww-page-grid");
  data.blocks.forEach((block, index) => {
    const el = document.createElement("div");
    el.className = "hww-block reveal";
    el.style.transitionDelay = `${index * 80}ms`;

    const bodyClass = block.placeholder ? "hww-block__body placeholder" : "hww-block__body";
    const bodyText = block.placeholder && block.body.es.includes("__PLACEHOLDER__")
      ? getFriendlyPlaceholder()
      : block.body.es;

    el.innerHTML = `
      <h3 class="hww-block__title">${block.title.es}</h3>
      <p class="${bodyClass}">${bodyText}</p>
    `;

    grid.appendChild(el);
  });
}

async function populateFaqPage() {
  const data = await loadJSON("content/faq.json");
  if (!data) {
    return;
  }

  document.getElementById("faq-page-heading").textContent = data.section.es;
  document.getElementById("faq-page-intro").textContent = data.intro.es;

  const list = document.getElementById("faq-page-list");
  data.items.forEach((item) => {
    const details = document.createElement("details");
    details.className = "faq-item";

    const summary = document.createElement("summary");
    summary.className = "faq-question";
    summary.innerHTML = `<span>${item.question.es}</span><span class="faq-icon" aria-hidden="true">+</span>`;

    details.appendChild(summary);
    details.appendChild(renderFriendlyAnswer(item));
    list.appendChild(details);
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": data.items.map((item) => ({
      "@type": "Question",
      "name": item.question.es,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": getFriendlyAnswer(item),
      },
    })),
  };

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(jsonLd, null, 2);
  document.head.appendChild(script);
}

async function populateRecursosPage() {
  const data = await loadJSON("content/resources.json");
  if (!data) {
    return;
  }

  document.getElementById("recursos-page-heading").textContent = data.section.es;
  document.getElementById("recursos-page-intro").textContent = data.intro.es;

  const grid = document.getElementById("recursos-page-grid");
  data.items.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "recurso-card reveal";
    card.style.transitionDelay = `${index * 80}ms`;

    const isPlaceholderLink = item.placeholder || item.link === "__PLACEHOLDER__";
    const linkClass = isPlaceholderLink ? "recurso-card__link placeholder" : "recurso-card__link";
    const linkHref = isPlaceholderLink ? "#" : item.link;
    const linkTarget = isPlaceholderLink ? "" : ' target="_blank" rel="noopener"';
    const linkText = isPlaceholderLink ? "Enlace próximamente" : "Ver recurso";

    card.innerHTML = `
      <div class="recurso-card__category">${item.category.es}</div>
      <div class="recurso-card__title">${item.title.es}</div>
      <p class="recurso-card__description">${item.description.es}</p>
      <div class="recurso-card__meta">
        <span class="recurso-card__author">${item.author}</span>
      </div>
      <a href="${linkHref}" class="${linkClass}"${linkTarget}>${linkText}</a>
    `;

    grid.appendChild(card);
  });
}

async function populateFormacionPage() {
  const data = await loadJSON("content/education.json");
  if (!data) {
    return;
  }

  const teamData = await loadJSON("content/team.json");
  if (!teamData) {
    return;
  }

  document.getElementById("formacion-page-heading").textContent = data.section.es;
  document.getElementById("formacion-page-intro").textContent = data.intro.es;

  const container = document.getElementById("formacion-page-members");
  teamData.members.forEach((member, index) => {
    const card = document.createElement("div");
    card.className = "formacion-member reveal";
    card.style.transitionDelay = `${index * 80}ms`;

    let languagesHtml = "";
    if (member.languages) {
      const langItems = member.languages
        .map((lang) => {
          if (lang.startsWith("__PLACEHOLDER__")) {
            return null;
          }

          return `<div class="formacion-member__languages">${lang}</div>`;
        })
        .filter(Boolean)
        .join("");

      if (langItems) {
        languagesHtml = `<div class="formacion-member__section"><div class="formacion-member__section-title">Idiomas</div>${langItems}</div>`;
      }
    }

    let credentialsHtml = "";
    if (member.credentials && member.credentials.length > 0) {
      const credItems = member.credentials
        .map((cred) => {
          if (cred.placeholder || cred.title.es.startsWith("__PLACEHOLDER__")) {
            return null;
          }

          return `<div class="formacion-member__item">${cred.title.es}</div>`;
        })
        .filter(Boolean)
        .join("");

      if (credItems) {
        credentialsHtml = `<div class="formacion-member__section"><div class="formacion-member__section-title">Credenciales</div>${credItems}</div>`;
      }
    }

    let trainingHtml = "";
    if (member.training && member.training.length > 0) {
      const trainItems = member.training
        .map((train) => {
          if (train.placeholder || train.title.es.startsWith("__PLACEHOLDER__")) {
            return null;
          }

          return `<div class="formacion-member__item">${train.title.es}</div>`;
        })
        .filter(Boolean)
        .join("");

      if (trainItems) {
        trainingHtml = `<div class="formacion-member__section"><div class="formacion-member__section-title">Formación</div>${trainItems}</div>`;
      }
    }

    card.innerHTML = `
      <div class="formacion-member__name">${member.name}</div>
      <div class="formacion-member__credentials">${member.role.es}</div>
      ${languagesHtml}
      ${credentialsHtml}
      ${trainingHtml}
    `;

    container.appendChild(card);
  });
}

async function populateEventosPage() {
  const data = await loadJSON("content/events.json");
  if (!data) {
    return;
  }

  document.getElementById("eventos-page-heading").textContent = data.heading.es;

  const introEl = document.getElementById("eventos-page-intro");
  if (introEl && data.intro?.es) {
    introEl.textContent = data.intro.es;
  }

  const grid = document.getElementById("eventos-page-grid");
  if (!data.items || data.items.length === 0) {
    grid.innerHTML = '<p class="events-empty">Próximamente nuevos eventos y talleres.</p>';
    return;
  }

  data.items.forEach((event, index) => {
    const card = document.createElement("div");
    card.className = "event-card reveal";
    card.style.transitionDelay = `${index * 80}ms`;

    const dateText = event.date === "__PLACEHOLDER__" ? "Fecha por confirmar" : event.date;
    const locationText = event.location?.es === "__PLACEHOLDER__" || !event.location?.es ? "Valencia" : event.location.es;

    card.innerHTML = `
      <div class="event-card__header">
        <span class="event-card__date${event.placeholder ? " event-card__date--tbc" : ""}">${dateText}</span>
        <span class="event-card__location">${locationText}</span>
      </div>
      <h3 class="event-card__title">${event.title.es}</h3>
      <p class="event-card__desc">${event.description.es}</p>
    `;

    grid.appendChild(card);
  });
}

async function populateServiciosPage() {
  const data = await loadJSON("content/services.json");
  if (!data) {
    return;
  }

  document.getElementById("servicios-page-heading").textContent = data.heading.es;
  document.getElementById("servicios-page-intro").textContent = data.intro?.es || "";

  const grid = document.getElementById("servicios-page-list");
  data.items.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "servicios-page-card reveal";
    card.id = item.anchor;
    card.style.transitionDelay = `${index * 80}ms`;

    const priceText = item.price?.placeholder
      ? item.price.description
      : `${item.price?.amount || "__PLACEHOLDER__"} ${item.price?.currency || "EUR"}`;

    card.innerHTML = `
      <h2 class="servicios-page-card__title">${item.title.es}</h2>
      <p class="servicios-page-card__description">${item.description.es}</p>
      <div class="servicios-page-card__meta">
        <p><strong>Para quién:</strong> ${item.for?.es || "__PLACEHOLDER__"}</p>
        <p><strong>Qué incluye:</strong> ${item.includes?.es || "__PLACEHOLDER__"}</p>
      </div>
      <p class="servicios-page-card__price">${priceText}</p>
    `;

    grid.appendChild(card);
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Alumbra Comares",
    "service": data.items.map((item) => ({
      "@type": "Service",
      "name": item.title.es,
      "description": item.description.es,
      "provider": {
        "@type": "LocalBusiness",
        "name": "Alumbra Comares",
      },
      "areaServed": "Valencia",
    })),
  };

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(jsonLd, null, 2);
  document.head.appendChild(script);
}

// -- Init ----------------------------------------------------------

document.addEventListener("DOMContentLoaded", async () => {
  if (isFaqPage()) {
    await populateFaqPage();
    return;
  }

  if (isComoTrabajamosPage()) {
    await populateHowWeWorkPage();
    revealSection("como-trabajamos");
    return;
  }

  if (isRecursosPage()) {
    await populateRecursosPage();
    revealSection("recursos-page");
    return;
  }

  if (isFormacionPage()) {
    await populateFormacionPage();
    revealSection("formacion-page");
    return;
  }

  if (isEventosPage()) {
    await populateEventosPage();
    revealSection("eventos-page");
    return;
  }

  if (isServiciosPage()) {
    await populateServiciosPage();
    revealSection("servicios-page");
    return;
  }

  if (!isHomepage()) {
    return;
  }

  await loadSection("quienes-somos", "sections/quienes-somos.html");
  revealSection("quienes-somos");

  await loadSection("por-que", "sections/por-que.html");
  revealSection("por-que");

  await loadSection("equipo", "sections/equipo.html");
  await populateTeam();
  revealSection("equipo");

  await loadSection("servicios", "sections/servicios.html");
  await populateServices();
  revealSection("servicios");

  populatePageLinks();
  revealSection("page-links");

  await loadSection("testimonios", "sections/testimonios.html");
  await populateTestimonials();
  initCarousel("testimonials-grid", "testimonials-dots");
  revealSection("testimonios");

  populatePageLinksSecondary();
  revealSection("page-links-secondary");

  await loadSection("contacto", "sections/contacto.html");
  await populateContact();
  revealSection("contacto");

  if (window.location.hash) {
    const target = document.getElementById(window.location.hash.slice(1));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  }
});
