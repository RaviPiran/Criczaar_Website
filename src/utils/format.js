export const cn = (...c) => c.filter(Boolean).join(' ');
export const pts = (n) => Number(n).toFixed(1);
export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export function scrollToId(id, reduce = false) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  if (history.replaceState) history.replaceState(null, '', `#${id}`);
}

const read = (key) => {
  try { return JSON.parse(localStorage.getItem(key)) || []; } catch { return []; }
};
export const store = {
  list: read,
  // Throws if storage is unavailable so the UI can show a real error state.
  add(key, item) {
    const next = [item, ...read(key)].slice(0, 25);
    localStorage.setItem(key, JSON.stringify(next));
    return next;
  },
  clear(key) { try { localStorage.removeItem(key); } catch { /* ignore */ } },
};
