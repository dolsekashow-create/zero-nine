const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
const lang = document.documentElement.lang === 'en' ? 'en' : 'ar';
const waNumber = document.body.dataset.wa ?? '';
const waLink = (text: string, to = waNumber) => `https://wa.me/${to}?text=${encodeURIComponent(text)}`;
const fmt = new Intl.NumberFormat('en-US');

/* ---------- Header: solid background after scrolling, mobile menu ---------- */
const header = document.querySelector<HTMLElement>('.site-header')!;
const onScroll = () => header.classList.toggle('scrolled', scrollY > 24);
addEventListener('scroll', onScroll, { passive: true });
onScroll();

const menuBtn = document.querySelector<HTMLButtonElement>('.menu-btn');
const setMenu = (open: boolean) => {
  header.classList.toggle('menu-open', open);
  menuBtn?.setAttribute('aria-expanded', String(open));
};
menuBtn?.addEventListener('click', () => setMenu(!header.classList.contains('menu-open')));
document.querySelectorAll('.nav a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
addEventListener('keydown', (e) => e.key === 'Escape' && setMenu(false));

/* ---------- Scroll reveals + count-up ---------- */
const countUp = (el: HTMLElement) => {
  const target = Number(el.dataset.count);
  if (!Number.isFinite(target)) return;
  const start = performance.now();
  const dur = 1600;
  const tick = (t: number) => {
    const p = Math.min((t - start) / dur, 1);
    el.textContent = fmt.format(Math.round(target * (1 - Math.pow(1 - p, 4))));
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};

const io = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      const el = e.target as HTMLElement;
      el.classList.add('is-in');
      el.querySelectorAll<HTMLElement>('[data-count]').forEach(countUp);
      io.unobserve(el);
    }
  },
  { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
);
document.querySelectorAll('.reveal, .draw, [data-observe]').forEach((el) => io.observe(el));

/* ---------- Pointer glow on cards (desktop only) ---------- */
if (finePointer) {
  document.querySelectorAll<HTMLElement>('.card').forEach((card) => {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  });
}

/* ---------- Pause marquee while offscreen ---------- */
const marquee = document.querySelector('.marquee');
if (marquee) {
  new IntersectionObserver(([e]) => marquee.classList.toggle('paused', !e.isIntersecting)).observe(marquee);
}

/* ---------- Price calculator ---------- */
const calc = document.querySelector<HTMLFormElement>('#calc-form');
if (calc) {
  const totalEl = document.querySelector<HTMLElement>('#calc-total')!;
  const sendBtn = document.querySelector<HTMLAnchorElement>('#calc-send')!;
  let shown = 0;
  const animateTo = (to: number) => {
    const from = shown;
    shown = to;
    const start = performance.now();
    const step = (t: number) => {
      const p = Math.min((t - start) / 500, 1);
      totalEl.textContent = fmt.format(Math.round(from + (to - from) * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const update = () => {
    let total = 0;
    const lines: string[] = [];
    calc.querySelectorAll<HTMLInputElement>('input:checked').forEach((i) => {
      total += Number(i.value);
      lines.push(`• ${i.dataset.label}`);
    });
    animateTo(total);
    const head = lang === 'ar' ? 'السلام عليكم، استخدمت حاسبة السعر في موقع زيرو-ناين واخترت:' : 'Hello, I used the Zero-Nine price calculator and chose:';
    const tail = lang === 'ar' ? `التقدير المبدئي: ${fmt.format(total)} ج.م\nعايز عرض سعر دقيق.` : `Estimated price: ${fmt.format(total)} EGP\nI'd like an exact quote.`;
    sendBtn.href = waLink(`${head}\n${lines.join('\n')}\n\n${tail}`);
  };
  calc.addEventListener('change', update);
  shown = Number(totalEl.dataset.initial ?? 0);
  update();
}

/* ---------- Project brief -> WhatsApp ---------- */
const brief = document.querySelector<HTMLFormElement>('#brief');
brief?.addEventListener('submit', (e) => {
  e.preventDefault();
  const d = new FormData(brief);
  const g = (k: string) => String(d.get(k) ?? '').trim();
  const L = lang === 'ar'
    ? { hi: 'السلام عليكم، أنا', need: 'محتاج', budget: 'الميزانية', details: 'التفاصيل' }
    : { hi: 'Hello, my name is', need: 'I need', budget: 'Budget', details: 'Details' };
  const msg = [`${L.hi} ${g('name')}.`, `${L.need}: ${g('service')}`, `${L.budget}: ${g('budget')}`, g('details') && `${L.details}: ${g('details')}`]
    .filter(Boolean)
    .join('\n');
  window.open(waLink(msg, g('to') || waNumber), '_blank', 'noopener');
});

/* ---------- Close the WhatsApp number chooser on outside click / Escape ---------- */
const waChooser = document.querySelector<HTMLDetailsElement>('details.wa-float');
if (waChooser) {
  document.addEventListener('click', (e) => { if (waChooser.open && !waChooser.contains(e.target as Node)) waChooser.open = false; });
  addEventListener('keydown', (e) => { if (e.key === 'Escape') waChooser.open = false; });
}
