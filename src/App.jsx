import React, { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from 'framer-motion';
import Loader from './components/Loader.jsx';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Features from './components/Features.jsx';
import HowItWorks from './components/HowItWorks.jsx';
import LiveAuction from './components/LiveAuction.jsx';
import Pricing from './components/Pricing.jsx';
import RequestForm from './components/RequestForm.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import { scrollToId } from './utils/format';

function Site() {
  const reduce = useReducedMotion();
  const [prefill, setPrefill] = useState(null);
  const go = useCallback((id) => scrollToId(id, reduce), [reduce]);
  const openRequest = useCallback((p) => { setPrefill({ ...p, nonce: Date.now() }); go('request'); }, [go]);

  // honour a #hash on first load
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (id) setTimeout(() => document.getElementById(id)?.scrollIntoView(), 50);
  }, []);

  return (
    <>
      <Navbar onNav={go} onDemo={() => openRequest({ kind: 'demo' })} />
      <main>
        <Hero onExplore={() => go('features')} onDemo={() => openRequest({ kind: 'demo' })} />
        <About />
        <Features />
        <HowItWorks />
        <LiveAuction />
        <Pricing onPlan={(p) => openRequest({ kind: 'plan', plan: p.name })} />
        <RequestForm prefill={prefill} onClearPrefill={() => setPrefill(null)} />
        <Contact />
      </main>
      <Footer onNav={go} onDemo={() => openRequest({ kind: 'demo' })} />
    </>
  );
}

export default function App() {
  const reduce = useReducedMotion();
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setReady(true), reduce ? 200 : 1500);
    return () => clearTimeout(t);
  }, [reduce]);

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence mode="wait">
        {ready ? (
          <motion.div key="site" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
            <Site />
          </motion.div>
        ) : (
          <Loader key="loader" />
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}
