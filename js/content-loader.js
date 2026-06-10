/**
 * Content Loader
 * Minimal loader for JSON content files.
 * Other sections will be built as partials by their respective milestone agents.
 */

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

document.addEventListener('DOMContentLoaded', () => {
  loadSection('quienes-somos', 'sections/quienes-somos.html');
  loadSection('por-que', 'sections/por-que.html');
});
