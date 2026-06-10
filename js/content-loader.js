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

document.addEventListener('DOMContentLoaded', async () => {
  await loadSection('quienes-somos', 'sections/quienes-somos.html');
  await loadSection('por-que', 'sections/por-que.html');
  await loadSection('equipo', 'sections/equipo.html');
  await populateTeam();
});
