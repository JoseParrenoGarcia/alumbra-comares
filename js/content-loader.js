/**
 * Content Loader
 * Minimal loader for JSON content files.
 * Other sections will be built as partials by their respective milestone agents.
 */

async function loadContent(path) {
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

// Hero content injection can be wired here per-section in each milestone.
// This file serves as the entry point for content loading across the site.
