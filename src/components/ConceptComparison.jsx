import { motion } from 'framer-motion';
import { ArrowRightLeft, Check, X } from 'lucide-react';

export default function ConceptComparison() {
  const comparisonData = [
    { feature: 'Memory Model', old: 'Contiguous (full grid)', new: 'Sparse (occupied nodes only)' },
    { feature: 'Expansion', old: 'O(N²) – copy & relocate', new: 'O(1) – logical bound shift' },
    { feature: 'Directional Deque', old: 'Unidirectional/Stack only', new: '4-independent boundaries' },
    { feature: 'Negative Space', old: 'Manual offset complexity', new: 'Native coordinate integrity' },
    { feature: 'Transforms', old: 'Matrix multiplication rebuild', new: 'Coordinate remapping (O(N))' },
  ];

  return (
    <section className="section-pad bg-brand-surface border-t border-white/[0.02] relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        
        {/* Core Thesis - Minimalist Branding */}
        <div className="text-center mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block border-x border-white/5 px-12 py-6"
          >
            <h3 className="text-2xl md:text-4xl font-bold tracking-tight">
              <span className="text-gray-600">"Never move data. </span>
              <span className="text-white">Move the coordinate system."</span>
            </h3>
          </motion.div>

          {/* Visual Benchmarking */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 mt-20">
            <div className="p-8 border border-white/5 bg-black/20 w-80 rounded-2xl neon-card">
              <div className="text-[10px] font-bold text-gray-700 mb-6 uppercase tracking-widest">Legacy Approach</div>
              <div className="flex gap-2 mb-6">
                {['A','B','C'].map((v,i) => (
                  <div key={i} className="w-10 h-10 border border-red-500/10 bg-red-500/5 rounded flex items-center justify-center text-xs text-red-500/40 font-mono italic">{v}</div>
                ))}
              </div>
              <div className="text-[11px] text-gray-600 leading-relaxed">$ O(N) $ Relocation Cost</div>
            </div>

            <div className="hidden md:block">
              <ArrowRightLeft className="w-6 h-6 text-gray-800" />
            </div>

            <div className="p-8 border border-brand-cyan/20 bg-brand-cyan/[0.02] w-80 rounded-2xl shadow-[0_32px_80px_-16px_rgba(0,242,255,0.05)] neon-border-cyan neon-glow-cyan">
              <div className="text-[10px] font-bold text-brand-cyan/40 mb-6 uppercase tracking-widest">Matrid Protocol</div>
              <div className="relative w-full h-10 flex items-center justify-center border border-dashed border-brand-cyan/20 rounded-lg overflow-hidden mb-6">
                 <motion.div 
                   className="absolute inset-0 bg-brand-cyan/5"
                   animate={{ x: [-100, 100] }}
                   transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                 />
                 <span className="relative z-10 font-mono text-[10px] text-brand-cyan font-bold tracking-tighter">minY--</span>
              </div>
              <div className="text-[11px] text-gray-400 leading-relaxed font-medium">$ O(1) $ Logical Shift</div>
            </div>
          </div>
        </div>

        {/* Comparison List */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 border-t border-white/5">
            {comparisonData.map((row, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                key={i} 
                className="grid grid-cols-12 py-8 border-b border-white/[0.02] items-center hover:bg-white/[0.01] transition-colors px-4 group"
              >
                <div className="col-span-4 text-xs font-bold text-gray-600 uppercase tracking-widest group-hover:text-gray-400 transition-colors">{row.feature}</div>
                <div className="col-span-4 flex items-center gap-3 text-[13px] text-gray-700 font-light">
                  <X className="w-3.5 h-3.5 text-red-500/20" /> {row.old}
                </div>
                <div className="col-span-4 flex items-center gap-3 text-[13px] text-white font-medium">
                  <Check className="w-3.5 h-3.5 text-brand-cyan" /> {row.new}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
