import React from 'react';
import { motion } from 'framer-motion';
import { FEATURES } from '../data/content';
import { cn } from '../utils/format';
import { PitchContourBg } from './Art.jsx';
import { Heading } from './UI.jsx';

const SPAN = { lg: 'lg:col-span-7', md: 'lg:col-span-5', sm: 'lg:col-span-4' };
const PALETTE = [
  '245,166,35',  // gold
  '6,182,212',   // cyan
  '139,92,246',  // violet
  '16,185,129',  // emerald
  '59,130,246',  // volt
  '244,63,94',   // crimson
  '245,166,35',  // gold
  '6,182,212',   // cyan
];

/* mini illustrations for the two large cards */
function LiveBars() {
  return (
    <div className="flex h-10 items-end gap-1.5" aria-hidden="true">
      {[40, 65, 50, 85, 60, 95, 70, 100, 80, 55].map((h, i) => (
        <motion.span key={i} className="w-2 rounded-full bg-gradient-to-t from-gold/30 to-gold"
          initial={{ height: `${h * 0.5}%` }} animate={{ height: [`${h * 0.45}%`, `${h}%`, `${h * 0.55}%`] }}
          transition={{ duration: 2.4 + (i % 4) * 0.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.12 }} />
      ))}
    </div>
  );
}
function Ladder() {
  return (
    <ol className="flex items-center gap-2 text-xs font-bold tabular-nums" aria-hidden="true">
      {['2.0', '2.5', '3.0', '3.5'].map((v, i) => (
        <motion.li key={v} className={cn('rounded-lg border px-2.5 py-1', i === 3 ? 'border-volt bg-volt/20 text-white' : 'border-white/10 text-mute')}
          initial={{ opacity: 0.3 }} animate={{ opacity: [0.35, 1, 0.35] }} transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}>{v}</motion.li>
      ))}
      <li className="text-xs font-medium text-mute">pts</li>
    </ol>
  );
}

function Card({ f, i }) {
  const Icon = f.icon;
  const rgb = PALETTE[i % PALETTE.length];
  const onMove = (e) => {
    const b = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--x', `${e.clientX - b.left}px`);
    e.currentTarget.style.setProperty('--y', `${e.clientY - b.top}px`);
  };
  return (
    <motion.li
      onPointerMove={onMove}
      className={cn('group relative overflow-hidden rounded-2xl border border-white/15 bg-navy-900/75 p-4 backdrop-blur-md transition-colors duration-300 hover:border-white/30 sm:p-5', SPAN[f.size])}
      style={{ backgroundImage: `radial-gradient(280px circle at 92% 8%, rgba(${rgb},.16), transparent 65%)` }}
      initial={{ opacity: 0, scale: 0.94 }} whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }} transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[3px] opacity-85"
        style={{ background: `linear-gradient(90deg, transparent, rgb(${rgb}), transparent)` }} aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `radial-gradient(360px circle at var(--x,50%) var(--y,50%), rgba(${rgb},.24), transparent 65%)` }} aria-hidden="true" />
      <div className="relative flex h-full flex-col">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110"
            style={{ background: `rgba(${rgb},.14)`, borderColor: `rgba(${rgb},.4)`, color: `rgb(${rgb})` }}>
            <Icon size={18} aria-hidden="true" />
          </span>
          <h3 className="font-display text-xl font-extrabold uppercase leading-none sm:text-2xl">{f.title}</h3>
        </div>
        <p className="mt-2.5 text-xs leading-relaxed text-mute sm:text-[13px]">{f.desc}</p>
        {f.id === 'live' && <div className="mt-auto pt-3"><LiveBars /></div>}
        {f.id === 'bidding' && <div className="mt-auto pt-3"><Ladder /></div>}
      </div>
    </motion.li>
  );
}

export default function Features() {
  return (
    <section id="features" className="relative flex min-h-[calc(100svh-4.5rem)] items-center overflow-hidden bg-navy-900 py-10 sm:py-12" aria-labelledby="features-title">
      <div className="mesh-vivid pointer-events-none absolute inset-0 opacity-75" aria-hidden="true" />
      <PitchContourBg variant="gold" className="pointer-events-none absolute inset-0 h-full w-full opacity-45" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-cyan/50 via-gold/60 to-violet/50" aria-hidden="true" />
      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8">
        <Heading id="features-title" title={<>Built for the <span className="text-gold-grad">auction hall</span></>}
          sub="Every feature below is something CRICZAAR already does today, from the first registration to the final squad card." />
        <ul className="mt-7 grid gap-3.5 lg:grid-cols-12">
          {FEATURES.map((f, i) => <Card key={f.id} f={f} i={i} />)}
        </ul>
      </div>
    </section>
  );
}
