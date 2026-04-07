import { motion } from 'framer-motion';
import { Bot, Satellite, BrainCircuit, Gamepad2 } from 'lucide-react';

export default function UseCases() {
  const cases = [
    {
      title: "Robotics Vision/SLAM",
      icon: Bot,
      desc: "Localizing in unknown 2D environments. Matrid maps new rows/columns in O(1) as a robot explores, without ever shifting existing spatial memory.",
    },
    {
      title: "Satellite Integration",
      icon: Satellite,
      desc: "Sparse Earth observation datasets. Use memory only for captured tiles, with infinite boundary growth as new swaths are acquired.",
    },
    {
      title: "Cellular Automata",
      icon: BrainCircuit,
      desc: "Fluid dynamics and neural grid simulations. Eliminates pre-allocated array limits while maintaining O(1) cell access latency.",
    },
    {
      title: "Gaming Engines",
      icon: Gamepad2,
      desc: "Infinite procedural maps and grid-based world logic. Grows logically in all four directions without data relocation or map resets.",
    },
  ];

  return (
    <section id="usecases" className="section-pad bg-brand-surface border-t border-white/[0.02] relative pb-48">
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="mb-20">
           <span className="text-[10px] text-gray-700 font-mono tracking-[0.3em] uppercase block mb-4">Application Domains</span>
           <h2 className="text-4xl font-bold tracking-tight text-white max-w-xl">
             Optimized for <span className="text-gray-500">high-frequency spatial operations.</span>
           </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {cases.map((uc, i) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              key={i}
              className="group p-8 border border-white/5 bg-black/40 rounded-2xl transition-all duration-500 relative overflow-hidden neon-card"
            >
              {/* Subtle 3D Tile Background */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-cyan/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              
              <div className="mb-8 relative flex items-center justify-center w-12 h-12 rounded-lg border border-white/5 bg-white/5 group-hover:border-brand-cyan/20 transition-all overflow-hidden">
                <uc.icon className="w-5 h-5 text-gray-500 group-hover:text-brand-cyan transition-all duration-500 group-hover:scale-110" />
              </div>

              <h3 className="text-[15px] font-bold text-gray-200 mb-3 group-hover:text-white transition-colors uppercase tracking-tight">{uc.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed group-hover:text-gray-400 transition-colors font-light">{uc.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
