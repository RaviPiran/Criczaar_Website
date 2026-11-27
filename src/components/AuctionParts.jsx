import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Gavel } from 'lucide-react';
import { PlayerFigure } from './Art.jsx';
import { DEMO_TEAMS as TEAMS } from '../data/content';
import { TIMER } from '../hooks/useAuctionSim';
import { cn, pts } from '../utils/format';

export const teamOf = (id) => TEAMS.find((t) => t.id === id);

export function TimerRing({ time, size = 84 }) {
  const r = 42;
  const c = 2 * Math.PI * r;
  const urgent = time <= 4;
  return (
    <div className="relative grid place-items-center" style={{ width: size, height: size }} role="timer" aria-label={`${time} seconds left`}>
      <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90">
        <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,.1)" strokeWidth="7" />
        <circle
          cx="50" cy="50" r={r} fill="none" strokeWidth="7" strokeLinecap="round"
          stroke={urgent ? '#FF6B6B' : '#F5A623'}
          strokeDasharray={c} strokeDashoffset={c * (1 - time / TIMER)}
          style={{ transition: 'stroke-dashoffset 1s linear, stroke .3s' }}
        />
      </svg>
      <span className={cn('font-display text-3xl font-extrabold tabular-nums', urgent ? 'text-alarm' : 'text-white')}>{time}</span>
    </div>
  );
}

export function StatusPill({ phase, paused }) {
  const map = {
    bidding: ['LIVE', 'bg-sold/15 text-sold border-sold/40', true],
    sold: ['SOLD', 'bg-gold/15 text-gold-soft border-gold/50', false],
    unsold: ['UNSOLD', 'bg-alarm/15 text-alarm border-alarm/40', false],
    done: ['COMPLETE', 'bg-volt/15 text-volt-soft border-volt/40', false],
  };
  const [label, cls, dot] = paused ? ['PAUSED', 'bg-white/10 text-white/80 border-white/25', false] : map[phase];
  return (
    <span className={cn('inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-extrabold tracking-wide', cls)}>
      {dot && <span className="live-dot h-2 w-2 rounded-full bg-sold" />}
      {label}
    </span>
  );
}

export function BidNumber({ value, className = '' }) {
  return (
    <div className={cn('relative overflow-hidden', className)} aria-live="polite">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={{ y: 26, opacity: 0, scale: 0.92 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -26, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 420, damping: 28 }}
          className="inline-block font-display font-black tabular-nums leading-none"
        >
          {pts(value)}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

export function PlayerCard({ player, accent = '#F5A623', compact = false, lot }) {
  return (
    <div className="relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-navy-800 to-navy-900">
      <div className={cn('relative grid place-items-center', compact ? 'h-32' : 'h-44')}>
        <PlayerFigure color={accent} className="h-full w-auto" />
        <span className="absolute left-3 top-3 rounded-full border border-gold/40 bg-gold/10 px-2.5 py-0.5 text-[11px] font-bold text-gold-soft">{player.role}</span>
      </div>
      <div className="space-y-2.5 p-4">
        <div>
          <p className="font-display text-2xl font-extrabold uppercase leading-none">{player.name}</p>
          <p className="mt-1 text-xs text-mute">{player.club}</p>
        </div>
        <dl className="grid grid-cols-2 gap-2 text-xs">
          <div className="rounded-lg bg-white/5 p-2"><dt className="text-mute">Batting</dt><dd className="mt-0.5 font-semibold">{player.bat}</dd></div>
          <div className="rounded-lg bg-white/5 p-2"><dt className="text-mute">Bowling</dt><dd className="mt-0.5 font-semibold">{player.bowl}</dd></div>
        </dl>
        {lot && <p className="rounded-lg bg-white/5 px-3 py-2 text-xs text-mute">{lot}</p>}
        <div className="flex items-baseline justify-between rounded-lg border border-white/10 px-3 py-2">
          <span className="text-xs text-mute">Base price</span>
          <span className="font-display text-xl font-extrabold tabular-nums text-gold-soft">{pts(player.base)} <span className="text-xs font-semibold text-mute">pts</span></span>
        </div>
      </div>
    </div>
  );
}

export function SoldStamp({ phase, bidder, price, name }) {
  const show = phase === 'sold' || phase === 'unsold';
  const team = bidder ? teamOf(bidder) : null;
  const sold = phase === 'sold';
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key={phase + name}
          className="absolute inset-0 z-20 grid place-items-center bg-navy-950/70 backdrop-blur-[3px]"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 2.4, rotate: -22, opacity: 0 }}
            animate={{ scale: 1, rotate: -6, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 380, damping: 16 }}
            className={cn('relative rounded-2xl border-4 px-7 py-4 text-center', sold ? 'border-gold text-gold' : 'border-alarm text-alarm')}
          >
            <Gavel className="mx-auto mb-1" size={26} aria-hidden="true" />
            <p className="font-display text-6xl font-black leading-none sm:text-7xl">{sold ? 'SOLD' : 'UNSOLD'}</p>
            <p className="mt-1 text-sm font-bold text-white">
              {sold ? `${team.name} · ${pts(price)} pts` : `${name} returns to the pool`}
            </p>
            {sold && Array.from({ length: 12 }).map((_, i) => (
              <motion.span
                key={i} aria-hidden="true"
                className="absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full bg-gold-soft"
                initial={{ x: 0, y: 0, opacity: 1 }}
                animate={{ x: Math.cos((i / 12) * 6.283) * 120, y: Math.sin((i / 12) * 6.283) * 80, opacity: 0 }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
