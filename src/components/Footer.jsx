import { ArrowUpRight, Code } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="relative bg-brand-surface border-t border-white/[0.02] pt-32 pb-16 overflow-hidden">
      {/* Subtle Bottom Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-96 bg-brand-cyan opacity-[0.03] blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-4xl mx-auto text-center px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-8">
            The future is <span className="text-gray-500">spatial.</span>
          </h2>
          <p className="text-gray-500 mb-12 max-w-lg mx-auto font-light leading-relaxed">
            matrid provides the foundational spatial primitives for the next generation 
            of autonomous systems and planetary-scale observation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a href="https://github.com/suriyaprakash/matrid" className="btn-elite flex items-center gap-3 shadow-2xl neon-glow-cyan border-brand-cyan/20">
              <Code className="w-4 h-4" />
              Source Documentation
            </a>
            <a href="#hero" className="btn-ghost flex items-center gap-3 border-white/5 opacity-60 hover:opacity-100 transition-opacity">
              Back to Overview
              <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                 <ArrowUpRight className="w-3.5 h-3.5 rotate-[-90deg]" />
              </motion.div>
            </a>
          </div>
        </motion.div>

        <div className="border-t border-white/[0.02] pt-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center group">
             <img src="/logo.png" alt="matrid logo" className="h-10 w-auto brightness-110 contrast-125 neon-glow-cyan rounded" />
          </div>
          
          <div className="flex flex-col md:items-end gap-2 text-[10px] text-gray-700 font-mono uppercase tracking-widest">
            <span>Architect: Suriya Prakash</span>
            <span>Matrid Protocol v1.0.0 Alpha · {new Date().getFullYear()}</span>
            <span className="text-gray-800">Licensed under MIT-2.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
