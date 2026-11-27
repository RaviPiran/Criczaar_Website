# CRICZAAR – Customer Website

Public marketing and customer-acquisition site for CRICZAAR. Frontend only: no backend, database, auth or payments.
It is a **separate app** and does not touch the existing auction project (`criczaar/frontend`, `criczaar/backend`).

## Run locally
```bash
cd criczaar-website
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
npm run preview    # serve the production build
```
Needs Node 18+. Fonts (Big Shoulders Display, Manrope) are bundled via Fontsource, so no internet is needed at runtime.

## Stack (versions follow your existing project where it has them)
React 18.3, Tailwind CSS 3.4, framer-motion 14, lucide-react 1.x, Vite 5. No router: it is a single scrolling page with scroll-spy navigation.

## Where to edit
| What | File |
|---|---|
| Contact email / phone / location / social links | `src/data/content.js` → `CONTACT` (empty = shown as placeholder) |
| Pricing names, price text, plan items, placeholder note | `src/data/content.js` → `PLANS`, `PRICING_NOTE` |
| Feature copy, how-it-works steps, counters | `src/data/content.js` → `FEATURES`, `STEPS`, `STATS` |
| Request-form service options | `src/data/content.js` → `SERVICES` |
| Demo auction players / teams (fictional) | `src/data/content.js` → `DEMO_PLAYERS`, `DEMO_TEAMS` |
| Colours / fonts | `tailwind.config.js`, `src/main.jsx` |

## Structure
```
src/
  App.jsx                 page composition, loader, shared "request" prefill state
  data/content.js         all copy and configurable data
  hooks/useAuctionSim.js  simulated auction engine (timer, rival bidders, hammer)
  utils/format.js         helpers, smooth-scroll, localStorage wrapper
  components/             Navbar, Hero, About, Features, HowItWorks, LiveAuction,
                          Pricing, RequestForm, Contact, Footer, Loader,
                          AuctionPreview + AuctionParts (shared demo UI), Art (SVGs), UI (helpers)
public/logo*.png          your existing logo, cropped to its artwork and downsized (artwork unchanged)
```

## Demo behaviour (important)
- Request and contact forms validate, show loading/success/error states, and save to `localStorage` only
  (`criczaar.demo.requests`, `criczaar.demo.messages`). **Nothing is sent to anyone.** To go live, replace the
  `store.add(...)` call in `RequestForm.jsx` / `Contact.jsx` with a real submit.
- Pricing is placeholder (`XXX`, `TBC` tags). Contact details and social links are placeholders until filled in.
- The live auction preview uses fictional players and teams and is clearly labelled as a demonstration.
- Feature copy only describes behaviour found in the existing code (spin wheel, bid rules and bonus tiers, retentions,
  round 2, player self-registration with approval, team bidding links, projector and spectator screens, results,
  squad cards, PDF logbook, up to 10 teams per auction).
