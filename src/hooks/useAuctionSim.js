import { useCallback, useEffect, useReducer, useRef } from 'react';
import { DEMO_PLAYERS as P, DEMO_TEAMS as T, DEMO_PURSE } from '../data/content';

export const TIMER = 12;
export const INC = 0.5;
const r1 = (n) => Math.round(n * 10) / 10;

const freshPurses = () => Object.fromEntries(T.map((t) => [t.id, DEMO_PURSE]));
const freshSquads = () => Object.fromEntries(T.map((t) => [t.id, []]));

const initial = () => ({
  idx: 0, phase: 'bidding', paused: false,
  bid: P[0].base, bidder: null, bids: 0, time: TIMER,
  purses: freshPurses(), squads: freshSquads(),
  sold: 0, unsold: 0, log: [{ id: 0, type: 'info', text: `${P[0].name} is up. Base price ${P[0].base.toFixed(1)} pts.` }],
  seq: 1,
});

export const nextBidOf = (s) => (s.bidder ? r1(s.bid + INC) : P[s.idx].base);

const push = (s, type, text) => ({ ...s, seq: s.seq + 1, log: [{ id: s.seq, type, text }, ...s.log].slice(0, 6) });

function hammer(s) {
  if (s.bidder) {
    const t = T.find((x) => x.id === s.bidder);
    const next = {
      ...s, phase: 'sold', sold: s.sold + 1,
      purses: { ...s.purses, [s.bidder]: r1(s.purses[s.bidder] - s.bid) },
      squads: { ...s.squads, [s.bidder]: [...s.squads[s.bidder], { name: P[s.idx].name, price: s.bid }] },
    };
    return push(next, 'sold', `SOLD: ${P[s.idx].name} to ${t.name} for ${s.bid.toFixed(1)} pts.`);
  }
  return push({ ...s, phase: 'unsold', unsold: s.unsold + 1 }, 'unsold', `UNSOLD: no bids for ${P[s.idx].name}.`);
}

function reducer(s, a) {
  switch (a.type) {
    case 'TICK': {
      if (s.paused || s.phase !== 'bidding') return s;
      return s.time > 1 ? { ...s, time: s.time - 1 } : hammer({ ...s, time: 0 });
    }
    case 'HAMMER': return s.phase === 'bidding' && !s.paused ? hammer({ ...s, time: 0 }) : s;
    case 'BID': {
      if (s.phase !== 'bidding' || s.paused || s.bidder === a.teamId) return s;
      const amount = nextBidOf(s);
      if (s.purses[a.teamId] < amount) return s;
      const t = T.find((x) => x.id === a.teamId);
      return push({ ...s, bid: amount, bidder: a.teamId, bids: s.bids + 1, time: Math.max(s.time, 8) }, 'bid', `${t.name} bids ${amount.toFixed(1)} pts.`);
    }
    case 'NEXT': {
      if (s.idx + 1 >= P.length) return { ...s, phase: 'done' };
      const n = P[s.idx + 1];
      return push({ ...s, idx: s.idx + 1, phase: 'bidding', bid: n.base, bidder: null, bids: 0, time: TIMER }, 'info', `${n.name} is up. Base price ${n.base.toFixed(1)} pts.`);
    }
    case 'PAUSE': return { ...s, paused: !s.paused };
    case 'RESET': return initial();
    default: return s;
  }
}

/* Simulated auction. Runs only while `active`, so off-screen demos cost nothing. */
export function useAuctionSim({ active = true, loop = false } = {}) {
  const [s, dispatch] = useReducer(reducer, undefined, initial);
  const ref = useRef(s);
  ref.current = s;
  const running = active && !s.paused;

  // countdown
  useEffect(() => {
    if (!running || s.phase !== 'bidding') return undefined;
    const id = setInterval(() => dispatch({ type: 'TICK' }), 1000);
    return () => clearInterval(id);
  }, [running, s.phase]);

  // simulated rival bidders
  useEffect(() => {
    if (!running || s.phase !== 'bidding') return undefined;
    const id = setTimeout(() => {
      const c = ref.current;
      const worth = P[c.idx].worth;
      const amount = nextBidOf(c);
      if (c.phase !== 'bidding' || amount > worth) return;
      const pool = T.filter((t) => t.id !== c.bidder && c.purses[t.id] >= amount);
      if (!pool.length) return;
      dispatch({ type: 'BID', teamId: pool[Math.floor(Math.random() * pool.length)].id });
    }, 1300 + Math.random() * 1700);
    return () => clearTimeout(id);
  }, [running, s.phase, s.bid, s.idx]);

  // move on after SOLD / UNSOLD, loop after the last lot
  useEffect(() => {
    if (!running) return undefined;
    if (s.phase === 'sold' || s.phase === 'unsold') {
      const id = setTimeout(() => dispatch({ type: 'NEXT' }), 2600);
      return () => clearTimeout(id);
    }
    if (s.phase === 'done' && loop) {
      const id = setTimeout(() => dispatch({ type: 'RESET' }), 3800);
      return () => clearTimeout(id);
    }
    return undefined;
  }, [running, s.phase, loop]);

  return {
    s,
    player: P[Math.min(s.idx, P.length - 1)],
    next: nextBidOf(s),
    bid: useCallback((teamId) => dispatch({ type: 'BID', teamId }), []),
    hammer: useCallback(() => dispatch({ type: 'HAMMER' }), []),
    pause: useCallback(() => dispatch({ type: 'PAUSE' }), []),
    reset: useCallback(() => dispatch({ type: 'RESET' }), []),
  };
}
