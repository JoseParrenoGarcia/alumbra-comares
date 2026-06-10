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
});
