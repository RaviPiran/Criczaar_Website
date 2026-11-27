import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import { Check, Gavel, Trophy, UserPlus, Settings2 } from 'lucide-react';
import { STEPS } from '../data/content';
import { cn } from '../utils/format';
import { PitchContourBg } from './Art.jsx';
import { Heading } from './UI.jsx';

const ICONS = [Settings2, UserPlus, Gavel, Trophy];
const AUTO_MS = 6000;

/* ── per-step illustrations ── */
function Row({ k, v }) {
  return <div className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2 text-sm"><span className="text-mute">{k}</span><span className="font-bold tabular-nums">{v}</span></div>;
}
function V1() {
  return (
    <div className="space-y-2.5">
      <div className="rounded-xl border border-gold/40 bg-gold/10 px-4 py-3"><p className="text-xs text-mute">Tournament</p><p className="font-display text-2xl font-extrabold uppercase">Summer Premier Cup</p></div>
      <Row k="Base price" v="0.5 pts" /><Row k="Bid increment" v="0.5 pts" /><Row k="Timer" v="30 s" /><Row k="Max players per team" v="11" />
      <div className="flex items-center justify-between rounded-lg border border-dashed border-volt/50 px-3 py-2 text-sm"><span className="text-mute">Bonus tier</span><span className="font-bold text-volt-soft">Bids 10–15 pts · +bonus</span></div>
    </div>
  );
}
function V2() {
  const rows = [['Kavin D.', 'All-rounder'], ['Rohan V.', 'Batsman'], ['Imran S.', 'Bowler']];
  return (
    <ul className="space-y-2.5">
      {rows.map(([n, r], i) => (
        <motion.li key={n} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.12 }}
          className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-3">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-navy-700 text-sm font-black">{n[0]}</span>
          <div className="min-w-0 flex-1"><p className="truncate text-sm font-bold">{n}</p><p className="text-xs text-mute">{r}</p></div>
          {i === 0 && <span className="rounded-full bg-sold/15 px-3 py-1 text-xs font-bold text-sold">Approved</span>}
          {i === 1 && <span className="rounded-full bg-alarm/15 px-3 py-1 text-xs font-bold text-alarm">Rejected</span>}
          {i === 2 && (<motion.span animate={{ opacity: [1, 0.5, 1] }} transition={{ repeat: Infinity, duration: 1.8 }} className="rounded-full bg-gold/15 px-3 py-1 text-xs font-bold text-gold-soft">Pending</motion.span>)}
        </motion.li>
      ))}
      <li className="rounded-xl border border-dashed border-white/20 px-3 py-2.5 text-center text-xs text-mute">Registration link shared with players</li>
    </ul>
  );
}
function V3() {
  const slices = 8;
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <span className="absolute left-1/2 top-[-6px] z-10 h-0 w-0 -translate-x-1/2 border-x-[9px] border-t-[16px] border-x-transparent border-t-gold" aria-hidden="true" />
        <motion.svg viewBox="-100 -100 200 200" className="h-56 w-56" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 18, ease: 'linear' }} aria-hidden="true">
          {Array.from({ length: slices }).map((_, i) => {
            const a0 = (i / slices) * Math.PI * 2; const a1 = ((i + 1) / slices) * Math.PI * 2; const am = (a0 + a1) / 2;
            return (
              <g key={i}>
                <path d={`M0 0 L${96 * Math.cos(a0)} ${96 * Math.sin(a0)} A96 96 0 0 1 ${96 * Math.cos(a1)} ${96 * Math.sin(a1)} Z`} fill={i % 2 ? '#17213A' : '#223052'} stroke="#080D19" strokeWidth="2" />
                <text x={62 * Math.cos(am)} y={62 * Math.sin(am)} fill="#FFC85C" fontSize="9" fontWeight="800" textAnchor="middle" dominantBaseline="middle" transform={`rotate(${(am * 180) / Math.PI + 90} ${62 * Math.cos(am)} ${62 * Math.sin(am)})`}>LOT {String(i + 1).padStart(2, '0')}</text>
              </g>
            );
          })}
          <circle r="16" fill="#080D19" stroke="#F5A623" strokeWidth="3" />
        </motion.svg>
      </div>
      <p className="text-center text-xs text-mute">Mystery lots hide names until the wheel stops</p>
    </div>
  );
}
function V4() {
  const squads = [['Harbour Hawks', '#4D8DFF', [['Kavin Dias', '8.5'], ['Dilan Fernando', '4.0']]], ['Royal Strikers', '#F5A623', [['Imran Sheikh', '7.0'], ['Rohan Varma', '5.5']]]];
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {squads.map(([n, c, ps]) => (
        <div key={n} className="rounded-xl border border-white/10 bg-white/5 p-3">
          <p className="text-sm font-bold" style={{ color: c }}>{n}</p>
          <ul className="mt-2 space-y-1 text-xs">{ps.map(([p, v]) => <li key={p} className="flex justify-between"><span>{p}</span><span className="tabular-nums text-mute">{v} pts</span></li>)}</ul>
        </div>
      ))}
      <div className="flex items-center gap-3 rounded-xl border border-gold/40 bg-gold/10 p-3 sm:col-span-2">
        <Trophy size={22} className="text-gold" aria-hidden="true" />
        <p className="text-sm"><span className="font-bold">Top seller:</span> Kavin Dias <span className="text-mute">· 8.5 pts</span></p>
      </div>
    </div>
  );
}
const VISUALS = [V1, V2, V3, V4];

export default function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [hold, setHold] = useState(false);

  // auto-advance while visible; resets whenever the person picks a step
  useEffect(() => {
    if (!inView || hold || reduce) return undefined;
    const id = setTimeout(() => setActive((a) => (a + 1) % STEPS.length), AUTO_MS);
    return () => clearTimeout(id);
  }, [active, inView, hold, reduce]);

  const Visual = VISUALS[active];
  const step = STEPS[active];

  return (
    <section id="how-it-works" ref={ref} className="relative flex min-h-[calc(100svh-4.5rem)] items-center overflow-hidden bg-navy-950 py-10 sm:py-12" aria-labelledby="how-title">
      <div className="mesh-vivid pointer-events-none absolute inset-0 opacity-65" aria-hidden="true" />
      <PitchContourBg variant="emerald" className="pointer-events-none absolute inset-0 h-full w-full opacity-50" />
      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8">
        <Heading id="how-title" title={<>From first setup to <span className="text-spectrum-grad">final squad</span></>} sub="Four steps take you from an empty tournament to a finished auction. Pick a step to see what it looks like." />

        <div className="mt-8 grid items-center gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-12" onPointerEnter={() => setHold(true)} onPointerLeave={() => setHold(false)} onFocusCapture={() => setHold(true)} onBlurCapture={() => setHold(false)}>
          <ol className="relative space-y-3" role="tablist" aria-label="Auction steps" aria-orientation="vertical">
            <span className="absolute bottom-8 left-[1.7rem] top-8 w-px bg-white/10" aria-hidden="true" />
            <motion.span className="absolute left-[1.7rem] top-8 w-px origin-top bg-gradient-to-b from-gold to-volt" style={{ height: 'calc(100% - 4rem)' }}
              animate={{ scaleY: active / (STEPS.length - 1) }} transition={{ duration: 0.6, ease: 'easeInOut' }} aria-hidden="true" />
            {STEPS.map((s, i) => {
              const I = ICONS[i];
              const on = i === active;
              const past = i < active;
              return (
                <li key={s.title} role="presentation">
                  <button type="button" role="tab" id={`step-tab-${i}`} aria-selected={on} aria-controls="step-panel" onClick={() => setActive(i)}
                    className={cn('relative flex w-full items-start gap-4 rounded-2xl border p-4 text-left transition-colors sm:p-5', on ? 'border-gold/50 bg-white/[0.06]' : 'border-transparent hover:bg-white/[0.04]')}>
                    <span className={cn('relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 font-display text-xl font-black transition-colors',
                      on ? 'border-gold bg-gold text-navy-950' : past ? 'border-gold/60 bg-navy-900 text-gold' : 'border-white/20 bg-navy-900 text-mute')}>
                      {past ? <Check size={18} aria-hidden="true" /> : i + 1}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2">
                        <I size={16} className={on ? 'text-gold' : 'text-mute'} aria-hidden="true" />
                        <span className={cn('font-display text-2xl font-extrabold uppercase leading-none sm:text-3xl', on ? 'text-white' : 'text-white/70')}>{s.title}</span>
                      </span>
                      <AnimatePresence initial={false}>
                        {on && (
                          <motion.span key="d" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35 }} className="block overflow-hidden">
                            <span className="mt-2 block text-[15px] leading-relaxed text-mute">{s.desc}</span>
                            <span className="relative mt-3 block h-0.5 overflow-hidden rounded-full bg-white/10">
                              {!reduce && !hold && inView && <motion.span key={active} className="absolute inset-y-0 left-0 bg-gold" initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: AUTO_MS / 1000, ease: 'linear' }} />}
                            </span>
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

          <div id="step-panel" role="tabpanel" aria-labelledby={`step-tab-${active}`} className="glass relative min-h-[21rem] overflow-hidden rounded-3xl p-5 sm:p-6">
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gold/15 blur-3xl" aria-hidden="true" />
            <AnimatePresence mode="wait">
              <motion.div key={active} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35 }} className="relative">
                <Visual />
                <ul className="mt-4 space-y-1.5 border-t border-white/10 pt-4">
                  {step.points.map((p) => (
                    <li key={p} className="flex items-center gap-2.5 text-sm"><Check size={15} className="shrink-0 text-sold" aria-hidden="true" />{p}</li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
