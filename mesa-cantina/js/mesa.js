/* Mesa Cantina — shared behaviour: nav, open-now tide strip, reveal */
(() => {
  // HOURS [confirm with owner]: Tue–Sun 8:00–21:00, Monday closed. Belize = UTC-6, no DST.
  const HOURS = { open: 8, close: 21, closedDays: [1] };
  const MEALS = [
    { from: 8,  to: 11, label: 'Breakfast is on — coconut French toast and strong coffee' },
    { from: 11, to: 16, label: 'Lunch on the sand' },
    { from: 16, to: 21, label: 'Cantina hours — dinner and cocktails at sundown' }
  ];
  const DAYS = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

  function belizeNow() {
    const d = new Date();
    return new Date(d.getTime() + d.getTimezoneOffset() * 60000 - 6 * 3600000);
  }
  function fmt(h) { const ap = h >= 12 ? 'pm' : 'am'; const hh = h % 12 || 12; return hh + ap; }

  function status() {
    const now = belizeNow(), day = now.getDay(), h = now.getHours() + now.getMinutes() / 60;
    const openToday = !HOURS.closedDays.includes(day);
    if (openToday && h >= HOURS.open && h < HOURS.close) {
      const meal = MEALS.find(m => h >= m.from && h < m.to);
      return { state: 'open', text: `Open now till ${fmt(HOURS.close)} · ${meal ? meal.label : ''}` };
    }
    // next opening
    let n = 0, d = day;
    if (openToday && h < HOURS.open) return { state: 'closed', text: `Opens today at ${fmt(HOURS.open)} · breakfast first` };
    do { n++; d = (day + n) % 7; } while (HOURS.closedDays.includes(d));
    const when = n === 1 ? 'tomorrow' : DAYS[d];
    return { state: 'closed', text: `Closed now · back ${when} at ${fmt(HOURS.open)} for breakfast` };
  }

  function paintTide() {
    document.querySelectorAll('[data-tide]').forEach(el => {
      const s = status();
      el.dataset.state = s.state;
      const t = el.querySelector('[data-tide-text]');
      if (t) t.textContent = s.text;
    });
    document.querySelectorAll('[data-open-badge]').forEach(el => {
      const s = status(); el.dataset.state = s.state; el.textContent = s.state === 'open' ? 'Open now' : 'Closed now';
    });
  }

  function nav() {
    const btn = document.querySelector('.nav-toggle'), nav = document.getElementById('site-nav');
    if (!btn || !nav) return;
    const set = open => { nav.classList.toggle('is-open', open); btn.setAttribute('aria-expanded', open); document.body.style.overflow = open ? 'hidden' : ''; };
    btn.addEventListener('click', () => set(btn.getAttribute('aria-expanded') !== 'true'));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') set(false); });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => set(false)));
    const here = location.pathname.split('/').pop() || 'index.html';
    nav.querySelectorAll('a[href]').forEach(a => { if (a.getAttribute('href') === here) a.setAttribute('aria-current', 'page'); });
  }

  function reveal() {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
    const els = document.querySelectorAll('[data-reveal]');
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
    els.forEach(el => { const r = el.getBoundingClientRect(); if (r.top > innerHeight) { el.classList.add('will-reveal'); io.observe(el); } });
  }

  document.addEventListener('DOMContentLoaded', () => {
    nav(); paintTide(); reveal();
    setInterval(paintTide, 60000);
    const y = document.querySelector('[data-year]'); if (y) y.textContent = new Date().getFullYear();
  });
  window.Mesa = { status, HOURS };
})();
