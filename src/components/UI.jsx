import React, { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView, useReducedMotion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { cn } from '../utils/format';

export function Reveal({ children, className, delay = 0, y = 24, as = 'div' }) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}

/* Section heading: headline wipes in from a masked line. */
export function Heading({ id, title, sub, align = 'center', className }) {
  return (
    <div className={cn('max-w-3xl', align === 'center' ? 'mx-auto text-center' : 'text-left', className)}>
      <motion.div
        className="overflow-hidden pb-1"
        initial="hidden" whileInView="show"
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      >
        <motion.h2
          id={id}
          className="h-display text-[clamp(2.2rem,4.6vw,3.8rem)]"
          variants={{ hidden: { y: '105%' }, show: { y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } }}
        >
          {title}
        </motion.h2>
      </motion.div>
      {sub && (
        <Reveal delay={0.12}>
          <p className="mt-3 text-sm leading-relaxed text-mute sm:text-base">{sub}</p>
        </Reveal>
      )}
    </div>
  );
}

export function Counter({ value, suffix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return undefined;
    if (reduce) { setN(value); return undefined; }
    const c = animate(0, value, { duration: 1.6, ease: 'easeOut', onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, reduce, value]);
  return <span ref={ref} className="tabular-nums">{n}{suffix}</span>;
}

/* Accessible form field wrapper */
export function Field({ id, label, required, error, hint, children, className }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 flex items-center gap-1 text-sm font-semibold">
        {label}
        {required ? (<><span className="text-gold" aria-hidden="true">*</span><span className="sr-only"> (required)</span></>) : <span className="text-xs font-medium text-mute">(optional)</span>}
      </label>
      {children}
      {hint && !error && <p id={`${id}-hint`} className="mt-1.5 text-xs text-mute">{hint}</p>}
      {error && (
        <p id={`${id}-err`} role="alert" className="mt-1.5 flex items-start gap-1.5 text-xs font-semibold text-alarm">
          <AlertCircle size={14} className="mt-px shrink-0" aria-hidden="true" />{error}
        </p>
      )}
    </div>
  );
}

export const describe = (id, error, hint) => (error ? `${id}-err` : hint ? `${id}-hint` : undefined);
