import { motion } from 'framer-motion';
import { ChevronDown, ArrowRight } from 'lucide-react';

export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-surface pt-20">
      {/* Subtle Neon Light - Focus on Content */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-cyan/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Subtle Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black z-5 pointer-events-none" />

      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto flex flex-col items-center">
        {/* Version Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/5 bg-white/5 text-gray-500 text-[10px] font-mono uppercase tracking-[0.2em] mb-12"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse" />
          Protocol v1.0.0 Alpha
        </motion.div>

        {/* Logo Branding */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 0.1 }}
           className="mb-8"
        >
          <img src="/logo.png" alt="matrid brand" className="h-24 md:h-32 w-auto mx-auto brightness-125 contrast-150 neon-glow-cyan mb-8" />
          <p className="text-xl md:text-2xl font-medium text-gray-400 max-w-2xl mx-auto leading-tight">
            Infinite 2D spatial expansion. <br />
            <span className="text-gray-600">Zero data movement.</span>
          </p>
        </motion.div>

        {/* Core Proposition */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-sm md:text-base text-gray-500 max-w-xl mx-auto mb-12 leading-relaxed font-light"
        >
          A quad-directional sparse data structure engineered for robotics vision and satellite imagery. 
          Matrid expands logical boundaries in $O(1)$ time while maintaining memory efficiency through 
          sparse spatial mapping.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 items-center mb-24"
        >
          <a href="#demo" className="btn-elite flex items-center gap-3 pr-4 group shadow-2xl neon-glow-cyan overflow-hidden relative">
            <div className="absolute inset-0 bg-brand-cyan/5 group-hover:bg-brand-cyan/10 transition-colors" />
            <span className="relative z-10">Open Simulator</span>
            <div className="relative z-10 w-6 h-6 rounded bg-black/10 flex items-center justify-center group-hover:bg-black/20 transition-all">
               <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </a>
          <a href="#solution" className="btn-ghost flex items-center gap-2 group border-white/5">
            Technical Specification 
            <ChevronDown className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 transition-all" />
          </a>
        </motion.div>

        {/* Stats Strip - Minimalist */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-x-12 gap-y-6 pt-12 border-t border-white/5 w-full max-w-3xl"
        >
          {[
            { label: 'Latency', value: 'O(1)' },
            { label: 'Mapping', value: 'Sparse' },
            { label: 'Safety', value: 'Atomic' },
            { label: 'Expansion', value: '4D' },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <div className="text-xs text-gray-600 uppercase tracking-widest mb-1">{stat.label}</div>
              <div className="text-lg font-bold text-gray-300">{stat.value}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Author Credit - Bottom Left */}
      <div className="absolute bottom-10 left-10 hidden xl:block">
        <div className="flex flex-col">
          <span className="text-[10px] text-gray-700 uppercase tracking-widest mb-1">Architect</span>
          <span className="text-xs font-semibold text-gray-400">Suriya Prakash</span>
        </div>
      </div>
    </section>
  );
}
