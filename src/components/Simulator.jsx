import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Terminal, RefreshCw, Search, Layers, Eye, Trash2,
  ArrowUp, ArrowDown, ArrowLeft, ArrowRight,
  RotateCcw, FlipHorizontal, FlipVertical, SplitSquareHorizontal,
  ChevronDown, ChevronUp, Sparkles, Zap
} from 'lucide-react';

const CELL_SIZE = 48;
const GAP = 6;
const STEP_SIZE = CELL_SIZE + GAP;

// ─────────────────────────────────────────────
// Collapsible section wrapper for the sidebar
// ─────────────────────────────────────────────
function Section({ title, icon: Icon, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-white/[0.03] overflow-hidden last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-2 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 hover:text-white transition-colors"
      >
        <span className="flex items-center gap-2">
          <Icon className="w-3.5 h-3.5 opacity-50" />
          {title}
        </span>
        {open ? <ChevronUp className="w-3.5 h-3.5 opacity-30" /> : <ChevronDown className="w-3.5 h-3.5 opacity-30" />}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pb-6 space-y-3">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─────────────────────────────────────────────
// Action button with tooltip and icon
// ─────────────────────────────────────────────
function ActionBtn({ children, onClick, tooltip, variant = 'default', disabled = false, className = '' }) {
  const variants = {
    default: 'bg-white/5 hover:bg-white/10 border-white/5 text-gray-400 hover:text-white',
    push: 'bg-white/5 hover:bg-white/10 border-white/5 text-brand-cyan hover:text-brand-cyan',
    pop: 'bg-white/5 hover:bg-white/10 border-white/5 text-gray-500 hover:text-red-400',
    peek: 'bg-white/5 hover:bg-white/10 border-white/5 text-gray-500 hover:text-amber-400',
    danger: 'bg-red-500/5 hover:bg-red-500/10 border-red-500/10 text-red-400/70 hover:text-red-400',
    search: 'bg-white/5 hover:bg-white/10 border-white/5 text-gray-400 hover:text-white',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={tooltip}
      className={`border rounded-lg px-3 py-2 text-[11px] font-medium flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-20 ${variants[variant] || variants.default} ${className}`}
    >
      {children}
    </button>
  );
}

// ─────────────────────────────────────────────
// D-Pad component for directional operations
// ─────────────────────────────────────────────
function DPad({ onUp, onDown, onLeft, onRight, label, variant }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <ActionBtn onClick={onUp} variant={variant} className="!p-1.5 border-none bg-transparent hover:bg-white/5">
        <ArrowUp className="w-3.5 h-3.5" />
      </ActionBtn>
      <div className="flex gap-1 items-center">
        <ActionBtn onClick={onLeft} variant={variant} className="!p-1.5 border-none bg-transparent hover:bg-white/5">
          <ArrowLeft className="w-3.5 h-3.5" />
        </ActionBtn>
        <div className="w-7 h-7 rounded bg-white/[0.03] border border-white/5 flex items-center justify-center">
          <span className="text-[8px] font-mono text-gray-600 uppercase tracking-tighter">{label[0]}</span>
        </div>
        <ActionBtn onClick={onRight} variant={variant} className="!p-1.5 border-none bg-transparent hover:bg-white/5">
          <ArrowRight className="w-3.5 h-3.5" />
        </ActionBtn>
      </div>
      <ActionBtn onClick={onDown} variant={variant} className="!p-1.5 border-none bg-transparent hover:bg-white/5">
        <ArrowDown className="w-3.5 h-3.5" />
      </ActionBtn>
    </div>
  );
}

// ═══════════════════════════════════════════════
// MAIN SIMULATOR
// ═══════════════════════════════════════════════
export default function SimulatorSection() {
  const [cells, setCells] = useState([]);
  const [bounds, setBounds] = useState({ minX: -1, maxX: 1, minY: -1, maxY: 1 });
  const [camera, setCamera] = useState({ x: 0, y: 0, scale: 1 });
  const [logs, setLogs] = useState([{ text: "Matrid v1.0.0 initialized", type: 'info' }]);
  const [flashEffect, setFlashEffect] = useState('');

  const [fillVal, setFillVal] = useState("42");
  const [findVal, setFindVal] = useState("");
  const [rcVal, setRcVal] = useState("0");
  const [isIterating, setIsIterating] = useState(false);
  const [cmdLine, setCmdLine] = useState("");

  const logConsole = useRef(null);

  useEffect(() => {
    if (logConsole.current) logConsole.current.scrollTop = logConsole.current.scrollHeight;
  }, [logs]);

  const addLog = (text, type = 'cmd') => setLogs(prev => [...prev.slice(-50), { text, type }]);

  const flash = (color) => {
    setFlashEffect(color);
    setTimeout(() => setFlashEffect(''), 600);
  };

  // ── Bounds helpers ──
  const recalcBounds = (arr) => {
    if (!arr.length) return { minX: 0, maxX: 0, minY: 0, maxY: 0 };
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    arr.forEach(c => { minX = Math.min(minX, c.x); maxX = Math.max(maxX, c.x); minY = Math.min(minY, c.y); maxY = Math.max(maxY, c.y); });
    return { minX, maxX, minY, maxY };
  };

  const reframeCamera = (b) => {
    if (!b || (b.minX === 0 && b.maxX === 0 && b.minY === 0 && b.maxY === 0)) { setCamera({ x: 0, y: 0, scale: 1 }); return; }
    const w = (b.maxX - b.minX + 1) * STEP_SIZE;
    const h = (b.maxY - b.minY + 1) * STEP_SIZE;
    const cx = ((b.maxX + b.minX) / 2) * STEP_SIZE;
    const cy = ((b.maxY + b.minY) / 2) * STEP_SIZE;
    const s = Math.min(700 / (w + 120), 550 / (h + 120), 1.15);
    setCamera({ x: -cx, y: -cy, scale: s });
  };

  const clearFlags = (arr) => arr.map(c => ({ ...c, isNew: false, isHighlighted: false, isFound: false }));
  const makeCell = (x, y) => ({ id: `${x},${y}_${Date.now()}_${Math.random()}`, x, y, value: Math.floor(Math.random() * 99).toString(), isNew: true, isOrigin: x === 0 && y === 0, isHighlighted: false, isFound: false });

  // ── Initialize ──
  const initializeGrid = useCallback(() => {
    const init = [];
    for (let x = -1; x <= 1; x++) for (let y = -1; y <= 1; y++)
      init.push({ id: `${x},${y}_init`, x, y, value: Math.floor(Math.random() * 99).toString(), isOrigin: x === 0 && y === 0, isNew: false, isHighlighted: false, isFound: false });
    setCells(init);
    const b = { minX: -1, maxX: 1, minY: -1, maxY: 1 };
    setBounds(b); reframeCamera(b);
    setLogs([{ text: "Grid reset to 3×3 core", type: 'info' }]);
  }, []);
  useEffect(() => { initializeGrid(); }, [initializeGrid]);

  // ═══════════════════════════════════════
  // API OPERATIONS
  // ═══════════════════════════════════════

  const push = (dir) => {
    setCells(prev => {
      const old = clearFlags(prev); const added = []; let nb = { ...bounds };
      if (dir === 'top')    { nb.minY--; for (let x = nb.minX; x <= nb.maxX; x++) added.push(makeCell(x, nb.minY)); }
      if (dir === 'bottom') { nb.maxY++; for (let x = nb.minX; x <= nb.maxX; x++) added.push(makeCell(x, nb.maxY)); }
      if (dir === 'left')   { nb.minX--; for (let y = nb.minY; y <= nb.maxY; y++) added.push(makeCell(nb.minX, y)); }
      if (dir === 'right')  { nb.maxX++; for (let y = nb.minY; y <= nb.maxY; y++) added.push(makeCell(nb.maxX, y)); }
      setBounds(nb); reframeCamera(nb);
      addLog(`push${dir[0].toUpperCase() + dir.slice(1)}()  →  boundary expanded`, 'push');
      flash('cyan');
      return [...old, ...added];
    });
  };

  const popEdge = (dir) => {
    setCells(prev => {
      let f = clearFlags(prev);
      if (dir === 'top')    f = f.filter(c => c.y !== bounds.minY);
      if (dir === 'bottom') f = f.filter(c => c.y !== bounds.maxY);
      if (dir === 'left')   f = f.filter(c => c.x !== bounds.minX);
      if (dir === 'right')  f = f.filter(c => c.x !== bounds.maxX);
      if (!f.length) { clearMap(); return []; }
      const nb = recalcBounds(f); setBounds(nb); reframeCamera(nb);
      addLog(`pop${dir[0].toUpperCase() + dir.slice(1)}()  →  edge removed`, 'pop');
      flash('red');
      return f;
    });
  };

  const peekEdge = (dir) => {
    setCells(prev => prev.map(c => {
      let match = false;
      if (dir === 'top')    match = c.y === bounds.minY;
      if (dir === 'bottom') match = c.y === bounds.maxY;
      if (dir === 'left')   match = c.x === bounds.minX;
      if (dir === 'right')  match = c.x === bounds.maxX;
      return { ...c, isNew: false, isFound: false, isHighlighted: match };
    }));
    addLog(`peek${dir[0].toUpperCase() + dir.slice(1)}()  →  edge highlighted (read-only)`, 'peek');
    flash('amber');
  };

  const applyTransform = (type) => {
    setCells(prev => {
      const f = clearFlags(prev).map(c => {
        let nx = c.x, ny = c.y;
        if (type === 'rotate90')  { nx = -c.y; ny = c.x; }
        else if (type === 'transpose') { nx = c.y; ny = c.x; }
        else if (type === 'mirrorH')   { ny = -c.y; }
        else if (type === 'mirrorV')   { nx = -c.x; }
        return { ...c, x: nx, y: ny, isNew: true };
      });
      const nb = recalcBounds(f); setBounds(nb); reframeCamera(nb);
      addLog(`${type}()  →  coordinates remapped`, 'transform');
      flash('purple');
      return f;
    });
  };

  const fillMap = () => {
    setCells(c => c.map(item => ({ ...item, value: fillVal, isNew: true, isHighlighted: false, isFound: false })));
    addLog(`fill("${fillVal}")  →  ${cells.length} cells overwritten`, 'cmd');
    flash('cyan');
  };

  const clearMap = () => {
    setCells([]); const b = { minX: 0, maxX: 0, minY: 0, maxY: 0 }; setBounds(b); reframeCamera(b);
    addLog(`clear()  →  O(1) deallocation, bounds reset`, 'pop');
    flash('red');
  };

  const findValCmd = () => {
    let matches = [];
    setCells(c => c.map(item => { 
      const m = item.value === findVal; 
      if (m) matches.push(`(${item.x}, ${item.y})`); 
      return { ...item, isHighlighted: false, isFound: m }; 
    }));
    
    if (matches.length > 0) {
      addLog(`find("${findVal}")  →  Position${matches.length > 1 ? 's' : ''}: ${matches.join(', ')}`, 'search');
    } else {
      addLog(`find("${findVal}")  →  No occurrences found`, 'pop');
    }
    flash('green');
  };

  const traverseGrid = (type) => {
    const val = parseInt(rcVal);
    if (isNaN(val)) { addLog("Error: Input must be an integer", 'error'); return; }
    let count = 0;
    setCells(c => c.map(item => { const m = type === 'row' ? item.y === val : item.x === val; if (m) count++; return { ...item, isHighlighted: false, isFound: m }; }));
    addLog(`get${type === 'row' ? 'Row' : 'Col'}(${val})  →  ${count} cells extracted`, 'search');
    flash('green');
  };

  const forEachScan = () => {
    if (isIterating || !cells.length) return;
    setIsIterating(true);
    addLog("forEach(fn)  →  iterating sparse map...", 'info');
    setCells(c => c.map(item => ({ ...item, isFound: false, isHighlighted: false })));
    const sorted = [...cells].sort((a, b) => a.y === b.y ? a.x - b.x : a.y - b.y);
    let i = 0;
    const iv = setInterval(() => {
      if (i >= sorted.length) {
        clearInterval(iv); setIsIterating(false);
        setCells(cur => cur.map(c => ({ ...c, isHighlighted: false })));
        addLog(`forEach()  →  completed (${sorted.length} nodes visited)`, 'info');
        return;
      }
      const tid = sorted[i].id;
      setCells(cur => cur.map(c => c.id === tid ? { ...c, isHighlighted: true } : { ...c, isHighlighted: false }));
      i++;
    }, 120);
  };

  // ── CLI Parser ──
  const executeCmd = (e) => {
    if (e) e.preventDefault();
    const input = cmdLine.trim();
    if (!input) return;

    setCmdLine("");
    const cmd = input.toLowerCase().replace(/\s+/g, '');
    
    // Pattern matching
    if (cmd === 'pushtop()') push('top');
    else if (cmd === 'pushbottom()') push('bottom');
    else if (cmd === 'pushleft()') push('left');
    else if (cmd === 'pushright()') push('right');
    else if (cmd === 'poptop()') popEdge('top');
    else if (cmd === 'popbottom()') popEdge('bottom');
    else if (cmd === 'popleft()') popEdge('left');
    else if (cmd === 'popright()') popEdge('right');
    else if (cmd === 'peektop()') peekEdge('top');
    else if (cmd === 'peekbottom()') peekEdge('bottom');
    else if (cmd === 'peekleft()') peekEdge('left');
    else if (cmd === 'peekright()') peekEdge('right');
    else if (cmd === 'rotate90()') applyTransform('rotate90');
    else if (cmd === 'transpose()') applyTransform('transpose');
    else if (cmd === 'mirrorv()') applyTransform('mirrorV');
    else if (cmd === 'mirrorh()') applyTransform('mirrorH');
    else if (cmd === 'clear()') clearMap();
    else if (cmd === 'foreach()') forEachScan();
    else if (cmd.startsWith('fill(') && cmd.endsWith(')')) {
      const val = input.match(/fill\((.*)\)/i)?.[1];
      if (val) { setFillVal(val); fillMap(); }
    }
    else if (cmd.startsWith('find(') && cmd.endsWith(')')) {
      const val = input.match(/find\((.*)\)/i)?.[1];
      if (val) { setFindVal(val); findValCmd(); }
    }
    else if (cmd.startsWith('getrow(') && cmd.endsWith(')')) {
      const val = input.match(/getrow\((.*)\)/i)?.[1];
      if (val) { setRcVal(val); traverseGrid('row'); }
    }
    else if (cmd.startsWith('getcol(') && cmd.endsWith(')')) {
      const val = input.match(/getcol\((.*)\)/i)?.[1];
      if (val) { setRcVal(val); traverseGrid('col'); }
    }
    else {
      addLog(`Syntax Error: Unknown command "${input}"`, 'error');
    }
  };

  // ═══════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════
  const rows = bounds.maxY - bounds.minY + 1;
  const cols = bounds.maxX - bounds.minX + 1;

  return (
    <section id="demo" className="bg-brand-surface py-32 relative z-10 border-t border-white/[0.02]">
      <div className="max-w-[1400px] mx-auto px-6 mb-16 text-center lg:text-left">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Visual <span className="text-gray-500">Workbench</span>
        </h2>
        <p className="text-gray-500 max-w-xl text-lg font-light leading-relaxed">
          The Matrid sandbox provides a low-level preview of bound-shifting logic. 
          Modify the spatial state via manual controls or the integrated console.
        </p>
      </div>

      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row h-[800px] border border-white/5 rounded-2xl overflow-hidden glass-card mx-6 lg:mx-auto shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] neon-border-cyan">
        
        {/* SIDEBAR — Properties & Actions */}
        <div className="w-full lg:w-[320px] bg-black/20 border-b lg:border-b-0 lg:border-r border-white-[0.03] flex flex-col pt-4 overflow-hidden">
          <div className="flex-1 overflow-y-auto px-6 custom-scrollbar">
            
            <Section title="Boundaries" icon={Layers}>
              <div className="grid grid-cols-2 gap-8 py-4">
                <div className="space-y-4">
                  <div className="text-[10px] text-gray-700 tracking-widest uppercase">Push</div>
                  <DPad onUp={() => push('top')} onDown={() => push('bottom')} onLeft={() => push('left')} onRight={() => push('right')} label="Push" variant="push" />
                </div>
                <div className="space-y-4">
                  <div className="text-[10px] text-gray-700 tracking-widest uppercase">Pop</div>
                  <DPad onUp={() => popEdge('top')} onDown={() => popEdge('bottom')} onLeft={() => popEdge('left')} onRight={() => popEdge('right')} label="Pop" variant="pop" />
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-white-[0.02] grid grid-cols-2 gap-2">
                 <ActionBtn onClick={() => peekEdge('top')} variant="peek">Peek T</ActionBtn>
                 <ActionBtn onClick={() => peekEdge('bottom')} variant="peek">Peek B</ActionBtn>
                 <ActionBtn onClick={() => peekEdge('left')} variant="peek">Peek L</ActionBtn>
                 <ActionBtn onClick={() => peekEdge('right')} variant="peek">Peek R</ActionBtn>
              </div>
            </Section>

            <Section title="Transforms" icon={RefreshCw}>
              <div className="grid grid-cols-1 gap-2 pt-2">
                <ActionBtn onClick={() => applyTransform('rotate90')} className="justify-start px-4">
                  <RotateCcw className="w-3.5 h-3.5 opacity-50" /> rotate90()
                </ActionBtn>
                <ActionBtn onClick={() => applyTransform('transpose')} className="justify-start px-4">
                  <SplitSquareHorizontal className="w-3.5 h-3.5 opacity-50" /> transpose()
                </ActionBtn>
                <ActionBtn onClick={() => applyTransform('mirrorV')} className="justify-start px-4">
                  <FlipVertical className="w-3.5 h-3.5 opacity-50" /> mirrorV()
                </ActionBtn>
                <ActionBtn onClick={() => applyTransform('mirrorH')} className="justify-start px-4">
                  <FlipHorizontal className="w-3.5 h-3.5 opacity-50" /> mirrorH()
                </ActionBtn>
              </div>
            </Section>

            <Section title="Data Engine" icon={Search} defaultOpen={false}>
              <div className="space-y-4 pt-2">
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] text-gray-700 uppercase">Input Value</span>
                  <input 
                    type="text" value={findVal} onChange={e => setFindVal(e.target.value)}
                    className="bg-white/5 border border-white/5 rounded px-3 py-2 text-xs text-white outline-none focus:border-brand-cyan/30 transition-all font-mono"
                  />
                  <ActionBtn onClick={findValCmd} variant="search">find(entry)</ActionBtn>
                </div>
                <div className="pt-4 border-t border-white-[0.02] grid grid-cols-2 gap-2">
                  <ActionBtn onClick={forEachScan} disabled={isIterating}>
                    {isIterating ? 'Scanning...' : 'forEach(fn)'}
                  </ActionBtn>
                  <ActionBtn onClick={clearMap} variant="danger" className="border-red-500/10">clear()</ActionBtn>
                </div>
              </div>
            </Section>

            <Section title="API Syntax" icon={Terminal} defaultOpen={false}>
               <div className="space-y-4 py-2 font-mono text-[9px] text-gray-500 uppercase tracking-tighter leading-relaxed">
                  <div>• pushEdge() : O(1) bound shift</div>
                  <div>• popEdge()  : atomic removal</div>
                  <div>• peek()     : O(1) read-lookahead</div>
                  <div>• rotate90() : O(N) coordinate remap</div>
               </div>
            </Section>
          </div>

          {/* Stats Footer */}
          <div className="p-6 bg-black/40 border-t border-white/[0.03] grid grid-cols-2 gap-y-4">
            <div className="flex flex-col">
              <span className="text-[9px] text-gray-700 uppercase tracking-widest mb-1">Total Nodes</span>
              <span className="text-xl font-bold text-gray-300 font-mono tracking-tighter">{cells.length}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] text-gray-700 uppercase tracking-widest mb-1">Dimensions</span>
              <span className="text-xl font-bold text-gray-300 font-mono tracking-tighter">{cols}×{rows}</span>
            </div>
            <div className="flex flex-col col-span-2 pt-2 border-t border-white-[0.02]">
              <span className="text-[9px] text-gray-700 uppercase tracking-widest mb-1">Spatial Bounds</span>
              <span className="text-[11px] font-mono text-brand-cyan/60">
                X [{bounds.minX}, {bounds.maxX}] · Y [{bounds.minY}, {bounds.maxY}]
              </span>
            </div>
          </div>
        </div>

        {/* WORKSPACE — Canvas & Console */}
        <div className="flex-1 flex flex-col bg-black/60 relative overflow-hidden">
          {/* Flash Indicator */}
          <AnimatePresence>
            {flashEffect && (
              <motion.div
                initial={{ opacity: 0.1 }} animate={{ opacity: 0 }} exit={{ opacity: 0 }}
                className="absolute inset-0 z-10 pointer-events-none bg-brand-cyan"
              />
            )}
          </AnimatePresence>

          <div className="flex-1 relative">
            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" 
                 style={{ backgroundImage: 'radial-gradient(circle, #222 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

            {/* Canvas Rig */}
            <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
              <motion.div
                className="origin-center"
                animate={{ x: camera.x * camera.scale, y: camera.y * camera.scale, scale: camera.scale }}
                transition={{ type: "spring", damping: 30, stiffness: 100 }}
              >
                {/* Visual Axes */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[2000px] h-[2000px]">
                   <div className="absolute w-full h-px bg-white/[0.02] top-1/2" />
                   <div className="absolute h-full w-px bg-white/[0.02] left-1/2" />
                </div>

                {/* Cells Rendering */}
                <div className="relative">
                  <AnimatePresence mode="popLayout">
                    {cells.map((cell) => (
                      <motion.div
                        key={cell.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
                        className={`absolute rounded flex flex-col items-center justify-center border font-mono transition-colors duration-500
                          ${cell.isOrigin ? 'bg-brand-cyan/20 border-brand-cyan/60 text-white shadow-[0_0_20px_rgba(0,242,255,0.2)] neon-glow-cyan' : 
                            cell.isFound ? 'bg-white border-white text-black neon-glow-amber' :
                            cell.isHighlighted ? 'bg-white/10 border-white/40 text-white' :
                            'bg-white/5 border-white/5 text-gray-600'}
                        `}
                        style={{ 
                          width: CELL_SIZE, height: CELL_SIZE, 
                          x: cell.x * STEP_SIZE - CELL_SIZE/2, 
                          y: cell.y * STEP_SIZE - CELL_SIZE/2 
                        }}
                      >
                        <span className="text-[11px] font-bold">{cell.value}</span>
                        <span className="text-[7px] opacity-40 -mt-0.5">{cell.x},{cell.y}</span>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          </div>

          {/* UNIFIED CONSOLE — Integrated at bottom */}
          <div className="h-[200px] bg-black border-t border-white/[0.05] flex flex-col overflow-hidden z-20">
            <div className="px-6 py-3 border-b border-white/[0.03] flex items-center justify-between text-[10px] text-gray-700 tracking-widest uppercase bg-black/40">
              <div className="flex gap-4">
                 <span className="text-white">Terminal Console</span>
                 <span className="opacity-40">matrid@system:~</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="hidden md:flex gap-3 text-[9px] text-gray-600 font-mono lower">
                  <span>Samples: <button onClick={() => setCmdLine('pushTop()')} className="hover:text-brand-cyan transition-colors">pushTop()</button></span>
                  <span><button onClick={() => setCmdLine('rotate90()')} className="hover:text-brand-cyan transition-colors">rotate90()</button></span>
                  <span><button onClick={() => setCmdLine('find(42)')} className="hover:text-brand-cyan transition-colors">find(42)</button></span>
                </div>
                <button onClick={() => setLogs([])} className="hover:text-white transition-colors">Clear</button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto px-6 py-4 custom-scrollbar space-y-1 font-mono text-[11px]" ref={logConsole}>
              {logs.map((log, i) => (
                <div key={i} className={`flex gap-3 leading-relaxed ${
                  log.type === 'error' ? 'text-red-500' : 
                  log.type === 'push' ? 'text-brand-cyan' :
                  log.type === 'pop' ? 'text-gray-500' :
                  'text-gray-400'
                }`}>
                  <span className="text-gray-800 select-none">{new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit'})}</span>
                  <span className="opacity-60">{log.type === 'error' ? '!' : '>'}</span>
                  <span>{log.text}</span>
                </div>
              ))}
              
              {/* Persistent Input Line */}
              <form onSubmit={executeCmd} className="flex items-center gap-3 pt-2 group">
                 <span className="text-brand-cyan font-bold select-none opacity-50 group-focus-within:opacity-100">$</span>
                 <input 
                    type="text" value={cmdLine} onChange={e => setCmdLine(e.target.value)}
                    placeholder="type command... (e.g. pushTop())"
                    className="flex-1 bg-transparent border-none text-white outline-none placeholder-gray-800 py-0"
                    autoFocus
                 />
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
