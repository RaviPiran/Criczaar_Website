import React from 'react';
import { CONTACT, FEATURES, NAV } from '../data/content';
import { SocialIcon } from './Art.jsx';

export default function Footer({ onNav, onDemo }) {
  const go = (id) => (e) => { e.preventDefault(); onNav(id); };
  const link = 'text-sm text-mute transition-colors hover:text-gold-soft';
  return (
    <footer className="relative border-t border-white/10 bg-navy-950 pt-16" aria-label="Footer">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1.2fr_1fr]">
        <div>
          <img src="/logo.png" alt="CRICZAAR cricket auction app" width="900" height="753" loading="lazy" className="w-44" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-mute">Live cricket auctions with player management, real-time bidding and tournament results in one place.</p>
          <ul className="mt-5 flex gap-2.5">
            {CONTACT.socials.map((s) => (
              <li key={s.name}>
                <a href={s.url || '#contact'} onClick={s.url ? undefined : go('contact')} aria-label={s.url ? s.name : `${s.name} (not added yet)`} target={s.url ? '_blank' : undefined} rel="noopener noreferrer"
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-mute transition-colors hover:border-gold hover:text-gold"><SocialIcon name={s.name} size={16} /></a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Footer navigation">
          <h2 className="mb-4 text-sm font-bold">Explore</h2>
          <ul className="space-y-2.5">
            {NAV.map((n) => <li key={n.id}><a href={`#${n.id}`} onClick={go(n.id)} className={link}>{n.label}</a></li>)}
            <li><a href="#live-auction" onClick={go('live-auction')} className={link}>Live demo</a></li>
          </ul>
        </nav>

        <nav aria-label="Feature links">
          <h2 className="mb-4 text-sm font-bold">Features</h2>
          <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 md:grid-cols-1">
            {FEATURES.map((f) => <li key={f.id}><a href="#features" onClick={go('features')} className={link}>{f.title}</a></li>)}
          </ul>
        </nav>

        <nav aria-label="Contact links">
          <h2 className="mb-4 text-sm font-bold">Contact</h2>
          <ul className="space-y-2.5">
            <li><a href="#contact" onClick={go('contact')} className={link}>{CONTACT.email || 'Email (not added yet)'}</a></li>
            <li><a href="#contact" onClick={go('contact')} className={link}>{CONTACT.phone || 'Phone (not added yet)'}</a></li>
            <li><a href="#request" onClick={(e) => { e.preventDefault(); onDemo(); }} className={link}>Request a demo</a></li>
            <li><a href="#request" onClick={go('request')} className={link}>Submit a tournament request</a></li>
          </ul>
        </nav>
      </div>
      <div className="mx-auto mt-14 flex max-w-7xl flex-col items-center justify-between gap-2 border-t border-white/10 px-5 py-6 text-xs text-mute sm:flex-row sm:px-8">
        <p>© {new Date().getFullYear()} CRICZAAR. All rights reserved.</p>
        <p>Auction demo data on this site is fictional.</p>
      </div>
    </footer>
  );
}
