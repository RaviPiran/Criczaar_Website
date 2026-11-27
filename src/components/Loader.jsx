import React from 'react';
import { motion } from 'framer-motion';

export default function Loader() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] grid place-items-center bg-navy-950"
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.55, ease: 'easeInOut' }}
      role="status" aria-label="Loading CRICZAAR"
    >
      <div className="relative flex flex-col items-center">
        <div className="absolute -inset-20 rounded-full bg-gold/20 blur-3xl" aria-hidden="true" />
        <motion.img
          src="/logo.png" alt="CRICZAAR" width="900" height="753"
          className="relative w-56 sm:w-72"
          initial={{ opacity: 0, scale: 0.8, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="relative mt-6 h-0.5 w-44 overflow-hidden rounded-full bg-white/10">
          <motion.div className="h-full bg-gradient-to-r from-gold to-volt" initial={{ x: '-100%' }} animate={{ x: '0%' }} transition={{ duration: 1.1, ease: 'easeInOut' }} />
        </div>
      </div>
    </motion.div>
  );
}
