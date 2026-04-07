import { motion } from 'framer-motion';
import { Database, Hash, Cpu, ArrowUpRight } from 'lucide-react';

export default function DeveloperSection() {
  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <section id="developer" className="section-pad bg-brand-surface border-t border-white/[0.02] relative overflow-hidden">
      <div className="absolute inset-0 grid-bg-mesh opacity-20 pointer-events-none" />
      
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 items-start">
          
          {/* Documentation / Logic Content */}
          <div className="space-y-12">
            <div className="space-y-4">
              <span className="text-[10px] text-gray-700 font-mono tracking-[0.3em] uppercase">Architecture Spec</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                Intelligently <span className="text-gray-500">engineered.</span>
              </h2>
              <p className="text-gray-500 text-lg font-light leading-relaxed max-w-lg">
                matrid uses a high-performance coordinate hashing engine to map logical boundaries 
                to physical storage. By separating spatial awareness from data location, we eliminate 
                memory reallocation bottlenecks.
              </p>
            </div>

            <div className="grid gap-8">
              {[
                { 
                  title: 'Sparse Hashing Engine', 
                  desc: 'Powered by an O(1) amortized hash-map. Memory consumption is strictly proportional to occupied cells, not logical dimensions.',
                  icon: Database 
                },
                { 
                  title: 'Boundary Integrity', 
                  desc: 'Four atomic boundary integers define the spatial container. Expansion is a simple scalar increment on any directional vector.',
                  icon: Hash 
                },
                { 
                  title: 'Surgical API Surface', 
                  desc: 'Comprehensive primitives: push, pop, peek, rotate, transpose, mirror, find, fill. All operations preserve coordinate purity.',
                  icon: Cpu 
                }
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  initial="hidden" 
                  whileInView="visible" 
                  viewport={{ once: true }} 
                  variants={itemVariants}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-6 group"
                >
                  <div className="mt-1 w-10 h-10 rounded border border-white/5 bg-white/5 flex items-center justify-center shrink-0 group-hover:border-brand-cyan/20 transition-all">
                    <item.icon className="w-4 h-4 text-gray-600 group-hover:text-brand-cyan transition-colors" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-gray-300 group-hover:text-white transition-colors uppercase tracking-tight">{item.title}</h4>
                    <p className="text-[13px] text-gray-500 font-light leading-relaxed group-hover:text-gray-400 transition-colors">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="pt-8 border-t border-white/[0.02]">
               <a href="https://github.com/suriyaprakash/matrid" className="inline-flex items-center gap-2 text-xs font-mono text-gray-600 hover:text-brand-cyan transition-colors">
                  View Reference Implementation on GitHub <ArrowUpRight className="w-3 h-3" />
               </a>
            </div>
          </div>

          {/* Code Workbench */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="pro-card overflow-hidden shadow-2xl border-white/5 bg-black/60"
          >
            <div className="flex items-center justify-between px-6 py-4 bg-white/[0.02] border-b border-white/[0.03]">
              <div className="flex gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-white/5 border border-white/10" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/5 border border-white/10" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/5 border border-white/10" />
              </div>
              <span className="text-[10px] font-mono text-gray-700 uppercase tracking-widest">Matrid.hpp</span>
            </div>
            
            <div className="p-8 overflow-x-auto">
              <pre className="font-mono text-[13px] leading-relaxed text-gray-400">
                <code className="block whitespace-pre">
                  {`template <typename T>
class Matrid {
private:
  unordered_map<string, T> data;
  int minX, maxX, minY, maxY;

  string hash(int x, int y) {
    return to_string(x) + "," + to_string(y);
  }

public:
  // O(1) bound shift
  void pushTop(vector<T> row) {
    minY--;
    for (int i = 0; i < row.size(); i++)
      data[hash(minX + i, minY)] = row[i];
  }

  // O(N) coordinate remapping
  void rotate90() {
    unordered_map<string, T> rotated;
    for (auto& [key, val] : data) {
      // (x,y) -> (-y,x)
      rotated[hash(-y, x)] = val;
    }
    data = rotated; 
    recalcBounds();
  }

  // Amortized O(1) access
  T get(int x, int y) {
    return data[hash(x, y)];
  }
};`}
                </code>
              </pre>
            </div>
            
            <div className="px-8 py-4 bg-brand-cyan/5 border-t border-brand-cyan/10 flex items-center justify-between">
               <span className="text-[10px] font-mono text-brand-cyan/60 uppercase">Memory Footprint: O(K) Nodes</span>
               <span className="text-[10px] font-mono text-gray-700">v1.2.4</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
