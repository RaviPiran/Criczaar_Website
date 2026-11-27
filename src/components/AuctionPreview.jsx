import React, { useRef } from 'react';
import { useInView } from 'framer-motion';
import { useAuctionSim } from '../hooks/useAuctionSim';
import { BidNumber, PlayerCard, SoldStamp, StatusPill, TimerRing, teamOf } from './AuctionParts.jsx';
import { DEMO_TEAMS, DEMO_PLAYERS, DEMO_PURSE } from '../data/content';
import { cn, pts } from '../utils/format';

/* Hero dashboard preview: autoplays and loops while visible. */
export default function AuctionPreview() {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.25 });
  const { s, player } = useAuctionSim({ active: inView, loop: true });
  const leader = s.bidder ? teamOf(s.bidder) : null;
  const lastLog = s.log[0];

  return (
    <div ref={ref} className="glass relative overflow-hidden rounded-3xl" role="img" aria-label="Animated demonstration of the CRICZAAR live auction screen">
      {/* window bar */}
      <div className="flex items-center justify-between border-b border-white/10 bg-black/20 px-4 py-2.5">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF6B6B]" /><span className="h-2.5 w-2.5 rounded-full bg-gold" /><span className="h-2.5 w-2.5 rounded-full bg-sold" />
        </div>
        <p className="truncate text-xs font-semibold text-mute"><span className="sm:hidden">Demonstration</span><span className="hidden sm:inline">Auction console · demonstration data</span></p>
        <StatusPill phase={s.phase} paused={false} />
      </div>

      <div className="relative grid gap-4 p-4 sm:grid-cols-[0.9fr_1.1fr] sm:p-5">
        <PlayerCard player={player} compact accent={leader?.color || '#F5A623'} />

        <div className="flex min-w-0 flex-col justify-between gap-4">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-gold/10 via-transparent to-volt/10 p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs font-semibold text-mute">Current highest bid</p>
                <div className="mt-1 flex items-baseline gap-2">
                  <BidNumber value={s.bid} className="text-[4.2rem] text-gold-grad sm:text-[5rem]" />
                  <span className="text-sm font-bold text-mute">pts</span>
                </div>
                <p className="mt-2 text-sm">
                  {leader ? <span className="font-bold" style={{ color: leader.color }}>{leader.name} holding bid</span> : <span className="text-mute">No bids yet</span>}
                </p>
              </div>
              <TimerRing time={s.time} />
            </div>
          </div>

          <ul className="grid grid-cols-2 gap-2" aria-label="Teams and remaining purse">
            {DEMO_TEAMS.map((t) => (
              <li key={t.id} className={cn('rounded-xl border bg-white/[0.04] p-2.5 transition-colors', s.bidder === t.id ? 'border-white/40' : 'border-white/10')}>
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: t.color }} aria-hidden="true" />
                  <span className="text-xs font-bold leading-tight">{t.name}</span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full rounded-full transition-[width] duration-700" style={{ width: `${(s.purses[t.id] / DEMO_PURSE) * 100}%`, background: t.color }} />
                </div>
                <p className="mt-1 text-[11px] tabular-nums text-mute">{pts(s.purses[t.id])} pts · {s.squads[t.id].length} signed</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-white/10 bg-black/20 px-4 py-2.5 text-xs">
        <p className="min-w-0 truncate text-mute"><span className="font-bold text-white">Feed</span> · {lastLog.text}</p>
        <p className="shrink-0 tabular-nums text-mute">Lot {Math.min(s.idx + 1, DEMO_PLAYERS.length)}/{DEMO_PLAYERS.length}</p>
      </div>

      <SoldStamp phase={s.phase} bidder={s.bidder} price={s.bid} name={player.name} />
    </div>
  );
}
