import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { NAV } from '../data/content';
import { cn } from '../utils/format';

export default function Navbar({ onNav, onDemo }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // scroll-spy
  useEffect(() => {
    const ids = [...NAV.map((n) => n.id), 'live-auction', 'request'];
    const map = { 'live-auction': 'how-it-works', request: 'pricing' };
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(map[e.target.id] || e.target.id); }),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);

  // mobile menu: lock scroll + Escape to close
  useEffect(() => {
    if (!open) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey); };
  }, [open]);

  const go = (id) => { setOpen(false); onNav(id); };

  return (
    <header className={cn('fixed inset-x-0 top-0 z-50 transition-all duration-300', scrolled || open ? 'border-b border-white/10 bg-navy-950/80 backdrop-blur-xl' : 'border-b border-transparent')}>
      <a href="#home" onClick={(e) => { e.preventDefault(); go('home'); }} className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded-lg focus:bg-gold focus:px-4 focus:py-2 focus:text-navy-950">Skip to top</a>
      <nav className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-5 sm:px-8" aria-label="Primary">
        <a href="#home" onClick={(e) => { e.preventDefault(); go('home'); }} className="flex shrink-0 items-center" aria-label="CRICZAAR home">
          <img src="/logo-sm.png" alt="CRICZAAR" width="256" height="214" className="h-14 w-auto -my-1" />
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <li key={n.id}>
              <a href={`#${n.id}`} onClick={(e) => { e.preventDefault(); go(n.id); }}
                aria-current={active === n.id ? 'true' : undefined}
                className={cn('relative rounded-full px-4 py-2 text-sm font-semibold transition-colors', active === n.id ? 'text-white' : 'text-mute hover:text-white')}>
                {active === n.id && <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full bg-white/10" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />}
                {n.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <button type="button" onClick={onDemo} className="btn btn-gold hidden !py-2.5 sm:inline-flex">Request a Demo</button>
          <button type="button" className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/5 lg:hidden"
            aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen((o) => !o)}>
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <motion.div className="h-[2px] origin-left bg-gradient-to-r from-gold via-gold-soft to-volt" style={{ scaleX: progress }} aria-hidden="true" />

      <AnimatePresence>
        {open && (
          <motion.div id="mobile-menu" className="absolute inset-x-0 top-full max-h-[calc(100svh-4.5rem)] overflow-y-auto border-b border-white/10 bg-navy-950/95 backdrop-blur-xl lg:hidden"
            initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}>
            <ul className="mx-auto max-w-7xl space-y-1 px-5 py-4">
              {NAV.map((n, i) => (
                <motion.li key={n.id} initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 * i }}>
                  <a href={`#${n.id}`} onClick={(e) => { e.preventDefault(); go(n.id); }}
                    className={cn('block rounded-xl px-4 py-3.5 font-display text-2xl font-extrabold uppercase', active === n.id ? 'bg-white/10 text-gold-soft' : 'text-white/90')}>{n.label}</a>
                </motion.li>
              ))}
              <li className="pt-3"><button type="button" onClick={() => { setOpen(false); onDemo(); }} className="btn btn-gold w-full">Request a Demo</button></li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
