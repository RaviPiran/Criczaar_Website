import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle, CheckCircle2, Loader2, Mail, MapPin, Phone, Send } from 'lucide-react';
import { CONTACT } from '../data/content';
import { PitchContourBg, SocialIcon } from './Art.jsx';
import { sleep, store } from '../utils/format';
import { Field, Heading, Reveal, describe } from './UI.jsx';

const KEY = 'criczaar.demo.messages';
const E0 = { name: '', email: '', message: '' };

function validate(v) {
  const e = {};
  if (v.name.trim().length < 2) e.name = 'Enter your name.';
  if (!v.email.trim()) e.email = 'Enter your email address.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = 'Enter a valid email, like name@example.com.';
  if (v.message.trim().length < 10) e.message = 'Write at least 10 characters so we know how to help.';
  return e;
}

function Detail({ icon: I, label, value, href }) {
  return (
    <li className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gold/10 text-gold"><I size={19} aria-hidden="true" /></span>
      <div className="min-w-0">
        <p className="text-xs text-mute">{label}</p>
        {value
          ? <a href={href} className="block truncate text-[15px] font-semibold hover:text-gold-soft">{value}</a>
          : <p className="text-[15px] font-semibold text-white/60">Not added yet <span className="ml-1 rounded border border-dashed border-white/25 px-1.5 py-px text-[10px] font-bold text-mute">Placeholder</span></p>}
      </div>
    </li>
  );
}

export default function Contact() {
  const [v, setV] = useState(E0);
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState('idle');
  const errors = validate(v);
  const show = (k) => (touched[k] || submitted) && errors[k];
  const props = (k, extra = {}) => ({
    id: `contact-${k}`, value: v[k], className: 'field',
    onChange: (e) => setV((p) => ({ ...p, [k]: e.target.value })), onBlur: () => setTouched((t) => ({ ...t, [k]: true })),
    'aria-invalid': show(k) ? 'true' : undefined, 'aria-describedby': describe(`contact-${k}`, show(k)), ...extra,
  });

  const submit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    const first = Object.keys(errors)[0];
    if (first) { document.getElementById(`contact-${first}`)?.focus(); return; }
    setStatus('loading');
    await sleep(1100);
    try { store.add(KEY, { createdAt: new Date().toISOString(), ...v }); setStatus('success'); } catch { setStatus('error'); }
  };
  const reset = () => { setV(E0); setTouched({}); setSubmitted(false); setStatus('idle'); };

  return (
    <section id="contact" className="relative flex min-h-[calc(100svh-4.5rem)] items-center overflow-hidden bg-navy-900 py-10 sm:py-12" aria-labelledby="contact-title">
      <div className="mesh-vivid pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <PitchContourBg variant="gold" className="pointer-events-none absolute inset-0 h-full w-full opacity-40" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-volt/50 to-transparent" aria-hidden="true" />
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <div>
          <Heading id="contact-title" align="left" title="Talk to the CRICZAAR team" sub="Questions before you book a demo? Send a note and we will point you in the right direction." />
          <Reveal delay={0.1}>
            <ul className="mt-9 space-y-3">
              <Detail icon={Mail} label="Email" value={CONTACT.email} href={`mailto:${CONTACT.email}`} />
              <Detail icon={Phone} label="Phone" value={CONTACT.phone} href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} />
              <Detail icon={MapPin} label="Location" value={CONTACT.location} href="#contact" />
            </ul>
            <p className="mb-3 mt-8 text-sm font-semibold">Follow CRICZAAR</p>
            <ul className="flex flex-wrap gap-3">
              {CONTACT.socials.map((s) => (
                <li key={s.name}>
                  <a href={s.url || undefined} aria-label={s.url ? s.name : `${s.name} (link not added yet)`} aria-disabled={!s.url} target={s.url ? '_blank' : undefined} rel="noopener noreferrer"
                    onClick={(e) => { if (!s.url) e.preventDefault(); }} title={s.url ? s.name : `${s.name}: placeholder`}
                    className={`grid h-12 w-12 place-items-center rounded-full border transition-all ${s.url ? 'border-white/20 bg-white/5 hover:-translate-y-1 hover:border-gold hover:text-gold' : 'cursor-not-allowed border-dashed border-white/20 text-mute'}`}>
                    <SocialIcon name={s.name} />
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-mute">Dashed icons are placeholders until real links are added.</p>
          </Reveal>
        </div>

        <Reveal>
          <div className="glass rounded-3xl p-6 sm:p-9">
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div key="ok" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="py-10 text-center" role="status">
                  <CheckCircle2 size={52} className="mx-auto text-sold" aria-hidden="true" />
                  <h3 className="h-display mt-4 text-4xl">Message saved</h3>
                  <p className="mx-auto mt-2 max-w-xs text-sm text-mute">Demo mode: your message is stored in this browser only and has not been sent to anyone.</p>
                  <button type="button" onClick={reset} className="btn btn-ghost mt-6">Write another message</button>
                </motion.div>
              ) : (
                <motion.form key="f" noValidate onSubmit={submit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-5">
                  <h3 className="font-display text-3xl font-extrabold uppercase">Send a message</h3>
                  {status === 'error' && (
                    <div role="alert" className="flex items-start gap-3 rounded-xl border border-alarm/50 bg-alarm/10 px-4 py-3 text-sm"><AlertTriangle size={18} className="mt-0.5 shrink-0 text-alarm" aria-hidden="true" /><p><span className="font-bold text-alarm">Couldn’t save your message.</span> Browser storage is blocked. Your text is still here, so try again after allowing storage.</p></div>
                  )}
                  <Field id="contact-name" label="Name" required error={show('name')}><input {...props('name', { type: 'text', autoComplete: 'name', placeholder: 'Your name' })} /></Field>
                  <Field id="contact-email" label="Email" required error={show('email')}><input {...props('email', { type: 'email', autoComplete: 'email', placeholder: 'name@example.com' })} /></Field>
                  <Field id="contact-message" label="Message" required error={show('message')}><textarea {...props('message', { rows: 5, placeholder: 'How can we help?' })} /></Field>
                  <button type="submit" disabled={status === 'loading'} className="btn btn-gold w-full py-3.5">
                    {status === 'loading' ? (<><Loader2 size={18} className="animate-spin" aria-hidden="true" />Sending…</>) : (<><Send size={16} aria-hidden="true" />Send message</>)}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
