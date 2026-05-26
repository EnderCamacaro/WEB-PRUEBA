import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PlayIcon, ChevronDownIcon } from './icons';
import { heroVideo } from '../config/videos';

function Particle({ style }) {
  return <div className="particle" style={style} />;
}

function HeroVideo({ src, poster }) {
  const ref = useRef(null);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    if (!ref.current || !ready) return;
    if (playing) { ref.current.pause(); setPlaying(false); }
    else { ref.current.play(); setPlaying(true); }
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden video-placeholder neon-border-strong" style={{ aspectRatio: '16/9', maxHeight: '480px' }}>
      <video ref={ref} src={src} poster={poster} onCanPlay={() => setReady(true)} onError={() => setReady(false)} onEnded={() => setPlaying(false)} playsInline preload="metadata" className="absolute inset-0 w-full h-full object-cover" style={{ display: ready ? 'block' : 'none' }} />
      {!ready && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-10">
          <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#2563EB,#60A5FA)', boxShadow: '0 0 40px rgba(59,130,246,0.6)' }}>
            <PlayIcon size={32} fillColor="white" strokeColor="white" />
          </div>
          <p className="text-slate-400 text-sm font-medium tracking-widest uppercase">Video Presentación</p>
          <p className="text-slate-600 text-xs">→ Coloca <code className="text-blue-400">hero_principal.mp4</code> en <code className="text-blue-400">/public/assets/videos/</code></p>
        </div>
      )}
      {ready && (
        <button onClick={toggle} className="absolute inset-0 w-full h-full flex items-center justify-center group z-20">
          <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: playing ? 0 : 1, opacity: playing ? 0 : 1 }} className="w-20 h-20 rounded-full flex items-center justify-center glass-strong neon-border">
            <PlayIcon size={30} fillColor="#60A5FA" strokeColor="#60A5FA" />
          </motion.div>
        </button>
      )}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-500 rounded-tl-2xl z-30" />
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-blue-500 rounded-tr-2xl z-30" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-blue-500 rounded-bl-2xl z-30" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-500 rounded-br-2xl z-30" />
    </div>
  );
}

const particles = Array.from({ length: 14 }, () => ({
  width: `${Math.random() * 5 + 3}px`, height: `${Math.random() * 5 + 3}px`,
  left: `${Math.random() * 100}%`, animationDuration: `${Math.random() * 12 + 10}s`, animationDelay: `${Math.random() * 10}s`,
}));

export default function Hero() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });

  const blob1Y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const blob2Y = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const blob3Y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const blob4Y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section ref={sectionRef} id="inicio" className="relative min-h-screen overflow-hidden grid-bg pt-32 sm:pt-40 pb-16 sm:pb-20" style={{ background: 'linear-gradient(160deg, #0A0A0F 0%, #050812 20%, #0D0820 50%, #050810 80%, #0A0A0F 100%)' }}>
      <motion.div className="absolute top-[-10%] right-[-10%] w-[700px] h-[700px] rounded-full pointer-events-none" style={{ y: blob1Y, background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)', filter: 'blur(90px)' }} />
      <motion.div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full pointer-events-none" style={{ y: blob2Y, background: 'radial-gradient(circle, rgba(147,51,234,0.08) 0%, transparent 70%)', filter: 'blur(80px)' }} />
      <motion.div className="absolute top-[40%] left-[-5%] w-[400px] h-[400px] rounded-full pointer-events-none" style={{ y: blob3Y, background: 'radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)', filter: 'blur(70px)' }} />
      <motion.div className="absolute top-[20%] right-[-5%] w-[350px] h-[350px] rounded-full pointer-events-none" style={{ y: blob4Y, background: 'radial-gradient(circle, rgba(236,72,153,0.05) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      <div className="particles-bg">{particles.map((p, i) => <Particle key={i} style={p} />)}</div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-8 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-blue-500/30 text-xs sm:text-sm font-medium text-blue-300 mt-4 sm:mt-8 glass" style={{ backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
          </span>
          Clases online · Metodología probada · Resultados reales
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}>
          <h1 className="section-title text-white leading-tight">
            Habla inglés con <span className="gradient-text neon-glow-text">confianza real</span><br />
            en <span className="gradient-text-gold">90 días</span>, garantizado.
          </h1>
          <p className="section-subtitle mt-5 max-w-2xl mx-auto">
            Método intensivo y personalizado de Omar Benvenuto. Sin memorizar reglas aburridas — habla desde el primer día y transforma tu carrera, tus viajes y tu vida.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }} className="flex flex-col sm:flex-row items-center gap-4">
          <button onClick={() => { const el = document.querySelector('#cursos'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}
            className="btn-primary px-10 py-4 rounded-2xl text-base sm:text-lg transition-transform duration-200 hover:scale-[1.06] active:scale-[0.96]">
            ENTRAR AHORA
          </button>
          <button onClick={() => { const el = document.querySelector('#cursos'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}
            className="btn-secondary px-8 py-4 rounded-2xl text-base sm:text-lg transition-transform duration-200 hover:scale-[1.03] active:scale-[0.97]">
            Ver cursos
          </button>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.35, ease: [0.25,0.46,0.45,0.94] }}
          className="w-full max-w-3xl rounded-2xl p-[1px] overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.3), rgba(147,51,234,0.15), transparent)', boxShadow: '0 0 60px rgba(59,130,246,0.15), 0 20px 60px rgba(0,0,0,0.5)' }}>
          <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(10,10,15,0.6)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}>
            <HeroVideo src={heroVideo.src} poster={heroVideo.poster} />
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }}
          className="grid grid-cols-3 gap-6 w-full max-w-xl mx-auto">
          {[{ v: '+1.200', l: 'Estudiantes' }, { v: '4.9★', l: 'Calificación' }, { v: '92%', l: 'Aprobación DET' }].map((s) => (
            <div key={s.l} className="flex flex-col items-center p-4 rounded-xl border border-white/5" style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }}>
              <span className="text-2xl sm:text-3xl font-black gradient-text">{s.v}</span>
              <span className="text-xs sm:text-sm text-slate-500 mt-1">{s.l}</span>
            </div>
          ))}
        </motion.div>
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
