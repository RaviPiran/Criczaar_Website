import React from 'react';
import { motion } from 'framer-motion';
import { Check, Info } from 'lucide-react';
import { PLANS, PRICING_NOTE } from '../data/content';
import { cn } from '../utils/format';
import { PitchContourBg, TrophyVector } from './Art.jsx';
import { Heading } from './UI.jsx';

const PLAN_ACCENT = {
  starter: 'from-cyan/60 via-volt/40 to-transparent',
  professional: 'from-gold via-crimson/70 to-gold-soft',
  enterprise: 'from-violet/60 via-sold/40 to-transparent',
};

export default function Pricing({ onPlan }) {
  return (
    <section id="pricing" className="relative flex min-h-[calc(100svh-4.5rem)] items-center overflow-hidden bg-navy-900 py-10 sm:py-12" aria-labelledby="pricing-title">
      <div className="mesh-vivid pointer-events-none absolute inset-0 opacity-75" aria-hidden="true" />
      <PitchContourBg variant="violet" className="pointer-events-none absolute inset-0 h-full w-full opacity-50" />
      <div className="pointer-events-none absolute right-[6%] top-10 hidden opacity-70 lg:block" aria-hidden="true">
        <TrophyVector size={72} className="bob" />
      </div>
      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8">
        <Heading id="pricing-title" title={<>Pick a plan to <span className="text-spectrum-grad">ask about</span></>}
          sub="Tell us which plan fits and we will follow up. Request a plan below and your choice is added to the form." />

        <div className="mx-auto mt-5 flex max-w-2xl items-start gap-3 rounded-2xl border border-gold/35 bg-gold/10 px-4 py-3 text-xs text-gold-soft sm:text-sm">
          <Info size={17} className="mt-0.5 shrink-0" aria-hidden="true" />
          <p>{PRICING_NOTE}</p>
        </div>

        <ul className="mt-8 grid items-stretch gap-5 lg:grid-cols-3">
          {PLANS.map((p, i) => (
            <motion.li key={p.id}
              initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '0px 0px -8% 0px' }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className={cn('relative flex flex-col rounded-3xl p-6', p.featured ? 'bg-gradient-to-b from-gold/20 via-navy-800 to-navy-800 shadow-gold lg:-my-2 lg:py-7' : 'glass')}
              style={p.featured ? { border: '1.5px solid rgba(245,166,35,.65)' } : undefined}>
              <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl" aria-hidden="true">
                <div className={cn('h-1 w-full bg-gradient-to-r', PLAN_ACCENT[p.id] || 'from-gold to-transparent')} />
              </div>
              {p.featured && <span className="absolute -top-3.5 left-6 z-10 rounded-full bg-gradient-to-r from-gold to-gold-soft px-4 py-1 text-xs font-extrabold text-navy-950 shadow-gold">Featured plan</span>}
              <h3 className="font-display text-3xl font-black uppercase leading-none">{p.name}</h3>
              <p className="mt-1.5 text-xs text-mute sm:text-sm">{p.blurb}</p>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="font-display text-5xl font-black leading-none tabular-nums text-gold-grad">{p.price}</span>
                <span className="text-xs text-mute sm:text-sm">{p.unit}</span>
              </div>
              <span className="mt-1.5 inline-block w-fit rounded-full border border-dashed border-white/25 px-2.5 py-0.5 text-[10px] font-semibold text-mute">Placeholder price</span>

              <ul className="my-5 space-y-2.5 border-t border-white/10 pt-5">
                {p.items.map((it) => (
                  <li key={it.t} className="flex items-start gap-2.5 text-sm">
                    <Check size={16} className={cn('mt-0.5 shrink-0', p.featured ? 'text-gold' : 'text-sold')} aria-hidden="true" />
                    <span>{it.t}{it.tbc && <span className="ml-2 rounded border border-dashed border-white/25 px-1.5 py-px text-[10px] font-bold text-mute">TBC</span>}</span>
                  </li>
                ))}
              </ul>

              <button type="button" onClick={() => onPlan(p)} className={cn('btn mt-auto w-full !py-2.5', p.featured ? 'btn-gold' : 'btn-ghost')}>Request This Plan</button>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
