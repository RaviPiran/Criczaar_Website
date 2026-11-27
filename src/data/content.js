import {
  Users, Radio, Shield, Gavel, UserPlus, MonitorPlay, Trophy, CalendarDays,
} from 'lucide-react';

/* ───────────────────────── Navigation ───────────────────────── */
export const NAV = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'features', label: 'Features' },
  { id: 'how-it-works', label: 'How It Works' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'contact', label: 'Contact' },
];

/* ─────────── Contact details: leave empty until you have real ones ───────────
   Empty values render as clearly-marked placeholders. Fill in to go live.      */
export const CONTACT = {
  email: '',
  phone: '',
  location: '',
  socials: [
    { name: 'Facebook', url: '' },
    { name: 'Instagram', url: '' },
    { name: 'YouTube', url: '' },
    { name: 'WhatsApp', url: '' },
  ],
};

/* ───────────────────────── Features (all backed by the existing app) ───────── */
export const FEATURES = [
  { id: 'live', icon: Radio, title: 'Real-Time Live Auction', size: 'lg', accent: 'gold',
    desc: 'Bids, countdowns, pauses and hammer calls reach every connected screen the moment they happen, over live sockets.' },
  { id: 'bidding', icon: Gavel, title: 'Intelligent Bidding System', size: 'md', accent: 'volt',
    desc: 'Set the base price, increment, timer and a per-player cap. Purse checks stop a team bidding what it cannot afford, and bonus-point tiers reward big bids.' },
  { id: 'players', icon: Users, title: 'Smart Player Management', size: 'sm', accent: 'volt',
    desc: 'Add players with photo, club, batting and bowling style and a base price. Edit any time, or print the pool as a PDF logbook.' },
  { id: 'teams', icon: Shield, title: 'Team Management', size: 'sm', accent: 'gold',
    desc: 'Up to 10 teams per auction, each with a logo, colour, purse and squad slots. Every team gets its own bidding link and code.' },
  { id: 'register', icon: UserPlus, title: 'Player Registration', size: 'sm', accent: 'volt',
    desc: 'Share one link. Players register with a photo and playing details; you approve or reject, and approved players join the pool.' },
  { id: 'display', icon: MonitorPlay, title: 'Live Auction Display', size: 'sm', accent: 'gold',
    desc: 'A projector screen for the hall and a public spectator page with the live bid feed, progress and every team’s remaining purse.' },
  { id: 'results', icon: Trophy, title: 'Auction Results', size: 'sm', accent: 'volt',
    desc: 'Final squads, top sellers and unsold players in one view, with a downloadable squad card for each team.' },
  { id: 'tournament', icon: CalendarDays, title: 'Tournament Management', size: 'sm', accent: 'gold',
    desc: 'Run several auctions inside one tournament, schedule start times, record retentions and send unsold players through a second round.' },
];

/* ───────────────────────── How it works ───────────────────────── */
export const STEPS = [
  { title: 'Create Your Tournament',
    desc: 'Name it, add a logo, and set the rules once: base price, bid increment, timer, squad size and optional bonus tiers.',
    points: ['Tournament name and logo', 'Room code to share with your teams', 'Bid bonus tiers you define'] },
  { title: 'Register Players',
    desc: 'Add players yourself or send out a registration link. Review each request and approve the ones you want in the pool.',
    points: ['Self-registration with photo', 'Approve or reject in one click', 'Batting and bowling styles captured'] },
  { title: 'Organize Your Auction',
    desc: 'Set up teams and purses, record any retentions, then draw the next player on the wheel and open bidding.',
    points: ['Spin wheel with mystery lots', 'Teams bid from their own link', 'Pause, resume, and a second round for unsold'] },
  { title: 'Build Your Winning Teams',
    desc: 'When the hammer falls on the last lot, every squad, price and unsold player is ready to review and share.',
    points: ['Squads and top sellers', 'Downloadable squad cards', 'Printable player logbook'] },
];

/* ───────────────────────── Counters (facts from the product) ───────────────── */
export const STATS = [
  { value: 10, suffix: '', label: 'teams per auction' },
  { value: 30, suffix: 's', label: 'default bid timer' },
  { value: 11, suffix: '', label: 'default squad slots' },
  { value: 4, suffix: '', label: 'live screens: auctioneer, team, projector, spectator' },
];

/* ───────────────────────── Pricing (PLACEHOLDERS) ───────────────────────────
   Edit freely: names, price text, note and items are all configurable here.
   `tbc: true` marks a line that is a placeholder and not yet a committed offer. */
export const PRICING_NOTE = 'Placeholder pricing. Plan names, limits and prices are not final and no package is officially on sale yet.';
export const PLANS = [
  { id: 'starter', name: 'Starter', blurb: 'For a single club auction.',
    price: 'XXX', unit: 'per tournament', featured: false,
    items: [
      { t: 'One tournament auction' },
      { t: 'Up to X teams', tbc: true },
      { t: 'Player registration link' },
      { t: 'Public live spectator page' },
      { t: 'Results and squad cards' },
    ] },
  { id: 'professional', name: 'Professional', blurb: 'For leagues that want the full stage.',
    price: 'XXX', unit: 'per tournament', featured: true,
    items: [
      { t: 'Everything in Starter' },
      { t: 'Up to X teams and X auctions', tbc: true },
      { t: 'Private team bidding links and codes' },
      { t: 'Projector display screen' },
      { t: 'Retentions and second round' },
      { t: 'Player logbook PDF' },
    ] },
  { id: 'enterprise', name: 'Enterprise', blurb: 'For associations running many events.',
    price: 'Custom', unit: 'talk to us', featured: false,
    items: [
      { t: 'Everything in Professional' },
      { t: 'Multiple tournaments' },
      { t: 'Onboarding and training', tbc: true },
      { t: 'Custom branding', tbc: true },
      { t: 'Priority support', tbc: true },
    ] },
];

/* ───────────────────────── Request form options ───────────────────────── */
export const SERVICES = [
  'Auction setup and configuration',
  'Live auction hosting support',
  'Projector / big-screen display',
  'Player registration link',
  'Team bidding links',
  'Results and squad cards',
  'Player logbook (PDF)',
  'Training and onboarding',
];

/* ───────────────────────── Demonstration auction data (fictional) ──────────── */
export const DEMO_TEAMS = [
  { id: 't1', name: 'Harbour Hawks', short: 'HH', color: '#4D8DFF' },
  { id: 't2', name: 'Royal Strikers', short: 'RS', color: '#F5A623' },
  { id: 't3', name: 'Northern Titans', short: 'NT', color: '#38D39F' },
  { id: 't4', name: 'Gale Force XI', short: 'GF', color: '#B58CFF' },
];
export const DEMO_PURSE = 30;
export const DEMO_PLAYERS = [
  { name: 'Kavin Dias', role: 'All-rounder', bat: 'Right-hand Bat', bowl: 'Right-arm Medium', club: 'Harbour CC', base: 2.0, worth: 9 },
  { name: 'Rohan Varma', role: 'Batsman', bat: 'Left-hand Bat', bowl: 'N/A', club: 'Lakeside CC', base: 1.5, worth: 7 },
  { name: 'Imran Sheikh', role: 'Bowler', bat: 'Right-hand Bat', bowl: 'Right-arm Fast', club: 'Northgate CC', base: 1.5, worth: 8 },
  { name: 'Dilan Fernando', role: 'Wicket-keeper', bat: 'Right-hand Bat', bowl: 'N/A', club: 'Coastal CC', base: 1.0, worth: 5.5 },
  { name: 'Arjun Nair', role: 'Bowler', bat: 'Left-hand Bat', bowl: 'Left-arm Orthodox', club: 'Hillview CC', base: 1.0, worth: 0 },
];
