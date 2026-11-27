import React, { useRef } from 'react';
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowDown, Gavel } from 'lucide-react';
import AuctionPreview from './AuctionPreview.jsx';
import { AuctionGavelVector, Bat, CricketBall, Ground, StadiumBackdrop, Stumps } from './Art.jsx';

const LINES = ['THE FUTURE OF', 'CRICKET AUCTIONS', 'STARTS HERE.'];

export default function Hero({ onExplore, onDemo }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const yBall = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const yStumps = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const yGround = useTransform(scrollYProgress, [0, 1], [0, 120]);

  // pointer tilt for the dashboard (fine pointers only)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 120, damping: 20 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 120, damping: 20 });
  const onMove = (e) => {
    if (reduce || e.pointerType !== 'mouse') return;
    const b = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - b.left) / b.width - 0.5);
    my.set((e.clientY - b.top) / b.height - 0.5);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  return (
    <section id="home" ref={ref} className="relative isolate flex min-h-screen items-center overflow-hidden pb-14 pt-24 sm:pt-28" aria-labelledby="hero-title">
      {/* atmosphere & stadium vector backdrop */}
      <div className="aurora absolute inset-0 -z-20 opacity-90" aria-hidden="true" />
      <StadiumBackdrop className="pointer-events-none absolute inset-0 -z-20 h-full w-full opacity-95" />
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_50%_-10%,rgba(7,11,22,0)_0%,#070B16_78%)]" aria-hidden="true" />
      <div className="grid-lines absolute inset-0 -z-10" aria-hidden="true" />
      <div className="beam left-[-6%] [--r:-14deg]" aria-hidden="true" />
      <div className="beam right-[-4%] [--r:16deg]" style={{ animationDelay: '-4s' }} aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-64 bg-gradient-to-t from-navy-950 to-transparent" aria-hidden="true" />
      <motion.div style={{ y: yGround }} className="pointer-events-none absolute -bottom-24 left-1/2 -z-10 w-[1500px] max-w-none -translate-x-1/2 opacity-80 [perspective:1200px]" aria-hidden="true">
        <Ground className="w-full [transform:rotateX(58deg)]" />
      </motion.div>

      {/* floating colorful cricket vectors */}
      <motion.div style={{ y: yBall }} className="pointer-events-none absolute right-[4%] top-28 hidden md:block" aria-hidden="true">
        <CricketBall size={88} className="bob drop-shadow-[0_18px_36px_rgba(244,63,94,.5)]" />
      </motion.div>
      <motion.div style={{ y: yBall }} className="pointer-events-none absolute left-[45%] top-20 hidden opacity-85 lg:block" aria-hidden="true">
        <div className="bob [--rot:-10deg]" style={{ animationDelay: '-1.5s' }}>
          <AuctionGavelVector size={70} className="drop-shadow-[0_12px_28px_rgba(6,182,212,.38)]" />
        </div>
      </motion.div>
      <motion.div style={{ y: yStumps }} className="pointer-events-none absolute bottom-12 left-[1.5%] hidden opacity-85 xl:block" aria-hidden="true">
        <div className="bob [--rot:-6deg]" style={{ animationDelay: '-2s' }}><Stumps size={74} /></div>
      </motion.div>
      <motion.div style={{ y: yStumps }} className="pointer-events-none absolute bottom-10 right-[44%] hidden opacity-75 2xl:block" aria-hidden="true">
        <div className="bob [--rot:24deg]" style={{ animationDelay: '-4s' }}><Bat size={110} /></div>
      </motion.div>

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-cyan/35 bg-gradient-to-r from-cyan/15 via-violet/15 to-gold/15 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-cyan-soft backdrop-blur"
          >
            <span className="live-dot h-2 w-2 rounded-full bg-sold" aria-hidden="true" />
            Live Cricket Auction Platform
          </motion.div>
          <h1 id="hero-title" className="h-display text-[clamp(3rem,calc(5vw+0.8rem),5.6rem)] leading-[.88]">
            <span className="sr-only">The future of cricket auctions starts here.</span>
            {LINES.map((l, i) => (
              <span key={l} className="block overflow-hidden pb-[0.06em]" aria-hidden="true">
                <motion.span
                  className={i === 2 ? 'text-gold-grad block' : 'block'}
                  initial={{ y: '108%', rotate: 3 }} animate={{ y: 0, rotate: 0 }}
                  transition={{ duration: 0.9, delay: 0.1 + i * 0.13, ease: [0.22, 1, 0.36, 1] }}
                >{l}</motion.span>
              </span>
            ))}
          </h1>

          <motion.p className="mt-7 max-w-xl text-base leading-relaxed text-mute sm:text-lg"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65, duration: 0.7 }}>
            Transform your cricket tournament into a professional auction experience with intelligent player management, real-time bidding, and seamless tournament organization.
          </motion.p>

          <motion.div className="mt-9 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.7 }}>
            <button type="button" onClick={onExplore} className="btn btn-gold px-7 py-3.5 text-[15px]"><ArrowDown size={17} aria-hidden="true" />Explore Platform</button>
            <button type="button" onClick={onDemo} className="btn btn-ghost px-7 py-3.5 text-[15px]"><Gavel size={17} aria-hidden="true" />Request a Demo</button>
          </motion.div>
        </div>

        <motion.div
          className="relative [perspective:1400px]"
          initial={{ opacity: 0, y: 40, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          onPointerMove={onMove} onPointerLeave={onLeave}
        >
          <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-gold/25 via-transparent to-volt/25 blur-2xl" aria-hidden="true" />
          <motion.div style={reduce ? undefined : { rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}>
            <AuctionPreview />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
