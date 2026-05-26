import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ChevronDownIcon } from './icons';

function useTilt() {
  const ref = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRotate({ x: y * -8, y: x * 8 });
  };

  const reset = () => setRotate({ x: 0, y: 0 });

  const tiltProps = {
    ref,
    onMouseMove: handleMouse,
    onMouseLeave: reset,
    style: { transformStyle: 'preserve-3d' },
    animate: { rotateX: rotate.x, rotateY: rotate.y },
    transition: { type: 'spring', stiffness: 150, damping: 15 },
  };

  return tiltProps;
}

function ChartCard() {
  const tilt = useTilt();
  return (
    <div className="animate-float p-[1px] rounded-2xl" style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.35), rgba(147,51,234,0.2))' }}>
      <motion.div {...tilt} className="rounded-2xl overflow-hidden" style={{ ...tilt.style, background: 'linear-gradient(135deg, rgba(15,15,26,0.92), rgba(26,10,46,0.85))', backdropFilter: 'blur(12px)', perspective: '800px' }}>
        <div className="p-5 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-blue-300 text-xs font-semibold uppercase tracking-widest">Timeline de Transformación</p>
              <p className="text-slate-500 text-[10px] mt-0.5">Progreso promedio de alumnos</p>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full" style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" style={{ boxShadow: '0 0 6px rgba(74,222,128,0.6)' }} />
              <span className="text-green-400 text-[10px] font-semibold">En vivo</span>
            </div>
          </div>

          <svg viewBox="0 0 300 140" className="w-full h-auto" style={{ filter: 'drop-shadow(0 0 8px rgba(59,130,246,0.2))' }}>
            <defs>
              <linearGradient id="chartLine" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="50%" stopColor="#60A5FA" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
              <linearGradient id="chartArea" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(59,130,246,0.25)" />
                <stop offset="100%" stopColor="rgba(59,130,246,0)" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            <line x1="20" y1="125" x2="280" y2="125" stroke="rgba(59,130,246,0.08)" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="20" y1="90" x2="280" y2="90" stroke="rgba(59,130,246,0.06)" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="20" y1="55" x2="280" y2="55" stroke="rgba(59,130,246,0.06)" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="20" y1="20" x2="280" y2="20" stroke="rgba(59,130,246,0.06)" strokeWidth="1" strokeDasharray="4 4" />

            <path d="M25,122 Q60,118 80,105 T140,75 T200,50 T265,22" fill="none" stroke="url(#chartLine)" strokeWidth="2.5" strokeLinecap="round" filter="url(#glow)" />
            <path d="M25,122 Q60,118 80,105 T140,75 T200,50 T265,22 L265,125 L25,125 Z" fill="url(#chartArea)" />

            <circle cx="60" cy="110" r="4" fill="#3B82F6" stroke="#0F0F1A" strokeWidth="1.5" filter="url(#glow)" />
            <circle cx="150" cy="68" r="4" fill="#60A5FA" stroke="#0F0F1A" strokeWidth="1.5" filter="url(#glow)" />
            <circle cx="260" cy="24" r="4" fill="#8B5CF6" stroke="#0F0F1A" strokeWidth="1.5" filter="url(#glow)" />

            <text x="60" y="127" fill="#64748B" fontSize="8" textAnchor="middle" fontFamily="Inter">Día 1</text>
            <text x="60" y="137" fill="#94A3B8" fontSize="7" textAnchor="middle" fontFamily="Inter" fontStyle="italic">Bloqueo mental</text>
            <text x="150" y="83" fill="#64748B" fontSize="8" textAnchor="middle" fontFamily="Inter">Día 45</text>
            <text x="150" y="93" fill="#94A3B8" fontSize="7" textAnchor="middle" fontFamily="Inter" fontStyle="italic">Fluidez fluida</text>
            <text x="260" y="15" fill="#64748B" fontSize="8" textAnchor="middle" fontFamily="Inter">Día 90</text>
            <text x="260" y="6" fill="#94A3B8" fontSize="7" textAnchor="middle" fontFamily="Inter" fontStyle="italic">Negociando en inglés</text>
          </svg>
        </div>
      </motion.div>
    </div>
  );
}

function AudioCard() {
  const tilt = useTilt();
  const bars = Array.from({ length: 24 }, (_, i) => ({
    animationDuration: `${0.4 + Math.random() * 0.4}s`,
    animationDelay: `${i * 0.06}s`,
  }));

  return (
    <div className="animate-float-delayed p-[1px] rounded-xl hidden lg:block absolute -bottom-6 -right-4 w-[220px]" style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.25), rgba(147,51,234,0.15))' }}>
      <motion.div {...tilt} className="rounded-xl overflow-hidden" style={{ ...tilt.style, background: 'linear-gradient(135deg, rgba(15,15,26,0.92), rgba(26,10,46,0.85))', backdropFilter: 'blur(12px)', perspective: '800px' }}>
        <div className="p-3.5">
          <div className="flex items-center gap-2 mb-2.5">
            <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-[11px] font-semibold leading-tight truncate">Pronunciación Nativa</p>
              <p className="text-blue-300 text-[9px] leading-tight">Calibrando... 98%</p>
            </div>
          </div>
          <div className="flex items-end gap-[2px] h-8">
            {bars.map((b, i) => (
              <div key={i} className="sound-bar flex-1 rounded-full" style={{ background: 'linear-gradient(to top, #3B82F6, #8B5CF6)', animationDuration: b.animationDuration, animationDelay: b.animationDelay }} />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

const particles = Array.from({ length: 6 }, () => ({
  width: `${Math.random() * 5 + 3}px`, height: `${Math.random() * 5 + 3}px`,
  left: `${Math.random() * 100}%`, animationDuration: `${Math.random() * 12 + 10}s`, animationDelay: `${Math.random() * 10}s`,
}));

function Particle({ style }) {
  return <div className="particle" style={style} />;
}

export default function Hero() {
  const sectionRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });

  const noParallax = prefersReducedMotion ? 0 : undefined;
  const blob1Y = useTransform(scrollYProgress, [0, 1], noParallax ? [0, 0] : [0, 80]);
  const blob2Y = useTransform(scrollYProgress, [0, 1], noParallax ? [0, 0] : [0, -60]);
  const blob3Y = useTransform(scrollYProgress, [0, 1], noParallax ? [0, 0] : [0, 100]);

  return (
    <section ref={sectionRef} id="inicio" className="relative min-h-screen overflow-hidden grid-bg pt-32 sm:pt-36 pb-16 sm:pb-20" style={{ background: 'linear-gradient(160deg, #0A0A0F 0%, #050812 20%, #0D0820 50%, #050810 80%, #0A0A0F 100%)' }}>
      <motion.div className="absolute top-[-5%] right-[-5%] w-[500px] h-[500px] rounded-full pointer-events-none" style={{ y: blob1Y, background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)', filter: 'blur(40px)', willChange: 'transform' }} />
      <motion.div className="absolute bottom-[-5%] left-[-5%] w-[400px] h-[400px] rounded-full pointer-events-none" style={{ y: blob2Y, background: 'radial-gradient(circle, rgba(147,51,234,0.07) 0%, transparent 70%)', filter: 'blur(35px)', willChange: 'transform' }} />
      <motion.div className="absolute top-[30%] right-[-3%] w-[300px] h-[300px] rounded-full pointer-events-none" style={{ y: blob3Y, background: 'radial-gradient(circle, rgba(6,182,212,0.05) 0%, transparent 70%)', filter: 'blur(30px)', willChange: 'transform' }} />
      <div className="particles-bg">{particles.map((p, i) => <Particle key={i} style={p} />)}</div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row lg:items-center lg:gap-16">
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left lg:w-3/5">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-blue-500/30 text-xs sm:text-sm font-medium text-blue-300 mt-4 sm:mt-8 glass">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
            </span>
            Clases online · Metodología probada · Resultados reales
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}>
            <h1 className="section-title text-white leading-tight mt-5">
              Habla inglés con <span className="gradient-text neon-glow-text">confianza real</span><br className="sm:block hidden" />
              en <span className="gradient-text-gold">90 días</span>, garantizado.
            </h1>
            <p className="section-subtitle mt-5 max-w-xl">
              Olvida las reglas. Habla desde el día uno y transforma tu vida.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }} className="flex flex-col sm:flex-row items-center lg:items-start gap-4 mt-7">
            <button onClick={() => { const el = document.querySelector('#cursos'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}
              className="btn-primary px-10 py-4 rounded-2xl text-base sm:text-lg transition-transform duration-200 hover:scale-[1.06] active:scale-[0.96]">
              ENTRAR AHORA
            </button>
            <button onClick={() => { const el = document.querySelector('#cursos'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}
              className="btn-secondary px-8 py-4 rounded-2xl text-base sm:text-lg transition-transform duration-200 hover:scale-[1.03] active:scale-[0.97]">
              Ver cursos
            </button>
          </motion.div>
        </div>

        <div className="lg:w-2/5 mt-14 lg:mt-0">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.3, ease: [0.25,0.46,0.45,0.94] }} className="relative">
            <ChartCard />
            <AudioCard />
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.6 }}
            className="grid grid-cols-3 gap-3 mt-6 lg:mt-8 max-w-sm mx-auto lg:mx-0">
            {[{ v: '+1.200', l: 'Estudiantes' }, { v: '4.9★', l: 'Calificación' }, { v: '92%', l: 'Aprobación DET' }].map((s) => (
              <div key={s.l} className="flex flex-col items-center p-2.5 rounded-xl border border-white/5" style={{ background: 'rgba(255,255,255,0.03)' }}>
                <span className="text-lg sm:text-xl font-black gradient-text">{s.v}</span>
                <span className="text-[10px] sm:text-xs text-slate-500 mt-0.5">{s.l}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-600 text-xs">
        <span className="tracking-wider">Explorar</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}>
          <ChevronDownIcon size={18} />
        </motion.div>
      </motion.div>
    </section>
  );
}
