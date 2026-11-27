import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Pause, Play, RotateCcw, Gavel, Trophy } from 'lucide-react';
import { useAuctionSim } from '../hooks/useAuctionSim';
import { BidNumber, PlayerCard, SoldStamp, StatusPill, TimerRing, teamOf } from './AuctionParts.jsx';
import { DEMO_TEAMS, DEMO_PLAYERS, DEMO_PURSE } from '../data/content';
import { cn, pts } from '../utils/format';
import { PitchContourBg } from './Art.jsx';
import { Heading, Reveal } from './UI.jsx';

export default function LiveAuction() {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.15 });
  const sim = useAuctionSim({ active: inView, loop: false });
  const { s, player, next } = sim;
  const leader = s.bidder ? teamOf(s.bidder) : null;
  const total = DEMO_PLAYERS.length;
  const progress = ((s.phase === 'done' ? total : s.idx + (s.phase === 'bidding' ? 0 : 1)) / total) * 100;
  const done = s.phase === 'done';

  return (
    <section id="live-auction" className="relative overflow-hidden bg-navy-900 py-24 sm:py-32" aria-labelledby="live-title">
      <div className="mesh-vivid pointer-events-none absolute inset-0 opacity-80" aria-hidden="true" />
      <PitchContourBg variant="cyan" className="pointer-events-none absolute inset-0 h-full w-full opacity-45" />
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-70" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Heading id="live-title" title={<>Sit in the <span className="text-gold-grad">auctioneer’s chair</span></>} align="left"
          sub="This is a working demonstration of the auction screen. Tap a team to place its bid and watch the timer, purse and hammer respond. Sample players and teams are fictional." />

        <Reveal className="mt-12">
          <div ref={ref} className="glass relative overflow-hidden rounded-3xl">
            <div className="relative z-40 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-navy-900 px-5 py-3">
              <div className="flex items-center gap-3">
                <StatusPill phase={s.phase} paused={s.paused} />
                <span className="rounded-full border border-white/15 px-2.5 py-0.5 text-xs font-bold text-mute">Demonstration</span>
              </div>
              <div className="flex items-center gap-2">
                <button type="button" onClick={sim.pause} disabled={done} className="btn btn-ghost whitespace-nowrap !px-3.5 !py-2 text-xs sm:!px-4" aria-pressed={s.paused}>
                  {s.paused ? <Play size={14} className="shrink-0" aria-hidden="true" /> : <Pause size={14} className="shrink-0" aria-hidden="true" />}{s.paused ? 'Resume' : 'Pause'}
                </button>
                <button type="button" onClick={sim.hammer} disabled={s.phase !== 'bidding' || s.paused} className="btn btn-ghost whitespace-nowrap !px-3.5 !py-2 text-xs sm:!px-4">
                  <Gavel size={14} className="shrink-0" aria-hidden="true" />Hammer now
                </button>
                <button type="button" onClick={sim.reset} className="btn btn-ghost whitespace-nowrap !px-3.5 !py-2 text-xs sm:!px-4">
                  <RotateCcw size={14} className="shrink-0" aria-hidden="true" />Restart
                </button>
              </div>
            </div>

            <div className="grid gap-6 p-5 lg:grid-cols-[300px_1fr_340px] lg:p-6">
              <PlayerCard player={player} accent={leader?.color || '#F5A623'} lot={`Lot ${Math.min(s.idx + 1, total)} of ${total} · ${s.bids} ${s.bids === 1 ? 'bid' : 'bids'} so far`} />

              {/* bid stage */}
              <div className="flex flex-col justify-between gap-5">
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-gold/10 via-navy-950/40 to-volt/10 p-6 text-center">
                  <div className="mb-3 flex justify-center sm:absolute sm:right-4 sm:top-4 sm:mb-0"><TimerRing time={s.time} size={92} /></div>
                  <p className="text-sm font-semibold text-mute">Current highest bid</p>
                  <div className="my-3 flex items-baseline justify-center gap-2">
                    <BidNumber value={s.bid} className="text-[6.5rem] text-gold-grad sm:text-[8rem]" />
                    <span className="text-lg font-bold text-mute">pts</span>
                  </div>
                  <p className="min-h-6 text-base">
                    {leader
                      ? <span className="font-bold" style={{ color: leader.color }}>{leader.name} is holding the bid</span>
                      : <span className="text-mute">No bids yet. Base price is {pts(player.base)} pts.</span>}
                  </p>
                  <p className="mt-1 text-xs text-mute">Next bid: <span className="font-bold tabular-nums text-white">{pts(next)} pts</span></p>
                </div>

                <div>
                  <div className="mb-1.5 flex justify-between text-xs text-mute">
                    <span>Auction progress</span>
                    <span className="tabular-nums">{s.sold} sold · {s.unsold} unsold · {total} lots</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/10">
                    <motion.div className="h-full rounded-full bg-gradient-to-r from-gold to-volt" animate={{ width: `${progress}%` }} transition={{ duration: 0.6 }} />
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/20 p-3" aria-live="polite" aria-label="Live feed">
                  <p className="mb-1.5 px-1 text-xs font-bold">Live feed</p>
                  <ul className="space-y-1 text-xs">
                    {s.log.slice(0, 4).map((l, i) => (
                      <li key={l.id} className={cn('truncate rounded-md px-2 py-1', i === 0 ? 'bg-white/10 text-white' : 'text-mute',
                        l.type === 'sold' && i === 0 && 'text-gold-soft', l.type === 'unsold' && i === 0 && 'text-alarm')}>{l.text}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* teams */}
              <div className="space-y-3">
                <p className="text-sm font-bold">Teams <span className="font-medium text-mute">· tap to bid {pts(next)} pts</span></p>
                {DEMO_TEAMS.map((t) => {
                  const lead = s.bidder === t.id;
                  const broke = s.purses[t.id] < next;
                  const off = s.phase !== 'bidding' || s.paused || lead || broke;
                  return (
                    <button
                      key={t.id} type="button" disabled={off} onClick={() => sim.bid(t.id)}
                      className={cn('group relative w-full overflow-hidden rounded-2xl border p-3.5 text-left transition-all',
                        lead ? 'border-white/50 bg-white/10' : 'border-white/10 bg-white/[0.04] enabled:hover:-translate-y-0.5 enabled:hover:border-white/30 enabled:hover:bg-white/[0.08]',
                        'disabled:cursor-not-allowed', !lead && off && 'opacity-60')}
                      style={lead ? { boxShadow: `0 0 28px -6px ${t.color}` } : undefined}
                      aria-label={`${t.name}: ${lead ? 'holding the bid' : broke ? 'not enough purse' : `bid ${pts(next)} points`}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl font-display text-lg font-black text-navy-950" style={{ background: t.color }}>{t.short}</span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-bold">{t.name}</p>
                          <p className="text-[11px] tabular-nums text-mute">{pts(s.purses[t.id])} pts left · {s.squads[t.id].length} signed</p>
                        </div>
                        <span className={cn('rounded-full px-3 py-1 text-xs font-extrabold', lead ? 'bg-white text-navy-950' : broke ? 'bg-white/10 text-mute' : 'bg-gold text-navy-950')}>
                          {lead ? 'Holding' : broke ? 'No purse' : 'Bid'}
                        </span>
                      </div>
                      <div className="mt-2.5 h-1 overflow-hidden rounded-full bg-white/10">
                        <div className="h-full rounded-full transition-[width] duration-700" style={{ width: `${(s.purses[t.id] / DEMO_PURSE) * 100}%`, background: t.color }} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <SoldStamp phase={s.phase} bidder={s.bidder} price={s.bid} name={player.name} />

            {done && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 z-30 overflow-y-auto bg-navy-950/90 p-6 backdrop-blur-md sm:grid sm:place-items-center">
                <div className="mx-auto w-full max-w-3xl text-center">
                  <Trophy className="mx-auto text-gold" size={36} aria-hidden="true" />
                  <h3 className="h-display mt-2 text-5xl">Auction complete</h3>
                  <p className="mt-2 text-sm text-mute">{s.sold} sold, {s.unsold} unsold. Here are the final squads.</p>
                  <div className="mt-6 grid gap-3 text-left sm:grid-cols-2">
                    {DEMO_TEAMS.map((t) => (
                      <div key={t.id} className="rounded-xl border border-white/10 bg-white/5 p-3">
                        <p className="text-sm font-bold" style={{ color: t.color }}>{t.name}</p>
                        <ul className="mt-1 text-xs text-mute">
                          {s.squads[t.id].length === 0 && <li>No players signed</li>}
                          {s.squads[t.id].map((p) => <li key={p.name} className="flex justify-between"><span>{p.name}</span><span className="tabular-nums text-white">{pts(p.price)} pts</span></li>)}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <button type="button" onClick={sim.reset} className="btn btn-gold mt-6"><RotateCcw size={16} aria-hidden="true" />Run the demo again</button>
                </div>
              </motion.div>
            )}
          </div>
        </Reveal>
        <p className="mt-4 text-center text-xs text-mute">Demonstration only. Names, teams and prices are fictional sample data. Points are the auction currency used inside CRICZAAR.</p>
      </div>
    </section>
  );
}
