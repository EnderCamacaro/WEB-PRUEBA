import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon, PlayIcon, PauseIcon, UserIcon } from './icons';
import { testimonialVideos } from '../config/videos';

function Card({ video, active }) {
  const ref = useRef(null);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!active && ref.current && playing) { ref.current.pause(); setPlaying(false); }
  }, [active, playing]);

  const toggle = () => {
    if (!ref.current || !ready) return;
    if (playing) { ref.current.pause(); setPlaying(false); }
    else { ref.current.play(); setPlaying(true); }
  };

  return (
    <div
      className={`flex-shrink-0 rounded-2xl overflow-hidden ${
        active ? 'neon-border-strong z-10' : 'border border-blue-500/30 pointer-events-none'
      }`}
      style={{
        width: '280px',
        aspectRatio: '9/16',
        maxHeight: '540px',
        background: 'linear-gradient(180deg, #0F0F1A 0%, #1A0A2E 100%)',
        boxShadow: active ? '0 0 30px rgba(59,130,246,0.25), 0 10px 40px rgba(0,0,0,0.5)' : '0 8px 20px rgba(0,0,0,0.4)',
      }}
    >
      <div className="relative w-full h-full" style={{ background: '#0F0F1A' }}>
        <video ref={ref} src={video.src} poster={video.poster} onCanPlay={() => setReady(true)} onError={() => setReady(false)} onEnded={() => setPlaying(false)}
          playsInline preload="metadata" className="absolute inset-0 w-full h-full object-cover" style={{ display: ready ? 'block' : 'none' }} />
        {!ready && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 video-placeholder p-4" style={{ background: '#0F0F1A' }}>
            <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.3), rgba(96,165,250,0.2))', border: '2px solid rgba(59,130,246,0.4)', boxShadow: '0 0 25px rgba(59,130,246,0.3)' }}>
              <UserIcon size={24} />
            </div>
            <p className="text-blue-300 text-xs font-medium text-center">{video.name}</p>
            <div className="w-12 h-12 rounded-full flex items-center justify-center opacity-70" style={{ background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.3)' }}>
              <PlayIcon size={18} fillColor="#60A5FA" strokeColor="#60A5FA" />
            </div>
          </div>
        )}
        {ready && (
          <button onClick={toggle} className="absolute inset-0 z-10 flex items-center justify-center">
            <motion.div animate={{ scale: playing ? 0 : 1, opacity: playing ? 0 : 1 }} className={`w-12 h-12 rounded-full flex items-center justify-center glass-strong neon-border ${active ? '' : 'hidden'}`}>
              {playing ? <PauseIcon size={20} /> : <PlayIcon size={20} fillColor="#60A5FA" strokeColor="#60A5FA" />}
            </motion.div>
          </button>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-3 z-20" style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.9))' }}>
          <div className="flex items-center gap-2">
            <span className="text-lg">{video.flag}</span>
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs sm:text-sm font-semibold leading-tight truncate">{video.name}</p>
              <p className="text-blue-300 text-[10px] sm:text-xs mt-0.5 line-clamp-2 leading-tight">{video.result}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Carousel() {
  const [idx, setIdx] = useState(0);
  const total = testimonialVideos.length;
  const goTo = useCallback((i) => setIdx(Math.max(0, Math.min(i, total - 1))), [total]);
  const prev = useCallback(() => goTo(idx - 1), [idx, goTo]);
  const next = useCallback(() => goTo(idx + 1), [idx, goTo]);

  const tx = useRef(0);
  const onTouchStart = (e) => { tx.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    const d = tx.current - e.changedTouches[0].clientX;
    if (d > 50) next(); else if (d < -50) prev();
  };

  useEffect(() => {
    const h = (e) => { if (e.key === 'ArrowLeft') prev(); if (e.key === 'ArrowRight') next(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [prev, next]);

  const tween = { type: 'tween', duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] };

  return (
    <section id="testimonios" className="relative py-16 sm:py-20 lg:py-24 overflow-hidden" style={{ background: 'linear-gradient(160deg, #0A0A0F 0%, #100A1A 25%, #0A0812 55%, #08080F 80%, #0A0A0F 100%)' }}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(147,51,234,0.06) 0%, transparent 70%)', filter: 'blur(40px)' }} />
      <div className="absolute top-0 left-0 w-[300px] h-[300px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.04) 0%, transparent 70%)', filter: 'blur(35px)' }} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest">Testimonios Reales</span>
          <h2 className="section-title text-white mt-3">Clientes <span className="gradient-text">Satisfechos</span></h2>
          <p className="section-subtitle mt-4 max-w-xl mx-auto">Escucha directamente de quienes ya transformaron su vida con el metodo de Omar.</p>
        </motion.div>

        <div className="relative flex items-center justify-center select-none mx-auto" style={{ minHeight: '540px', touchAction: 'pan-y' }} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          <div className="relative" style={{ width: '280px', height: '540px' }}>
            <AnimatePresence>
              {testimonialVideos.map((video, i) => {
                const offset = i - idx;
                if (Math.abs(offset) > 1) return null;

                const isActive = offset === 0;
                const x = offset * 180;
                const scale = isActive ? 1 : 0.85;

                return (
                  <motion.div
                    key={video.id}
                    style={{ position: 'absolute', top: 0, left: 0, right: 0, width: '280px' }}
                    initial={false}
                    animate={{ x, scale, zIndex: isActive ? 10 : 0 }}
                    exit={{ scale: 0.5, zIndex: 0 }}
                    transition={tween}
                  >
                    <Card video={video} active={isActive} />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          <button onClick={prev} disabled={idx === 0}
            className="absolute left-0 z-20 w-11 h-11 rounded-full glass neon-border flex items-center justify-center disabled:opacity-20 disabled:cursor-not-allowed transition-transform duration-200 hover:scale-110 active:scale-90 -translate-x-2 sm:-translate-x-8"
            aria-label="Anterior">
            <ChevronLeftIcon size={20} />
          </button>
          <button onClick={next} disabled={idx === total - 1}
            className="absolute right-0 z-20 w-11 h-11 rounded-full glass neon-border flex items-center justify-center disabled:opacity-20 disabled:cursor-not-allowed transition-transform duration-200 hover:scale-110 active:scale-90 translate-x-2 sm:translate-x-8"
            aria-label="Siguiente">
            <ChevronRightIcon size={20} />
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 mt-6">
          {testimonialVideos.map((_, i) => (
            <button key={i} onClick={() => goTo(i)}
              className="transition-all duration-300 rounded-full"
              style={{
                width: i === idx ? '28px' : '8px', height: '8px',
                background: i === idx ? 'linear-gradient(90deg,#3B82F6,#93C5FD)' : 'rgba(59,130,246,0.3)',
                boxShadow: i === idx ? '0 0 12px rgba(59,130,246,0.6)' : 'none',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
