import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Landmark, Medal, MonitorSmartphone, PartyPopper, Shield, Timer, Users } from 'lucide-react';
import { STATS } from '../data/content';
import { ConnectedScreensVector, PitchContourBg } from './Art.jsx';
import { Counter, Heading, Reveal } from './UI.jsx';

const AUDIENCE = [
  { icon: Building2, t: 'Cricket clubs', color: 'text-cyan-soft border-cyan/40 bg-cyan/15 shadow-[0_0_24px_-8px_rgba(6,182,212,.55)]' },
  { icon: Medal, t: 'Tournament organizers', color: 'text-gold-soft border-gold/40 bg-gold/15 shadow-[0_0_24px_-8px_rgba(245,166,35,.55)]' },
  { icon: Landmark, t: 'Sports associations', color: 'text-violet-soft border-violet/40 bg-violet/15 shadow-[0_0_24px_-8px_rgba(139,92,246,.55)]' },
  { icon: PartyPopper, t: 'Event organizers', color: 'text-sold border-sold/40 bg-sold/15 shadow-[0_0_24px_-8px_rgba(16,185,129,.55)]' },
];

const STAT_STYLES = [
  { icon: Shield, bar: 'from-cyan to-volt', num: 'from-cyan-soft to-volt-soft', badge: 'bg-cyan/15 text-cyan-soft border-cyan/35', glow: 'rgba(6,182,212,.14)' },
  { icon: Timer, bar: 'from-gold to-crimson', num: 'from-gold-soft to-gold', badge: 'bg-gold/15 text-gold-soft border-gold/35', glow: 'rgba(245,166,35,.14)' },
  { icon: Users, bar: 'from-violet to-crimson', num: 'from-violet-soft to-crimson-soft', badge: 'bg-violet/15 text-violet-soft border-violet/35', glow: 'rgba(139,92,246,.14)' },
  { icon: MonitorSmartphone, bar: 'from-sold to-cyan', num: 'from-sold to-cyan-soft', badge: 'bg-sold/15 text-sold border-sold/35', glow: 'rgba(16,185,129,.14)' },
];

export default function About() {
  return (
    <section id="about" className="relative flex min-h-[calc(100svh-4.5rem)] items-center overflow-hidden bg-navy-950 py-10 sm:py-12" aria-labelledby="about-title">
      <div className="mesh-vivid pointer-events-none absolute inset-0 opacity-90" aria-hidden="true" />
      <PitchContourBg variant="cyan" className="pointer-events-none absolute inset-0 h-full w-full opacity-80" />
      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-8 px-5 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
        <div>
          <Heading
            id="about-title"
            align="left"
            title={<>One screen for the <span className="text-spectrum-grad">whole auction</span></>}
          />
          <Reveal delay={0.1} className="mt-5 flex flex-wrap gap-2.5">
            {AUDIENCE.map(({ icon: I, t, color }) => (
              <span key={t} className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold backdrop-blur transition-transform hover:-translate-y-0.5 sm:text-sm ${color}`}>
                <I size={15} aria-hidden="true" />{t}
              </span>
            ))}
          </Reveal>
          <Reveal delay={0.2} className="mt-5">
            <ConnectedScreensVector className="w-full max-w-sm drop-shadow-[0_24px_48px_rgba(6,182,212,.18)]" />
          </Reveal>
        </div>

        <div className="space-y-5">
          <Reveal>
            <p className="text-lg leading-relaxed text-white/95 sm:text-xl">
              A player auction is the most exciting night of a cricket season, and the hardest to run. Bids get shouted over each other, budgets live on a whiteboard, and someone is always doing sums on a phone.
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="text-sm leading-relaxed text-mute sm:text-base">
              CRICZAAR replaces that with a single live system. You set the rules once, bring players in through registration, and run the auction from one console while teams bid from their own devices. The hall sees a projector screen, supporters follow along on a public page, and every purse and squad stays correct without a calculator.
            </p>
          </Reveal>

          <dl className="grid grid-cols-2 gap-3.5">
            {STATS.map((s, i) => {
              const st = STAT_STYLES[i % STAT_STYLES.length];
              const Icon = st.icon;
              return (
                <motion.div
                  key={s.label}
                  className="glass group relative overflow-hidden rounded-2xl p-4 transition-transform duration-300 hover:-translate-y-1 sm:p-5"
                  style={{ backgroundImage: `radial-gradient(240px circle at 100% 0%, ${st.glow}, transparent 70%)` }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                >
                  <div className={`pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r ${st.bar}`} aria-hidden="true" />
                  <div className="flex items-start justify-between gap-3">
                    <dd className={`bg-gradient-to-br bg-clip-text font-display text-5xl font-black leading-none text-transparent sm:text-6xl ${st.num}`}>
                      <Counter value={s.value} suffix={s.suffix} />
                    </dd>
                    <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl border ${st.badge}`}>
                      <Icon size={16} aria-hidden="true" />
                    </span>
                  </div>
                  <dt className="mt-2.5 text-xs font-medium leading-snug text-white/80 sm:text-sm">{s.label}</dt>
                </motion.div>
              );
            })}
          </dl>
        </div>
      </div>
    </section>
  );
}
