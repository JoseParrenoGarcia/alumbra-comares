async function loadSection(id, path) {
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`Failed to load ${path}: ${res.status}`);
    const html = await res.text();
    document.getElementById(id).innerHTML = html;
  } catch (error) {
    console.error(error);
  }
}

async function loadJSON(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Failed to load ${path}: ${res.status}`);
  return res.json();
}

async function populateTeam() {
  const data = await loadJSON('content/team.json');

  document.getElementById('team-heading').textContent = data.heading.es;

  ['isabel', 'alicia', 'leticia'].forEach((prefix, index) => {
    const member = data.members[index];
    document.getElementById(`${prefix}-initial`).textContent = member.name.charAt(0);
    document.getElementById(`${prefix}-name`).textContent = member.name;
    document.getElementById(`${prefix}-role`).textContent = member.role.es;
    document.getElementById(`${prefix}-bio`).textContent = member.bio.es;
    document.getElementById(`${prefix}-quote`).textContent = member.quote.es;
  });

  document.getElementById('quote-band-text').textContent = data.members[1].quote.es;
}

async function populateServices() {
  const data = await loadJSON('content/services.json');

  document.getElementById('services-heading').textContent = data.heading.es;

  data.items.forEach((item, i) => {
    document.getElementById(`service-${i}-title`).textContent = item.title.es;
    document.getElementById(`service-${i}-desc`).textContent = item.description.es;

    const priceEl = document.getElementById(`service-${i}-price`);
    if (item.price.placeholder) {
      priceEl.textContent = 'Precio a consultar';
      priceEl.classList.add('price--placeholder');
    } else {
      priceEl.textContent = `${item.price.amount} ${item.price.currency}`;
    }
  });
}

async function populateEvents() {
  const data = await loadJSON('content/events.json');
  document.getElementById('events-heading').textContent = data.heading.es;

  const grid = document.getElementById('events-grid');
  if (!data.items || data.items.length === 0) {
    grid.innerHTML = '<p class="events-empty">Próximamente nuevos eventos y talleres.</p>';
    return;
  }

  data.items.forEach((event, i) => {
    const card = document.createElement('div');
    card.className = 'event-card reveal';
    card.style.transitionDelay = `${i * 80}ms`;

    const dateText = event.date === '__PLACEHOLDER__' ? 'Fecha por confirmar' : event.date;
    const locationText = (event.location?.es === '__PLACEHOLDER__' || !event.location?.es) ? 'Valencia' : event.location.es;

    card.innerHTML = `
      <div class="event-card__header">
        <span class="event-card__date${event.placeholder ? ' event-card__date--tbc' : ''}">${dateText}</span>
        <span class="event-card__location">${locationText}</span>
      </div>
      <h3 class="event-card__title">${event.title.es}</h3>
      <p class="event-card__desc">${event.description.es}</p>
      <a href="#contacto" class="btn btn-primary event-card__cta">Solicitar información</a>
    `;
    grid.appendChild(card);
  });
}

async function populateContact() {
  const [contactData, servicesData] = await Promise.all([
    loadJSON('content/contact.json'),
    loadJSON('content/services.json')
  ]);

  document.getElementById('contact-heading').textContent = contactData.heading.es;
  document.getElementById('contact-subheading').textContent = contactData.subheading.es;
  document.getElementById('label-name').textContent = contactData.form.name_label.es;
  document.getElementById('label-email').textContent = contactData.form.email_label.es;
  document.getElementById('label-message').textContent = contactData.form.message_label.es;
  document.getElementById('contact-submit').textContent = contactData.form.submit_label.es;

  // Contact channels
  const list = document.getElementById('contact-channel-list');
  contactData.channels.forEach(ch => {
    const li = document.createElement('li');
    li.className = 'contact-channel';
    let href = '#';
    if (ch.type === 'email') href = `mailto:${ch.value}`;
    if (ch.type === 'phone') href = `tel:${ch.value.replace(/\s/g, '')}`;
    if (ch.type === 'instagram') href = `https://instagram.com/alumbracomares`;
    li.innerHTML = `<a href="${href}" class="contact-channel__link" target="${ch.type === 'email' || ch.type === 'phone' ? '_self' : '_blank'}" rel="noopener">
      <span class="contact-channel__icon" aria-hidden="true">${channelIcon(ch.type)}</span>
      <span class="contact-channel__label">${ch.label.es}</span>
      <span class="contact-channel__value">${ch.value}</span>
    </a>`;
    list.appendChild(li);
  });

  // WhatsApp
  const waLi = document.createElement('li');
  waLi.className = 'contact-channel';
  waLi.innerHTML = `<a href="https://wa.me/34656479893" class="contact-channel__link" target="_blank" rel="noopener">
    <span class="contact-channel__icon" aria-hidden="true">💬</span>
    <span class="contact-channel__label">WhatsApp</span>
    <span class="contact-channel__value">+34 656 479 893</span>
  </a>`;
  list.appendChild(waLi);

  // Service interest options
  const select = document.getElementById('contact-service');
  servicesData.items.forEach(item => {
    const opt = document.createElement('option');
    opt.value = item.title.es;
    opt.textContent = item.title.es;
    select.appendChild(opt);
  });
}

function channelIcon(type) {
  const icons = { email: '✉️', phone: '📞', instagram: '📸', whatsapp: '💬' };
  return icons[type] || '→';
}

function revealSection(id) {
  document.querySelectorAll(`#${id} .reveal`).forEach(el => el.classList.add('visible'));
}

document.addEventListener('DOMContentLoaded', async () => {
  await loadSection('quienes-somos', 'sections/quienes-somos.html');
  revealSection('quienes-somos');
  await loadSection('por-que', 'sections/por-que.html');
  revealSection('por-que');
  await loadSection('equipo', 'sections/equipo.html');
  await populateTeam();
  revealSection('equipo');
  await loadSection('servicios', 'sections/servicios.html');
  await populateServices();
  revealSection('servicios');
  await loadSection('eventos', 'sections/eventos.html');
  await populateEvents();
  revealSection('eventos');
  await loadSection('contacto', 'sections/contacto.html');
  await populateContact();
  revealSection('contacto');
});
