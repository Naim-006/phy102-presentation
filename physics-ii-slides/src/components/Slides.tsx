import React, { useState } from 'react';
import {
  Atom,
  Lightbulb,
  ArrowRight,
  Target,
  Layers,
  Cpu,
  Radio,
  Network,
  CheckCircle2,
  Table as TableIcon,
  Zap
} from 'lucide-react';
import { Latex } from './Math';
import { SlideLayout } from './Presentation';
import { cn } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

// --- Shared Components ---

const WavePacket = ({ color, className, frequency = 0.2 }: { color: string, className?: string, frequency?: number }) => (
  <svg viewBox="0 0 100 40" className={cn("w-20 h-8 overflow-visible", className)}>
    <motion.path
      d="M 0 20 Q 5 10, 10 20 T 20 20 T 30 20 T 40 20 T 50 20 T 60 20"
      fill="transparent"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      animate={{
        d: [
          "M 0 20 Q 5 5, 10 20 T 20 20 T 30 20 T 40 20 T 50 20 T 60 20",
          "M 0 20 Q 5 45, 10 20 T 20 20 T 30 20 T 40 20 T 50 20 T 60 20",
          "M 0 20 Q 5 5, 10 20 T 20 20 T 30 20 T 40 20 T 50 20 T 60 20"
        ]
      }}
      transition={{ duration: frequency, repeat: Infinity }}
    />
  </svg>
);

const WaveLong = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 160 40" className={cn("w-32 h-10 overflow-visible", className)}>
    <motion.path
      d="M 0 20 Q 20 5, 40 20 T 80 20 T 120 20"
      fill="transparent"
      stroke="#ef4444"
      strokeWidth="3"
      strokeLinecap="round"
      animate={{
        d: [
          "M 0 20 Q 20 5, 40 20 T 80 20 T 120 20",
          "M 0 20 Q 20 35, 40 20 T 80 20 T 120 20",
          "M 0 20 Q 20 5, 40 20 T 80 20 T 120 20"
        ]
      }}
      transition={{ duration: 0.5, repeat: Infinity }}
    />
  </svg>
);

const StaggeredList = ({ items }: { items: React.ReactNode[] }) => (
  <ul className="space-y-4">
    {items.map((item, i) => (
      <motion.li
        key={i}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: i * 0.15 + 0.5 }}
        className="flex items-start gap-3"
      >
        <div className="mt-1.5 p-1 rounded bg-physics-accent-dim">
          <ArrowRight className="w-4 h-4 text-physics-accent" />
        </div>
        <div className="text-lg text-physics-text-dim">{item}</div>
      </motion.li>
    ))}
  </ul>
);

// --- Individual Slides ---

export const Slide1_Title = () => (
  <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden">
    <div className="absolute inset-0 z-0">
      {/* Background Animated Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-physics-accent rounded-full opacity-20"
          style={{
            width: Math.random() * 4 + 2,
            height: Math.random() * 4 + 2,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, Math.random() * -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>

    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="z-10 text-center"
    >
      <div className="flex items-center justify-center gap-4 mb-8">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
          <Atom className="w-16 h-16 text-physics-accent" />
        </motion.div>
        <div className="h-16 w-1 bg-physics-accent" />
        <div className="text-left">
          <div className="text-sm font-mono tracking-[0.3em] text-physics-accent uppercase">PHY 102</div>
          <div className="text-xl font-bold tracking-widest text-physics-text uppercase">Physics II</div>
        </div>
      </div>

      <h1 className="text-7xl font-black text-physics-text italic tracking-tighter mb-4 leading-none">
        PHOTOELECTRIC <br />
        <span className="text-physics-accent">& COMPTON</span>
      </h1>

      <p className="text-2xl text-physics-text-dim font-light mb-12">
        Modern Physics Made Simple
      </p>

      <div className="grid grid-cols-2 gap-12 text-left bg-physics-surface border border-physics-border rounded-[40px] p-10 shadow-physics">
        <div>
          <h3 className="text-physics-accent text-[10px] font-mono uppercase tracking-[0.3em] mb-4">Instructor</h3>
          <p className="text-physics-text font-bold text-lg">Sumaiya Alam Chowdhury</p>
          <p className="text-xs text-physics-text-dim uppercase tracking-widest mt-1">Lecturer, Dept. of CSE, DIU</p>
        </div>
        <div>
          <h3 className="text-physics-accent text-[10px] font-mono uppercase tracking-[0.3em] mb-4">Team Members</h3>
          <div className="flex flex-col gap-1 text-[10px] text-physics-text-dim">
            <p><span className="text-physics-accent font-bold">Naim Hossain</span> | 252-15-178</p>
            <p><span className="text-physics-accent font-bold">Md Ajmine Adil Sadik</span> | 252-15-172</p>
            <p><span className="text-physics-accent font-bold">Jannatul Ferdous Asha</span> | 252-15-179</p>
            <p><span className="text-physics-accent font-bold">Diya Bipasha</span> | 252-15-652</p>
            <p><span className="text-physics-accent font-bold">Tasneem Binte Aziz</span> | 252-15-070</p>
          </div>
        </div>
      </div>
    </motion.div>
  </div>
);

export const Slide2_TOC = () => (
  <SlideLayout title="Table of Contents" subtitle="Navigation Map">
    <div className="grid grid-cols-2 gap-12 mt-8">
      <div className="space-y-8">
        <section>
          <h3 className="text-physics-accent font-bold mb-4 flex items-center gap-2">
            <Lightbulb className="w-5 h-5" /> PHOTOELECTRIC EFFECT
          </h3>
          <StaggeredList items={[
            "The Wave-Particle Paradox",
            "History & Basic Mechanism",
            "Energy Thresholds ($\nu_0$ and $\Phi$)",
            "Real World: Solar Energy",
            "Einstein's Quantum Equation",
            "Types of Photo-Cells"
          ]} />
        </section>
      </div>
      <div className="space-y-8">
        <section>
          <h3 className="text-physics-accent font-bold mb-4 flex items-center gap-2">
            <Target className="w-5 h-5" /> COMPTON EFFECT
          </h3>
          <StaggeredList items={[
            "Introduction & Assumptions",
            "Compton Shift Formula (Derivation)",
            "Comparison with Photoelectric",
            "Numerical Problem Solving"
          ]} />
        </section>
      </div>
    </div>
  </SlideLayout>
);

export const Slide_Duality = () => {
  return (
    <SlideLayout title="The Nature of Light" subtitle="Wave or Particle?">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center h-full">
        <div className="space-y-6">
          <p className="text-2xl md:text-3xl text-physics-text font-light leading-relaxed">
            Does light behave like a <span className="text-blue-400 font-medium">Wave</span> or a <span className="text-physics-accent font-medium">Particle</span>?
          </p>
          <div className="space-y-4">
            <div className="p-6 bg-blue-500/5 border border-blue-500/20 rounded-2xl">
              <h4 className="text-blue-400 font-bold mb-2 uppercase text-xs tracking-widest">Wave Model</h4>
              <p className="text-physics-text-dim text-sm">Light travels as a wave through space. This explains how it bends around corners (diffraction) and overlaps (interference).</p>
            </div>
            <div className="p-6 bg-physics-accent/5 border border-physics-accent/20 rounded-2xl">
              <h4 className="text-physics-accent font-bold mb-2 uppercase text-xs tracking-widest">Particle Model</h4>
              <p className="text-physics-text-dim text-sm">Light also acts like tiny packets of energy called <span className="text-physics-text font-bold">Photons</span>. This is how light interacts with electrons on a surface.</p>
            </div>
          </div>
          <div className="p-4 bg-physics-surface border border-physics-border rounded-xl italic text-physics-text-dim text-center">
            "Light has a dual nature, appearing as either a wave or a particle depending on the experiment."
          </div>
        </div>

        <div className="relative h-[400px] bg-black/40 rounded-[40px] border border-physics-border overflow-hidden flex flex-col items-center justify-center">
          <div className="absolute inset-x-0 top-12 text-center">
            <span className="text-[10px] font-mono text-physics-text-dim uppercase tracking-[0.3em]">Theoretical Visualization</span>
          </div>

          <div className="relative w-full h-40 flex items-center justify-center">
            <motion.svg
              viewBox="0 0 400 100"
              className="absolute w-full h-full"
              animate={{ opacity: [0, 1, 1, 0, 0] }}
              transition={{ duration: 6, repeat: Infinity, times: [0, 0.1, 0.45, 0.5, 1] }}
            >
              <motion.path
                d="M 0 50 Q 25 10, 50 50 T 100 50 T 150 50 T 200 50 T 250 50 T 300 50 T 350 50 T 400 50"
                fill="transparent"
                stroke="#3b82f6"
                strokeWidth="4"
                animate={{
                  d: [
                    "M 0 50 Q 25 10, 50 50 T 100 50 T 150 50 T 200 50 T 250 50 T 300 50 T 350 50 T 400 50",
                    "M 0 50 Q 25 90, 50 50 T 100 50 T 150 50 T 200 50 T 250 50 T 300 50 T 350 50 T 400 50",
                    "M 0 50 Q 25 10, 50 50 T 100 50 T 150 50 T 200 50 T 250 50 T 300 50 T 350 50 T 400 50"
                  ]
                }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </motion.svg>

            <div className="absolute inset-0 flex items-center justify-around px-8">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-8 h-8 rounded-full bg-physics-accent shadow-[0_0_20px_#00d4ff] flex items-center justify-center text-[10px] font-black text-black"
                  animate={{
                    opacity: [0, 0, 1, 1, 0],
                    scale: [0.5, 0.5, 1.2, 1, 0.8],
                    x: [0, 0, 0, 20, 40]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    times: [0, 0.5, 0.6, 0.9, 1],
                    delay: i * 0.1
                  }}
                >
                  hf
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-12 flex gap-12">
            <motion.div
              className="text-center"
              animate={{ opacity: [1, 1, 0.3, 0.3, 1] }}
              transition={{ duration: 6, repeat: Infinity, times: [0, 0.45, 0.5, 0.95, 1] }}
            >
              <div className="text-blue-400 font-black text-2xl uppercase">Wave view</div>
              <div className="text-[10px] text-blue-400/60 uppercase font-mono tracking-widest mt-1">Light Travels</div>
            </motion.div>
            <div className="w-1 h-8 bg-physics-border" />
            <motion.div
              className="text-center"
              animate={{ opacity: [0.3, 0.3, 1, 1, 0.3] }}
              transition={{ duration: 6, repeat: Infinity, times: [0, 0.45, 0.5, 0.95, 1] }}
            >
              <div className="text-physics-accent font-black text-2xl uppercase">Particle View</div>
              <div className="text-[10px] text-physics-accent/60 uppercase font-mono tracking-widest mt-1">Light Hits</div>
            </motion.div>
          </div>
        </div>
      </div>
    </SlideLayout>
  );
};

export const Slide3_PEIntro = () => {
  return (
    <SlideLayout title="The Photoelectric Effect" subtitle="Heinrich Hertz (1857–1894) | Basic Mechanism">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center h-full">
        <div className="space-y-4 md:space-y-6">
          <div className="flex items-center gap-6 mb-4">
            <div className="w-24 h-24 rounded-2xl border-2 border-physics-accent/30 overflow-hidden shadow-2xl">
              <img src="/heinrich_hertz_portrait.png" alt="Heinrich Hertz" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
            </div>
            <div>
              <h4 className="text-physics-accent font-bold uppercase text-[10px] tracking-widest">Historical Scientist</h4>
              <p className="text-physics-text font-black text-xl italic leading-none">Heinrich Hertz</p>
              <p className="text-[10px] text-physics-text-dim mt-2 font-mono uppercase">Discovered the effect in 1887</p>
            </div>
          </div>

          <h2 className="text-3xl font-black text-physics-text uppercase italic tracking-tighter">PHOTOELECTRIC EFFECT</h2>

          <p className="text-xl md:text-2xl text-physics-text font-light leading-snug">
            When <span className="text-physics-accent font-medium">light hits a metal surface</span>, it provides energy that allows <span className="text-physics-accent font-medium">electrons to be released</span>.
          </p>
          <p className="text-sm md:text-base text-physics-text-dim leading-relaxed">
            This process happens when <span className="text-physics-text font-bold">Light Photons (Quanta)</span> strike electrons, following the <span className="text-physics-text font-bold italic">One-to-One Interaction Principle</span>.
          </p>

          <div className="p-4 bg-physics-surface border border-physics-border rounded-2xl shadow-physics">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center">
                <Zap className="w-5 h-5 text-yellow-500" />
              </div>
              <p className="text-physics-text-dim text-[10px] uppercase font-bold tracking-widest italic leading-tight">
                Condition for Release:<br />
                <span className="text-physics-text">Light Frequency == Threshold Frequency »» Release Electron</span>
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[40px] border border-physics-border bg-black/80 dark:bg-black p-4 md:p-8 flex items-center justify-center relative overflow-hidden h-[300px] md:h-[450px]">
          <div className="relative w-full h-full">
            <div className="absolute top-0 left-0 p-4 bg-physics-accent text-black text-[10px] font-bold uppercase rounded-br-2xl z-20">
              Interactive Simulation: Photon Impact
            </div>

            {/* Metal Surface */}
            <div className="absolute inset-x-4 bottom-1/4 h-16 bg-gradient-to-b from-gray-700 to-gray-800 rounded-xl shadow-inner z-10 flex flex-col items-center justify-center">
              <div className="flex gap-2">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 bg-blue-300/30 rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                  />
                ))}
              </div>
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mt-2">Metal Surface</span>
            </div>

            {/* Synchronized Animation Loop */}
            <div className="relative w-full h-full">
              {/* Wave Packet Coming In */}
              <motion.div
                className="absolute"
                initial={{ x: 350, y: 0, opacity: 0 }}
                animate={{
                  x: [350, 150, 150],
                  y: [0, 200, 200],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  times: [0, 0.45, 0.46],
                  ease: "linear"
                }}
              >
                <div className="flex flex-col items-center">
                  <WavePacket color="#00d4ff" frequency={0.15} />
                </div>
              </motion.div>

              {/* Impact Flash */}
              <motion.div
                className="absolute bottom-[28%] left-[30%] w-32 h-32 bg-physics-accent/40 rounded-full blur-[60px] z-0"
                animate={{
                  scale: [0, 2, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  times: [0, 0.45, 0.55],
                  ease: "easeOut"
                }}
              />

              {/* Ejected Electron */}
              <motion.div
                className="absolute bottom-1/4 left-[30%] w-6 h-6 bg-yellow-400 rounded-full shadow-[0_0_40px_rgba(250,204,21,0.6)] z-20 flex items-center justify-center border-2 border-white/20"
                initial={{ x: 0, y: 0, opacity: 0 }}
                animate={{
                  x: [0, -350],
                  y: [0, -300],
                  rotate: [0, 360],
                  opacity: [0, 0, 1, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  times: [0, 0.45, 0.46, 1],
                  ease: "circOut"
                }}
              >
                <span className="text-[8px] font-black text-black tracking-tight">e-</span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </SlideLayout>
  );
};
export const Slide4_Threshold = () => {
  const [isHighEnergy, setIsHighEnergy] = useState(true);

  return (
    <SlideLayout title="Energy Thresholds" subtitle="Work Function & Threshold Frequency">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 h-full items-center">
        <div className="space-y-4 md:space-y-8">
          <section className="bg-physics-surface p-8 rounded-2xl border border-physics-border shadow-physics">
            <h3 className="text-2xl font-bold text-physics-text mb-2 italic">1. Threshold Frequency (<Latex formula="\nu_0" />)</h3>
            <p className="text-physics-text-dim leading-relaxed">
              The <span className="text-physics-accent font-bold">minimum starting frequency</span> required to release electrons. If the light frequency is too low, no electrons will be emitted regardless of brightness.
            </p>
          </section>

          <section className="bg-physics-surface p-8 rounded-2xl border border-physics-border shadow-physics">
            <h3 className="text-2xl font-bold text-physics-text mb-2 italic">2. Work Function (<Latex formula="\Phi" />)</h3>
            <p className="text-physics-text-dim leading-relaxed">
              The <span className="text-physics-accent font-bold">minimum energy barrier</span> that an electron must overcome to escape from the metal's surface.
            </p>
            <div className="text-3xl text-physics-accent mt-4">
              <Latex formula="\Phi = h\nu_0" />
            </div>
          </section>
        </div>

        <div className="p-8 bg-physics-accent/5 border border-physics-accent/20 rounded-2xl flex flex-col h-full relative overflow-hidden">
          <h4 className="text-physics-accent font-bold uppercase text-[10px] tracking-[0.3em] mb-4">Experimental Observation</h4>

          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setIsHighEnergy(false)}
              className={cn(
                "flex-1 p-3 rounded-xl border text-[10px] font-bold uppercase transition-all",
                !isHighEnergy ? "bg-red-500 border-red-500 text-white" : "bg-gray-900 border-white/5 text-gray-400"
              )}
            >
              Frequency too Low
            </button>
            <button
              onClick={() => setIsHighEnergy(true)}
              className={cn(
                "flex-1 p-3 rounded-xl border text-[10px] font-bold uppercase transition-all",
                isHighEnergy ? "bg-physics-accent border-physics-accent text-black" : "bg-gray-900 border-white/5 text-gray-400"
              )}
            >
              Enough frequency
            </button>
          </div>

          <div className="flex-1 relative bg-black rounded-[40px] border border-white/5 p-6 overflow-hidden">
            <div className="absolute inset-x-4 bottom-1/4 h-12 bg-gray-800 rounded z-10 flex items-center justify-center">
              <div className="flex gap-1">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="w-1 h-1 bg-white/20 rounded-full" />
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={isHighEnergy ? 'high' : 'low'}
                className="absolute"
                initial={{ x: 300, y: 0, opacity: 0 }}
                animate={{
                  x: [300, 100, 100],
                  y: [0, 120, 120],
                  opacity: [0, 1, 0]
                }}
                transition={{ duration: 1.5, repeat: Infinity, times: [0, 0.45, 0.46] }}
              >
                <WavePacket
                  color={isHighEnergy ? "#00d4ff" : "#ef4444"}
                  frequency={isHighEnergy ? 0.1 : 0.3}
                />
              </motion.div>
            </AnimatePresence>

            {isHighEnergy ? (
              <motion.div
                className="absolute bottom-[23%] left-[30%] w-6 h-6 bg-yellow-400 rounded-full shadow-[0_0_30px_#facc15] z-20"
                animate={{ y: [0, -180], x: [0, -150], opacity: [1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.65, ease: "circOut" }}
              />
            ) : (
              <motion.div
                className="absolute bottom-[23%] left-[30%] w-6 h-6 bg-red-900/40 rounded-full z-20 border border-red-500/20"
                animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
            )}

            <div className="absolute bottom-8 left-0 w-full text-center">
              <span className={cn(
                "text-[10px] font-black uppercase tracking-widest",
                isHighEnergy ? "text-physics-accent" : "text-red-400"
              )}>
                {isHighEnergy ? "Criterion Satisfied" : "Energy Insufficient"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </SlideLayout>
  );
};

export const Slide_SolarPanel = () => {
  return (
    <SlideLayout title="How Solar Panels Work" subtitle="Practical Use of the Photoelectric Effect">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center h-full">
        <div className="space-y-6">
          <div className="p-8 bg-physics-accent/5 border-2 border-physics-accent/20 rounded-[40px] shadow-physics">
            <h3 className="text-2xl font-bold text-physics-text mb-4 italic flex items-center gap-3">
              <Zap className="text-yellow-500" /> Photovoltaic Mechanism
            </h3>
            <ul className="space-y-4">
              <li className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-physics-accent flex items-center justify-center text-black font-bold text-xs flex-shrink-0">1</div>
                <p className="text-physics-text-dim text-sm"><span className="text-physics-text font-bold">Sunlight Hits:</span> Solar radiation striking the silicon material provides energy.</p>
              </li>
              <li className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-physics-accent flex items-center justify-center text-black font-bold text-xs flex-shrink-0">2</div>
                <p className="text-physics-text-dim text-sm"><span className="text-physics-text font-bold">Electron Release:</span> This energy allows electrons to break free from their atoms.</p>
              </li>
              <li className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-physics-accent flex items-center justify-center text-black font-bold text-xs flex-shrink-0">3</div>
                <p className="text-physics-text-dim text-sm"><span className="text-physics-text font-bold">Power Generation:</span> These released electrons move through a circuit, producing electricity.</p>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-physics-surface border border-physics-border rounded-2xl text-center">
              <div className="text-physics-accent font-bold text-xl italic tracking-tighter">~23.5%</div>
              <div className="text-[10px] text-physics-text-dim uppercase tracking-widest mt-1">Solar Efficiency</div>
            </div>
            <div className="p-4 bg-physics-surface border border-physics-border rounded-2xl text-center">
              <div className="text-physics-accent font-bold text-xl italic tracking-tighter">Clean Energy</div>
              <div className="text-[10px] text-physics-text-dim uppercase tracking-widest mt-1">Zero Emissions</div>
            </div>
          </div>
        </div>

        <div className="relative h-[450px] bg-black/60 rounded-[50px] border border-physics-border overflow-hidden p-8 flex flex-col items-center justify-center">
          {/* Sunlight */}
          <div className="absolute top-0 right-0 p-8">
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Lightbulb className="w-12 h-12 text-yellow-400 drop-shadow-[0_0_30px_rgba(250,204,21,0.5)]" />
              <div className="text-[8px] text-yellow-400/50 uppercase font-black text-center mt-2 tracking-tighter">Sunlight</div>
            </motion.div>
          </div>

          {/* Solar Panel Schematic */}
          <div className="relative w-full aspect-video bg-gray-900 border-4 border-gray-800 rounded-xl overflow-hidden shadow-2xl">
            {/* Grid Lines */}
            <div className="absolute inset-0 grid grid-cols-6 grid-rows-4">
              {[...Array(24)].map((_, i) => (
                <div key={i} className="border-[0.5px] border-blue-900/30" />
              ))}
            </div>

            {/* Influx of Photons */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={`p-${i}`}
                className="absolute top-[-20px] right-20"
                animate={{
                  x: [-150, -300],
                  y: [0, 150],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.4,
                  ease: "linear"
                }}
              >
                <WavePacket color="#fbbf24" frequency={0.2} className="w-12 opacity-60" />
              </motion.div>
            ))}

            {/* Flow of Electrons */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`e-${i}`}
                className="absolute bottom-4 left-4 w-2 h-2 bg-blue-400 rounded-full shadow-[0_0_10px_#60a5fa] z-20"
                animate={{
                  x: [0, 400, 400, 0, 0],
                  y: [0, 0, -100, -100, 0],
                  opacity: [0, 1, 1, 1, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 0.5,
                  times: [0, 0.4, 0.5, 0.9, 1]
                }}
              />
            ))}

            <div className="absolute bottom-0 inset-x-0 h-1 bg-physics-accent/20" />
            <div className="absolute right-0 inset-y-0 w-1 bg-physics-accent/20" />
          </div>

          {/* Connected Device (Bulb) */}
          <motion.div
            className="mt-12 flex flex-col items-center"
            animate={{ filter: ["brightness(0.5)", "brightness(1.5)", "brightness(0.5)"] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="p-4 rounded-full bg-physics-surface border-2 border-physics-accent shadow-[0_0_40px_rgba(0,212,255,0.3)]">
              <Zap className="w-8 h-8 text-physics-accent" />
            </div>
            <span className="text-[10px] text-physics-accent font-black uppercase tracking-widest mt-4">Electric Current</span>
          </motion.div>

          <div className="absolute bottom-4 text-[8px] font-mono text-physics-text-dim uppercase tracking-[0.4em]">Integrated Circuit Model</div>
        </div>
      </div>
    </SlideLayout>
  );
};

export const Slide5_EinsteinEquation = () => {
  const steps = [
    { label: "One Photon (hν) strikes the surface.", formula: "E = h\\nu" },
    { label: "Energy is used to overcome the Work Function.", formula: "\\Phi" },
    { label: "The remaining energy becomes Kinetic Energy (Speed).", formula: "\\frac{1}{2}mv^2" },
    { label: "Total Energy Equation:", formula: "h\\nu = \\Phi + \\frac{1}{2}mv^2" },
  ];

  return (
    <SlideLayout title="Einstein’s Formula" subtitle="Albert Einstein (1879–1955) | Modern Explanation (1905)">
      <div className="mt-4 md:mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center h-full">
        <div className="space-y-2 md:space-y-4">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.3, type: "spring", damping: 15 }}
              className="p-6 bg-physics-surface border border-physics-border rounded-2xl shadow-physics"
            >
              <div className="text-physics-accent font-bold text-xs uppercase mb-1">Part {i + 1}</div>
              <div className="text-physics-text text-lg">{s.label}</div>
              <div className="mt-2 text-physics-accent/60 font-mono text-sm leading-none"><Latex formula={s.formula} /></div>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col gap-8">
          <div className="flex justify-end pr-8">
            <div className="flex items-center gap-6 bg-physics-surface/50 p-6 rounded-[30px] border border-physics-border shadow-physics">
              <div className="w-32 h-32 rounded-2xl border-2 border-physics-accent/30 overflow-hidden shadow-2xl">
                <img src="/albert_einstein.png" alt="Albert Einstein" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
              </div>
              <div>
                <h4 className="text-physics-accent font-bold uppercase text-[10px] tracking-widest">Scientific Icon</h4>
                <p className="text-physics-text font-black text-xl italic leading-none">Albert Einstein</p>
                <p className="text-[10px] text-physics-text-dim mt-2 font-mono uppercase">Nobel Prize for this explanation</p>
              </div>
            </div>
          </div>

          <div className="bg-physics-accent/5 p-12 rounded-[50px] border-4 border-dashed border-physics-accent/20 text-center">
            <p className="text-physics-text-dim uppercase text-xs font-mono mb-4">Final Highlighted Form</p>
            <div className="text-4xl font-bold p-8 bg-black/80 dark:bg-black rounded-3xl shadow-[0_0_30px_rgba(0,212,255,0.15)]">
              <Latex formula="\frac{1}{2}mv^2 = h(\nu - \nu_0)" block />
            </div>
          </div>
        </div>
      </div>
    </SlideLayout>
  );
};

export const Slide6_Cell = () => (
  <SlideLayout title="Photo-electric Cell" subtitle="Three Popular Types">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-4 md:mt-12 h-full">
      {[
        { icon: Radio, title: "Photo-emission", desc: "Vacuum tube where light causes surface emission of electrons from cathode." },
        { icon: Network, title: "Photo-voltaic", desc: "Energy of photons creates potential difference across semi-conductor layers." },
        { icon: Cpu, title: "Photo-conductive", desc: "Resistance of material decreases significantly when exposed to light." }
      ].map((type, i) => (
        <motion.div
          key={i}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: i * 0.2 }}
          className="relative group h-full"
        >
          <div className="absolute inset-0 bg-physics-accent opacity-0 group-hover:opacity-5 transition-opacity rounded-3xl" />
          <div className="h-full border border-physics-border bg-physics-surface rounded-3xl p-6 md:p-8 flex flex-col items-center justify-center text-center shadow-physics">
            <type.icon className="w-16 h-16 text-physics-accent mb-6" />
            <h3 className="text-2xl font-bold text-physics-text mb-4 uppercase italic tracking-tighter">{type.title}</h3>
            <p className="text-physics-text-dim leading-relaxed text-sm">
              {type.desc}
            </p>
            <div className="mt-8 pt-8 border-t border-physics-border w-full">
              <ul className="text-[10px] font-mono uppercase tracking-widest text-physics-accent/60 space-y-2">
                <li>High Efficiency</li>
                <li>Fast Response</li>
                <li>Low Leakage</li>
              </ul>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </SlideLayout>
);

export const Slide7_ComptonIntro = () => {
  return (
    <SlideLayout title="What is the Compton Effect?" subtitle="Bouncing Light">
      <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center h-full">
        <div className="space-y-4 md:space-y-8">
          <h3 className="text-2xl md:text-3xl font-light text-physics-text leading-relaxed">
            When light (X-rays) <span className="text-physics-accent">crashes into an electron</span>, its color (wavelength) changes.
          </h3>
          <p className="text-base md:text-lg text-physics-text-dim">
            This proves that light acts like a <span className="text-physics-text font-bold">Small Ball (Particle)</span> that can hit things and bounce off!
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-physics-surface p-4 md:p-6 rounded-2xl border border-physics-border shadow-physics">
              <div className="text-[10px] text-physics-accent font-bold mb-1 uppercase tracking-widest text-[8px] md:text-[10px]">Wavelength Change</div>
              <p className="text-physics-text text-lg md:text-xl">Gets <span className="text-red-400 font-black">LONGER</span></p>
              <p className="text-[10px] text-physics-text-dim mt-2">Less Energy Left</p>
            </div>
            <div className="bg-physics-surface p-4 md:p-6 rounded-2xl border border-physics-border shadow-physics">
              <div className="text-[10px] text-physics-accent font-bold mb-1 uppercase tracking-widest text-[8px] md:text-[10px]">Frequency Change</div>
              <p className="text-physics-text text-lg md:text-xl">Gets <span className="text-blue-400 font-black">LOWER</span></p>
              <p className="text-[10px] text-physics-text-dim mt-2">Energy transferred to electron</p>
            </div>
          </div>
        </div>

        <div className="rounded-[40px] border border-physics-border bg-black/80 dark:bg-black flex flex-col p-6 md:p-12 relative overflow-hidden h-[350px] md:h-[450px] w-full max-w-xl">
          <div className="mb-4 text-center">
            <span className="text-[10px] font-mono uppercase bg-physics-accent text-black px-3 py-1 rounded-full font-bold">Collision Simulation</span>
          </div>

          <div className="flex-1 relative flex items-center justify-center">
            {/* Incoming Photon (High energy wave packet) */}
            <motion.div
              className="absolute"
              animate={{
                x: [-280, 0, 0],
                opacity: [0, 1, 0]
              }}
              transition={{ duration: 3, repeat: Infinity, times: [0, 0.35, 0.36] }}
            >
              <div className="flex flex-col items-center">
                <WavePacket color="#3b82f6" />
                <span className="text-[8px] font-black text-blue-400 uppercase mt-2">Incoming X-Ray</span>
              </div>
            </motion.div>

            {/* Electron */}
            <motion.div
              className="w-14 h-14 rounded-full bg-white shadow-[0_0_40px_white] z-10 flex items-center justify-center border-2 border-blue-100"
              animate={{
                x: [0, 0, 180],
                y: [0, 0, 140],
                rotate: [0, 0, 720]
              }}
              transition={{ duration: 3, repeat: Infinity, times: [0, 0.35, 1], ease: "easeOut" }}
            >
              <span className="text-black font-black text-sm">e-</span>
            </motion.div>

            {/* Impact Flash */}
            <motion.div
              className="absolute w-40 h-40 bg-white/30 rounded-full blur-[60px] z-0"
              animate={{ scale: [0, 2.5, 0], opacity: [0, 0.7, 0] }}
              transition={{ duration: 3, repeat: Infinity, times: [0, 0.35, 0.5] }}
            />

            {/* Scattered Photon (Low energy - Longer wavelength) */}
            <motion.div
              className="absolute"
              animate={{
                x: [0, 0, 300],
                y: [0, 0, -200],
                opacity: [0, 0, 1, 0]
              }}
              transition={{ duration: 3, repeat: Infinity, times: [0, 0.35, 0.36, 1], ease: "linear" }}
            >
              <div className="flex flex-col items-center">
                <svg viewBox="0 0 160 40" className="w-32 h-10">
                  <motion.path
                    d="M 0 20 Q 20 5, 40 20 T 80 20 T 120 20"
                    fill="transparent"
                    stroke="#ef4444"
                    strokeWidth="3"
                    animate={{
                      d: [
                        "M 0 20 Q 20 5, 40 20 T 80 20 T 120 20",
                        "M 0 20 Q 20 35, 40 20 T 80 20 T 120 20",
                        "M 0 20 Q 20 5, 40 20 T 80 20 T 120 20"
                      ]
                    }}
                    transition={{ duration: 0.4, repeat: Infinity }}
                  />
                </svg>
                <span className="text-[8px] font-black text-red-500 uppercase mt-2">Drawn-out Wave (Long λ)</span>
              </div>
            </motion.div>
          </div>

          <div className="mt-8 pt-6 border-t border-physics-border text-center">
            <p className="text-[10px] text-physics-text-dim italic">Notice: Photon loses energy and changes wavelength.</p>
          </div>
        </div>
      </div>
    </SlideLayout>
  );
};

export const Slide8_Assumptions = () => (
  <SlideLayout title="Procedure" subtitle="Basic Assumptions">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mt-4 md:mt-8">
      <div className="space-y-4 md:space-y-6">
        <h3 className="text-physics-accent font-bold uppercase text-xs tracking-[0.2em] mb-4">What we believe:</h3>
        <StaggeredList items={[
          "Collisions work like falling billard balls",
          "Only one photon hits one electron at a time",
          "Energy and Momentum are never lost (Conservation)",
          "The electron starts at rest (still)"
        ]} />
      </div>

      <div className="bg-physics-surface p-8 rounded-3xl border border-physics-border shadow-physics space-y-8 flex flex-col justify-center">
        <h3 className="text-physics-accent font-bold uppercase text-xs tracking-[0.2em] text-center mb-6">Simple Math Laws</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-physics-bg rounded-xl border border-physics-border">
            <span className="text-physics-text-dim">Energy In = Energy Out</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-physics-bg rounded-xl border border-physics-border">
            <span className="text-physics-text-dim">Momentum (Push) stays the same</span>
          </div>
        </div>
      </div>
    </div>
  </SlideLayout>
);

export const Slide9_Derivation = () => {
  return (
    <SlideLayout title="Compton Formula" subtitle="Calculating the Change">
      <div className="flex h-full items-center justify-center">
        <div className="max-w-3xl w-full">
          <div className="bg-physics-accent/10 p-6 md:p-12 border-2 border-physics-accent/40 rounded-[40px] md:rounded-[60px] text-center shadow-[0_0_50px_rgba(0,212,255,0.1)]">
            <p className="text-physics-text-dim font-mono text-xs md:text-sm uppercase mb-4 md:mb-6 tracking-[0.3em] md:tracking-[0.5em]">The Change in Wavelength</p>
            <div className="text-3xl md:text-6xl py-4 md:py-8 bg-black/80 dark:bg-black rounded-3xl mb-6 md:mb-8 border border-physics-border">
              <Latex formula="\Delta \lambda = \frac{h}{m_e c}(1 - \cos \phi)" block />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 text-left">
              <div className="p-6 bg-physics-surface rounded-2xl border border-physics-border shadow-physics">
                <h5 className="text-physics-accent text-xs font-bold uppercase mb-2 tracking-widest">Constant Value</h5>
                <p className="text-physics-text text-xl font-mono">0.00243 nm</p>
                <p className="text-[10px] text-physics-text-dim mt-1 italic">(Called the Compton Wavelength)</p>
              </div>
              <div className="p-6 bg-physics-surface rounded-2xl border border-physics-border shadow-physics">
                <h5 className="text-physics-accent text-xs font-bold uppercase mb-2 tracking-widest">Angle Effect</h5>
                <p className="text-physics-text">Depends on the Angle (<Latex formula="\phi" />)</p>
                <p className="text-xs text-physics-text-dim mt-1 italic">The more it bounces, the bigger the shift!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideLayout>
  );
};

export const Slide10_Comparison = () => {
  const tableData = [
    { feature: "Core Idea", compton: "Light collides with electrons and bounces with reduced energy", pe: "Light is absorbed and releases electrons from surface" },
    { feature: "What we see", compton: "X-ray/γ-ray photon deflects after hitting matter", pe: "Light knocks out electrons from a material" },
    { feature: "Scientific Proof", compton: "Light carries momentum (push effect)", pe: "Light carries quantized energy (E = hν)" },
    { feature: "Real-life Case", compton: "Cancer radiation therapy (X-rays scattering in tissue)", pe: "Digital camera sensor converting light into image" },
    { feature: "Industrial Use", compton: "Material inspection & radiation-based imaging", pe: "Solar cells, automatic doors, light sensors" },
    { feature: "Particle View", compton: "Photon behaves like a billiard ball collision", pe: "Photon behaves like an energy packet (quantum)" },
  ];

  return (
    <SlideLayout title="Quick Comparison" subtitle="Comparing the two effects">
      <div className="mt-8 overflow-hidden rounded-[40px] border border-white/5 shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-physics-accent text-black font-black uppercase text-[10px] md:text-xs tracking-widest italic">
              <th className="p-4 md:p-8">Feature</th>
              <th className="p-4 md:p-8">Compton (Scattering)</th>
              <th className="p-4 md:p-8">Photoelectric (Emission)</th>
            </tr>
          </thead>
          <tbody className="bg-gray-900/40">
            {tableData.map((row, i) => (
              <motion.tr
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="border-b border-physics-border hover:bg-physics-accent-dim transition-colors"
              >
                <td className="p-4 md:p-8 font-bold text-physics-accent uppercase text-[8px] md:text-[10px] tracking-wider">{row.feature}</td>
                <td className="p-4 md:p-8 text-gray-300 font-light text-xs md:text-base leading-relaxed">{row.compton}</td>
                <td className="p-4 md:p-8 text-gray-300 font-light text-xs md:text-base leading-relaxed">{row.pe}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </SlideLayout>
  );
};

export const Slide11_AdvancedGraphs = () => {
  const [graphType, setGraphType] = useState(0);

  const graphConfig: {
    title: string;
    subtitle: string;
    data: any[];
    keys: string[];
    labels: string[];
    xAxis: string;
    xAxisLabel: string;
  }[] = [
      {
        title: "Light Strength vs Flow",
        subtitle: "Higher intensity = more electrons come out",
        data: Array.from({ length: 21 }, (_, i) => {
          const v = i - 10;
          return { v, i1: v < -5 ? 0 : 50 * (1 + Math.tanh(v / 2)), i2: v < -5 ? 0 : 30 * (1 + Math.tanh(v / 2)) };
        }),
        keys: ["i1", "i2"],
        labels: ["Strong Light", "Weak Light"],
        xAxis: "v",
        xAxisLabel: "Battery Voltage (V)"
      },
      {
        title: "Speed vs Color",
        subtitle: "Higher frequency color = faster electrons",
        data: Array.from({ length: 21 }, (_, i) => {
          const f = i;
          return { f, ke: Math.max(0, (f - 7) * 5) };
        }),
        keys: ["ke"],
        labels: ["Electron Speed"],
        xAxis: "f",
        xAxisLabel: "Light Color (Frequency)"
      }
    ];

  return (
    <SlideLayout title="Science Graphs" subtitle="Checking the Data">
      <div className="flex flex-col md:flex-row h-full gap-4 md:gap-8">
        <div className="w-full md:w-[200px] flex md:flex-col gap-2 md:gap-4 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
          {graphConfig.map((g, i) => (
            <button
              key={i}
              onClick={() => setGraphType(i)}
              className={cn(
                "p-3 md:p-6 rounded-xl md:rounded-2xl border transition-all text-left text-[8px] md:text-[10px] uppercase font-bold tracking-widest flex-shrink-0 md:flex-shrink",
                graphType === i ? "bg-physics-accent border-physics-accent text-black" : "bg-physics-surface border-physics-border text-physics-text-dim"
              )}
            >
              {g.title}
            </button>
          ))}
        </div>

        <div className="flex-1 bg-physics-surface/50 rounded-[30px] md:rounded-[40px] border border-physics-border p-6 md:p-12 flex flex-col">
          <div className="mb-4 md:mb-8 text-center md:text-left">
            <h4 className="text-xl md:text-3xl font-bold text-physics-text mb-2 italic">{graphConfig[graphType].title}</h4>
            <p className="text-physics-text-dim italic text-xs md:text-sm">{graphConfig[graphType].subtitle}</p>
          </div>

          <div className="flex-1 min-h-0 bg-black/20 p-2 md:p-4 rounded-2xl">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={graphConfig[graphType].data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                <XAxis dataKey={graphConfig[graphType].xAxis} stroke="#444" label={{ value: graphConfig[graphType].xAxisLabel, position: 'insideBottom', offset: -5, fill: '#666', fontSize: 8 }} />
                <YAxis stroke="#444" fontSize={8} />
                <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #333' }} />
                {graphConfig[graphType].keys.map((k, idx) => (
                  <Line key={k} type="monotone" dataKey={k} stroke={idx === 0 ? "#00d4ff" : "#ff00ff"} strokeWidth={3} dot={false} strokeDasharray={idx === 1 ? "5 5" : ""} />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-8 flex gap-8 justify-center">
            {graphConfig[graphType].labels.map((l, idx) => (
              <div key={l} className="flex items-center gap-2">
                <div className={cn("w-4 h-1 rounded-full", idx === 0 ? "bg-physics-accent" : "bg-pink-500")} />
                <span className="text-[10px] uppercase font-mono text-physics-text-dim">{l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideLayout>
  );
};

export const Slide12_Problems = () => (
  <SlideLayout title="Solving Problems" subtitle="Simple Examples">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-4 h-full">
      <div className="space-y-4 md:space-y-6 flex flex-col">
        <div className="flex-1 p-6 md:p-8 bg-physics-surface border border-physics-border rounded-2xl md:rounded-3xl relative shadow-physics">
          <div className="absolute top-4 right-6 text-[8px] md:text-[10px] font-mono text-physics-accent uppercase">Example 1</div>
          <h4 className="text-physics-text font-bold mb-2 md:mb-4 text-sm md:text-base">Find the Start Frequency (Threshold)</h4>
          <div className="space-y-2 md:space-y-4 text-xs md:text-sm text-physics-text-dim">
            <p>Work Function (<Latex formula="\Phi" />) = 1.85 eV</p>
            <div className="p-3 md:p-4 bg-physics-bg rounded-xl font-mono border border-physics-border overflow-x-auto text-[10px] md:text-xs">
              <Latex formula="\nu_0 = \frac{\Phi}{h} = \frac{1.85 \text{ eV}}{h}" block />
            </div>
            <div className="p-3 md:p-4 bg-physics-accent/10 rounded-xl text-physics-accent font-bold">
              Ans: <Latex formula="4.46 \times 10^{14} \text{ Hz}" />
            </div>
          </div>
        </div>

        <div className="flex-1 p-6 md:p-8 bg-physics-surface border border-physics-border rounded-2xl md:rounded-3xl relative shadow-physics">
          <div className="absolute top-4 right-6 text-[8px] md:text-[10px] font-mono text-physics-accent uppercase">Example 2</div>
          <h4 className="text-physics-text font-bold mb-2 md:mb-4 text-sm md:text-base">Will electrons come out?</h4>
          <div className="space-y-2 md:space-y-4 text-xs md:text-sm text-physics-text-dim">
            <p>Light Energy = 1.83 eV</p>
            <p>Barrier Fee = 2.30 eV</p>
            <div className="p-3 md:p-4 bg-red-900/10 border border-red-500/20 rounded-xl text-red-400 font-bold">
              Reason: Energy is <span className="underline">too low</span>. No emission.
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex-1 p-8 md:p-12 bg-physics-accent/5 rounded-[30px] md:rounded-[50px] border border-physics-accent/20 relative">
          <div className="absolute top-4 right-6 md:top-8 md:right-10 text-[8px] md:text-[10px] font-mono text-physics-accent uppercase">Example 3</div>
          <h3 className="text-2xl md:text-3xl font-black text-physics-text mb-4 md:mb-6">Compton shift</h3>
          <p className="text-xs md:text-physics-text-dim mb-4 md:mb-8">
            What is the shift when light bounces at <Latex formula="90^\circ" />?
          </p>
          <div className="space-y-3 md:space-y-4 p-6 md:p-8 bg-physics-bg/50 rounded-2xl md:rounded-3xl border border-physics-border text-xs md:text-base">
            <div className="flex items-center gap-3 md:gap-4 text-physics-text">
              <span className="text-physics-accent font-mono text-[10px]">STEP 1</span>
              <Latex formula="\Delta \lambda = \lambda_c (1 - \cos 90^\circ)" />
            </div>
            <div className="flex items-center gap-3 md:gap-4 text-physics-text">
              <span className="text-physics-accent font-mono text-[10px]">STEP 2</span>
              <Latex formula="\Delta \lambda = 0.00243 \times 1" />
            </div>
            <div className="pt-4 md:pt-6 border-t border-physics-border">
              <div className="text-[8px] md:text-[10px] text-physics-text-dim mb-1 md:mb-2 uppercase tracking-widest">Shift Result</div>
              <div className="text-2xl md:text-4xl font-black text-physics-accent">
                <Latex formula="0.00243 \text{ nm}" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </SlideLayout>
);

export const Slide13_ThankYou = () => (
  <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden bg-physics-bg">
    {/* Neon Background Glows */}
    <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-physics-accent opacity-[0.03] blur-[150px] rounded-full" />
    <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500 opacity-[0.03] blur-[150px] rounded-full" />

    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1 }}
      className="z-10 text-center w-full px-4"
    >
      <h1 className="text-6xl md:text-[12rem] font-black text-physics-text italic tracking-tighter leading-none mb-4 uppercase">
        QUESTIONS<span className="text-physics-accent">?</span>
      </h1>
      <div className="h-1 w-12 md:w-24 bg-physics-accent mx-auto mb-8 md:mb-12" />

      <div className="flex flex-col md:flex-row gap-8 md:gap-24 text-left justify-center items-center md:items-start">
        <div className="text-center md:text-left">
          <h4 className="text-[10px] md:text-xs font-mono uppercase text-physics-accent tracking-widest mb-2 md:mb-4">Team Members</h4>
          <div className="space-y-1 text-xs md:text-sm text-physics-text-dim font-mono">
            <p>• Naim Hossain (252-15-178)</p>
            <p>• Md Ajmine Adil Sadik (252-15-172)</p>
            <p>• Jannatul Ferdous Asha (252-15-179)</p>
            <p>• Diya Bipasha (252-15-652)</p>
            <p>• Tasneem Binte Aziz (252-15-070)</p>
          </div>
        </div>
        <div className="text-center md:text-left">
          <h4 className="text-[10px] md:text-xs font-mono uppercase text-physics-accent tracking-widest mb-2 md:mb-4">Course Info</h4>
          <div className="text-xs md:text-sm text-physics-text-dim font-mono">
            <p className="text-physics-text font-bold">PHY 102: Physics II</p>
            <p>Sumaiya Alam Chowdhury</p>
            <p>Lecturer, DIU</p>
          </div>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="mt-24 text-gray-600 uppercase text-[10px] tracking-[1em]"
      >
        Thank you for your attention
      </motion.div>
    </motion.div>

    {/* Mini Particles */}
    {[...Array(30)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-physics-text opacity-10 rounded-full"
        animate={{
          opacity: [0.1, 0.4, 0.1],
          scale: [1, 1.5, 1],
        }}
        transition={{ duration: Math.random() * 3 + 2, repeat: Infinity }}
        style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}
      />
    ))}
  </div>
);
