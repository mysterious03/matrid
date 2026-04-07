import { motion } from 'framer-motion';
import { Layers, ArrowRight, Grid3X3, Zap, Box } from 'lucide-react';

export default function ProblemSolutionSection() {
  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] } },
  };

  return (
    <section id="problem" className="relative section-pad bg-brand-surface border-t border-white/[0.02] overflow-hidden">
      {/* Structural Mesh Background */}
      <div className="absolute inset-0 grid-bg-mesh opacity-40 pointer-events-none" />
      
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-24 items-start">
          
          {/* Problem Side - Structural Inefficiency */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-12"
          >
            <div className="space-y-4">
              <motion.span variants={itemVariants} className="text-[10px] text-gray-700 font-mono tracking-[0.3em] uppercase">The Structural Inefficiency</motion.span>
              <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight text-white">
                1D abstractions in a <span className="text-gray-600">multi-dimensional world.</span>
              </motion.h2>
              <motion.p variants={itemVariants} className="text-gray-500 text-lg font-light leading-relaxed max-w-lg">
                Traditional stacks and queues are geometrically constrained. When expanding a standard 2D array, 
                systems are forced to copy massive memory blocks and shift index pointers — a process that scales linearly 
                with data size ($O(N)$), leading to critical latency in real-time spatial processing.
              </motion.p>
            </div>

            {/* Visual: The Legacy Copying Bottleneck */}
            <motion.div variants={itemVariants} className="p-8 border border-white/5 bg-black/40 rounded-2xl relative group neon-card">
               <div className="flex items-center justify-between mb-8">
                  <span className="text-[10px] text-gray-700 font-mono uppercase tracking-widest">Legacy Array Expansion</span>
                  <div className="flex gap-1">
                     <div className="w-1.5 h-1.5 rounded-full bg-red-400 opacity-40 shadow-[0_0_8px_rgba(248,113,113,0.4)]" />
                     <div className="w-1.5 h-1.5 rounded-full bg-red-400 opacity-10" />
                  </div>
               </div>
               
               <div className="space-y-3 opacity-30 group-hover:opacity-60 transition-opacity duration-700">
                  <div className="h-6 w-full bg-white/5 border border-white/5 rounded flex gap-1 p-1">
                     <div className="h-full w-12 bg-gray-800 rounded-sm" />
                     <div className="h-full w-12 bg-gray-800 rounded-sm" />
                     <div className="h-full w-12 bg-gray-800 rounded-sm" />
                  </div>
                  <div className="flex justify-center py-2 animate-bounce">
                     <ArrowRight className="w-4 h-4 text-red-400 rotate-90 opacity-40" />
                  </div>
                  <div className="h-10 w-full border border-red-500/20 bg-red-500/5 rounded flex gap-2 p-1.5 shadow-[inset_0_0_20px_rgba(239,68,68,0.05)]">
                     <div className="h-full w-14 bg-red-500/10 border border-red-500/20 rounded-sm" />
                     <div className="h-full w-14 bg-red-500/10 border border-red-500/20 rounded-sm" />
                     <div className="h-full w-14 bg-red-500/10 border border-red-500/20 rounded-sm" />
                     <div className="h-full w-14 bg-red-500/40 border border-red-500/40 rounded-sm animate-pulse" />
                  </div>
               </div>
               <div className="mt-6 text-[10px] text-gray-700 font-mono text-center">Memory Reallocation & Index Relocation Point ($O(N)$)</div>
            </motion.div>
          </motion.div>

          {/* Solution Side - Matrid Zero-Shift */}
          <motion.div
            id="solution"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:mt-24 space-y-12"
          >
            <div className="space-y-4">
              <motion.span variants={itemVariants} className="text-[10px] text-brand-cyan/60 font-mono tracking-[0.3em] uppercase">The Matrid Protocol</motion.span>
              <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight text-white">
                Atomic spatial <span className="text-brand-cyan">expansion.</span>
              </motion.h2>
              <motion.p variants={itemVariants} className="text-gray-500 text-lg font-light leading-relaxed max-w-lg">
                Matrid leverages a quad-directional sparse coordinate mapper. By expanding logical boundaries 
                instead of relocating physical data, it achieves true $O(1)$ directional growth. 
                Data remains stationary; only the system's boundary perspective shifts.
              </motion.p>
            </div>

            {/* Visual: The Matrid 3D expansion concept */}
            <motion.div variants={itemVariants} className="p-10 border border-brand-cyan/10 bg-brand-cyan/[0.02] rounded-2xl relative overflow-hidden group shadow-[0_32px_80px_-16px_rgba(0,242,255,0.05)] neon-border-cyan neon-glow-cyan">
               <div className="absolute top-0 right-0 p-4 opacity-20">
                  <Grid3X3 className="w-8 h-8 text-brand-cyan" />
               </div>
               
               <div className="relative flex flex-col items-center justify-center h-48">
                  {/* Central Axis */}
                  <div className="absolute w-px h-full bg-brand-cyan/10" />
                  <div className="absolute w-full h-px bg-brand-cyan/10" />
                  
                  {/* The Origin Cell - Isometric Style */}
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="relative z-10 w-20 h-20 bg-white shadow-2xl flex flex-col items-center justify-center transform rotate-x-[45deg] rotate-z-[45deg] border border-brand-cyan/40"
                  >
                     <span className="text-black font-bold text-xs tracking-tighter">(0,0)</span>
                     <div className="absolute inset-0 bg-brand-cyan/10 blur-xl opacity-20" />
                  </motion.div>

                  {/* Expansion Vectors */}
                  <div className="absolute inset-0 pointer-events-none">
                     {[0, 90, 180, 270].map((deg, i) => (
                        <motion.div
                          key={i}
                          animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.4, 0.1] }}
                          transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
                          className="absolute w-12 h-1 bg-gradient-to-r from-brand-cyan to-transparent top-1/2 left-1/2 origin-left"
                          style={{ transform: `rotate(${deg}deg) translateX(40px)` }}
                        />
                     ))}
                  </div>
               </div>

               <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                     <Zap className="w-3.5 h-3.5 text-brand-cyan mt-0.5" />
                     <div className="flex flex-col">
                        <span className="text-[11px] font-bold text-gray-300">Bound Shift</span>
                        <span className="text-[9px] text-gray-600 font-mono">Instant O(1) Growth</span>
                     </div>
                  </div>
                  <div className="flex items-start gap-3">
                     <Layers className="w-3.5 h-3.5 text-gray-500 mt-0.5" />
                     <div className="flex flex-col">
                        <span className="text-[11px] font-bold text-gray-300">Zero Copy</span>
                        <span className="text-[9px] text-gray-600 font-mono">Data Persistence</span>
                     </div>
                  </div>
               </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
