import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle, ArrowLeft, Check, Loader2, Send, Trash2, X } from 'lucide-react';
import { SERVICES } from '../data/content';
import { cn, scrollToId, sleep, store } from '../utils/format';
import { PitchContourBg } from './Art.jsx';
import { Field, Heading, Reveal, describe } from './UI.jsx';

export const REQUESTS_KEY = 'criczaar.demo.requests';

const EMPTY = { fullName: '', organization: '', email: '', phone: '', tournament: '', teams: '', date: '', services: [], message: '' };
const todayStr = () => { const d = new Date(); d.setMinutes(d.getMinutes() - d.getTimezoneOffset()); return d.toISOString().slice(0, 10); };

export function validate(v) {
  const e = {};
  if (v.fullName.trim().length < 2) e.fullName = 'Enter your full name.';
  if (v.organization.trim().length < 2) e.organization = 'Enter your club or organization name.';
  if (!v.email.trim()) e.email = 'Enter your email address.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = 'Enter a valid email, like name@example.com.';
  const digits = v.phone.replace(/\D/g, '');
  if (!v.phone.trim()) e.phone = 'Enter a contact number.';
  else if (!/^[+\d\s()-]+$/.test(v.phone.trim()) || digits.length < 7 || digits.length > 15) e.phone = 'Use 7 to 15 digits. Spaces, +, - and brackets are fine.';
  if (v.tournament.trim().length < 2) e.tournament = 'Enter the tournament name.';
  const n = Number(v.teams);
  if (v.teams === '') e.teams = 'Enter how many teams will take part.';
  else if (!Number.isInteger(n) || n < 2 || n > 10) e.teams = 'Enter a whole number from 2 to 10. CRICZAAR supports up to 10 teams per auction.';
  if (!v.date) e.date = 'Choose the expected tournament date.';
  else if (v.date < todayStr()) e.date = 'The date can’t be in the past.';
  if (v.services.length === 0) e.services = 'Select at least one service.';
  if (v.message.length > 1000) e.message = 'Keep your message under 1,000 characters.';
  return e;
}

const ref = () => `CZ-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

export default function RequestForm({ prefill, onClearPrefill }) {
  const [v, setV] = useState(EMPTY);
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | loading | error | success
  const [done, setDone] = useState(null);
  const [saved, setSaved] = useState(() => store.list(REQUESTS_KEY));
  const errors = useMemo(() => validate(v), [v]);
  const show = (k) => (touched[k] || submitted) && errors[k];

  // "Request a Demo" / "Request This Plan" pre-fill a starter message
  useEffect(() => {
    if (!prefill) return;
    const text = prefill.kind === 'plan' ? `I’m interested in the ${prefill.plan} plan.` : 'I’d like to see a demonstration of CRICZAAR.';
    setV((p) => ({ ...p, message: p.message.trim() ? p.message : text }));
    if (status === 'success') setStatus('idle');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefill?.nonce]);

  const set = (k) => (e) => setV((p) => ({ ...p, [k]: e.target.value }));
  const blur = (k) => () => setTouched((t) => ({ ...t, [k]: true }));
  const toggle = (s) => setV((p) => ({ ...p, services: p.services.includes(s) ? p.services.filter((x) => x !== s) : [...p.services, s] }));

  const inputProps = (k, extra = {}) => ({
    id: `req-${k}`, value: v[k], onChange: set(k), onBlur: blur(k), className: 'field',
    'aria-invalid': show(k) ? 'true' : undefined, 'aria-describedby': describe(`req-${k}`, show(k)), ...extra,
  });

  const submit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    const first = Object.keys(errors)[0];
    if (first) {
      document.getElementById(first === 'services' ? 'req-services' : `req-${first}`)?.focus();
      return;
    }
    setStatus('loading');
    await sleep(1500); // simulated network wait; nothing is sent anywhere
    const record = {
      ref: ref(), createdAt: new Date().toISOString(),
      kind: prefill?.kind === 'plan' ? `Plan: ${prefill.plan}` : prefill?.kind === 'demo' ? 'Demo request' : 'General request',
      ...v, teams: Number(v.teams),
    };
    try {
      setSaved(store.add(REQUESTS_KEY, record));
      setDone(record);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const again = () => { setV(EMPTY); setTouched({}); setSubmitted(false); setStatus('idle'); setDone(null); onClearPrefill?.(); };
  const clearSaved = () => { store.clear(REQUESTS_KEY); setSaved([]); };
  const loading = status === 'loading';

  return (
    <section id="request" className="relative overflow-hidden bg-navy-950 py-24 sm:py-32" aria-labelledby="request-title">
      <div className="mesh-vivid pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />
      <PitchContourBg variant="violet" className="pointer-events-none absolute inset-0 h-full w-full opacity-45" />
      <div className="absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-gold/15 blur-3xl" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Heading id="request-title" align="left" title="Request your tournament auction"
            sub="Tell us about your tournament and what you need. Most fields take a few seconds." />
          <Reveal delay={0.15} className="mt-8 space-y-4 text-sm text-mute">
            <p className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"><span className="font-bold text-white">This is a demonstration form.</span> Your request is stored in this browser only. It is not sent to a CRICZAAR administrator.</p>
            {prefill && (
              <p className="inline-flex items-center gap-2 rounded-full border border-gold/50 bg-gold/10 py-1.5 pl-4 pr-1.5 font-semibold text-gold-soft">
                {prefill.kind === 'plan' ? `Interested in: ${prefill.plan}` : 'Demo request'}
                <button type="button" onClick={onClearPrefill} aria-label="Remove this selection" className="grid h-6 w-6 place-items-center rounded-full bg-gold/20 hover:bg-gold/40"><X size={13} aria-hidden="true" /></button>
              </p>
            )}
          </Reveal>
        </div>

        <Reveal>
          <div className="glass relative overflow-hidden rounded-3xl p-6 sm:p-9">
            <AnimatePresence mode="wait">
              {status === 'success' && done ? (
                <motion.div key="ok" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="py-4 text-center" role="status">
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 0.1 }} className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-sold/15 text-sold shadow-[0_0_50px_-8px_#38D39F]">
                    <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <motion.path d="M5 13l4 4L19 7" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.35, duration: 0.5 }} />
                    </svg>
                  </motion.span>
                  <h3 className="h-display mt-5 text-5xl">Request saved</h3>
                  <p className="mt-2 text-mute">Thanks, {done.fullName.split(' ')[0]}. Your reference is <span className="font-bold text-gold-soft">{done.ref}</span>.</p>

                  <dl className="mx-auto mt-7 max-w-md divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/[0.03] text-left text-sm">
                    {[['Tournament', done.tournament], ['Organization', done.organization], ['Teams', done.teams], ['Expected date', done.date], ['Services', done.services.join(', ')]].map(([k, val]) => (
                      <div key={k} className="flex justify-between gap-6 px-4 py-2.5"><dt className="shrink-0 text-mute">{k}</dt><dd className="text-right font-semibold">{val}</dd></div>
                    ))}
                  </dl>

                  <p className="mx-auto mt-5 flex max-w-md items-start gap-2 rounded-xl border border-gold/35 bg-gold/10 px-4 py-3 text-left text-xs text-gold-soft">
                    <AlertTriangle size={15} className="mt-px shrink-0" aria-hidden="true" />
                    Demo mode: this request is saved in your browser’s local storage only. No one at CRICZAAR has received it.
                  </p>

                  <div className="mt-7 flex flex-wrap justify-center gap-3">
                    <button type="button" onClick={again} className="btn btn-gold"><ArrowLeft size={16} aria-hidden="true" />Submit another request</button>
                    <button type="button" onClick={() => scrollToId('home')} className="btn btn-ghost">Back to top</button>
                  </div>

                  {saved.length > 0 && (
                    <details className="mx-auto mt-8 max-w-md text-left">
                      <summary className="cursor-pointer text-sm font-semibold text-mute hover:text-white">Saved demo requests ({saved.length})</summary>
                      <ul className="mt-3 space-y-2 text-xs">
                        {saved.map((r) => (
                          <li key={r.ref} className="flex justify-between gap-3 rounded-lg bg-white/5 px-3 py-2"><span className="truncate font-semibold">{r.tournament}</span><span className="shrink-0 text-mute">{r.ref}</span></li>
                        ))}
                      </ul>
                      <button type="button" onClick={clearSaved} className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-alarm hover:underline"><Trash2 size={13} aria-hidden="true" />Clear saved requests</button>
                    </details>
                  )}
                </motion.div>
              ) : (
                <motion.form key="form" noValidate onSubmit={submit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -10 }} aria-busy={loading}>
                  <p className="mb-6 text-sm text-mute"><span className="text-gold" aria-hidden="true">*</span> marks a required field.</p>

                  {status === 'error' && (
                    <div role="alert" className="mb-6 flex items-start gap-3 rounded-xl border border-alarm/50 bg-alarm/10 px-4 py-3 text-sm">
                      <AlertTriangle size={18} className="mt-0.5 shrink-0 text-alarm" aria-hidden="true" />
                      <p><span className="font-bold text-alarm">Couldn’t save your request.</span> This browser is blocking local storage. Your answers are still here: allow site storage or try another browser, then submit again.</p>
                    </div>
                  )}

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field id="req-fullName" label="Full name" required error={show('fullName')}><input {...inputProps('fullName', { type: 'text', autoComplete: 'name', placeholder: 'Your full name' })} /></Field>
                    <Field id="req-organization" label="Organization / club name" required error={show('organization')}><input {...inputProps('organization', { type: 'text', autoComplete: 'organization', placeholder: 'e.g. your club or association' })} /></Field>
                    <Field id="req-email" label="Email" required error={show('email')}><input {...inputProps('email', { type: 'email', autoComplete: 'email', inputMode: 'email', placeholder: 'name@example.com' })} /></Field>
                    <Field id="req-phone" label="Contact number" required error={show('phone')}><input {...inputProps('phone', { type: 'tel', autoComplete: 'tel', inputMode: 'tel', placeholder: '+00 000 000 0000' })} /></Field>
                    <Field id="req-tournament" label="Tournament name" required error={show('tournament')} className="sm:col-span-2"><input {...inputProps('tournament', { type: 'text', placeholder: 'Name of your tournament' })} /></Field>
                    <Field id="req-teams" label="Number of teams" required error={show('teams')} hint="Between 2 and 10 teams."><input {...inputProps('teams', { type: 'number', min: 2, max: 10, inputMode: 'numeric', placeholder: 'e.g. 8' })} /></Field>
                    <Field id="req-date" label="Expected tournament date" required error={show('date')}><input {...inputProps('date', { type: 'date', min: todayStr() })} /></Field>
                  </div>

                  <fieldset id="req-services" tabIndex={-1} className="mt-6" aria-describedby={describe('req-services', show('services'))} aria-invalid={show('services') ? 'true' : undefined}>
                    <legend className="mb-2.5 text-sm font-semibold">Required services <span className="text-gold" aria-hidden="true">*</span><span className="sr-only"> (required, choose at least one)</span></legend>
                    <div className="flex flex-wrap gap-2.5">
                      {SERVICES.map((s) => {
                        const on = v.services.includes(s);
                        return (
                          <button key={s} type="button" role="checkbox" aria-checked={on} onClick={() => { toggle(s); setTouched((t) => ({ ...t, services: true })); }}
                            className={cn('inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all', on ? 'border-gold bg-gold/15 text-gold-soft' : 'border-white/15 bg-white/[0.04] text-white/80 hover:border-white/35')}>
                            <AnimatePresence initial={false}>{on && <motion.span key="c" initial={{ width: 0, opacity: 0 }} animate={{ width: 14, opacity: 1 }} exit={{ width: 0, opacity: 0 }} className="overflow-hidden"><Check size={14} aria-hidden="true" /></motion.span>}</AnimatePresence>
                            {s}
                          </button>
                        );
                      })}
                    </div>
                    {show('services') && <p id="req-services-err" role="alert" className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-alarm"><AlertTriangle size={14} aria-hidden="true" />{errors.services}</p>}
                  </fieldset>

                  <Field id="req-message" label="Additional message" error={show('message')} className="mt-6" hint={`${v.message.length}/1000`}>
                    <textarea {...inputProps('message', { rows: 4, placeholder: 'Anything else we should know about your tournament or auction?' })} />
                  </Field>

                  <button type="submit" disabled={loading} className="btn btn-gold mt-8 w-full py-4 text-[15px] sm:w-auto sm:min-w-56">
                    {loading ? (<><Loader2 size={18} className="animate-spin" aria-hidden="true" />Saving request…</>) : (<><Send size={17} aria-hidden="true" />Send request</>)}
                  </button>
                  <p className="sr-only" role="status">{loading ? 'Saving your request' : ''}</p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
