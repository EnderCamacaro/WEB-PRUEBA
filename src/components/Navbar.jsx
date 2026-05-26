import { useState, useEffect } from 'react';
import { MenuIcon, XIcon } from './icons';

const links = [
  { label: 'Metodologia', href: '#beneficios' },
  { label: 'Cursos', href: '#cursos' },
  { label: 'Testimonios', href: '#testimonios' },
];

function getActiveLink() {
  const scrollY = window.scrollY + 120;
  const sections = links.map(l => {
    const el = document.querySelector(l.href);
    if (!el) return { ...l, offset: Infinity };
    return { ...l, offset: el.offsetTop };
  });
  let active = sections[0]?.label || '';
  for (const s of sections) {
    if (scrollY >= s.offset) active = s.label;
  }
  return active;
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
      setActive(getActiveLink());
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const nav = (href) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.5)] border-b border-blue-900/20'
            : 'bg-transparent backdrop-blur-sm'
        }`}
        style={{
          animation: 'navEnter 0.7s cubic-bezier(0.25,0.46,0.45,0.94) forwards',
          background: scrolled
            ? 'linear-gradient(180deg, rgba(10,10,15,0.92) 0%, rgba(13,8,32,0.88) 100%)'
            : 'transparent',
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3">
            <div className="flex-1 flex justify-start">
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2.5 transition-transform duration-200 hover:scale-[1.03] active:scale-[0.97] group">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-sm bg-gradient-to-br from-blue-500 to-blue-700 shadow-[0_0_15px_rgba(37,99,235,0.5)] group-hover:shadow-[0_0_20px_rgba(37,99,235,0.7)] transition-shadow duration-300">OB</div>
                <span className="font-bold text-sm sm:text-base text-white tracking-tight">Omar <span className="text-blue-400">Benvenuto</span></span>
              </button>
            </div>

            <div className="flex-1 flex justify-center">
              <div className="hidden md:flex items-center gap-1">
                {links.map((l) => (
                  <button key={l.href} onClick={() => nav(l.href)}
                    className={`relative px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                      active === l.label
                        ? 'text-white bg-blue-500/10 shadow-[0_0_12px_rgba(59,130,246,0.15)]'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]'
                    }`}>
                    {l.label}
                    {active === l.label && <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-5 h-[2px] bg-blue-500 rounded-full shadow-[0_0_6px_rgba(59,130,246,0.6)]" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 flex justify-end items-center gap-3">
              <button onClick={() => nav('#cursos')} className="hidden md:inline-flex bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold px-5 py-2 rounded-xl text-sm transition-all shadow-[0_4px_15px_rgba(37,99,235,0.4)] hover:shadow-[0_6px_25px_rgba(37,99,235,0.5)] hover:scale-105 active:scale-95">Entrar</button>
              <button className="md:hidden p-2 rounded-xl bg-slate-800/80 text-blue-400 active:scale-90 transition-transform" onClick={() => setOpen(!open)}>
                {open ? <XIcon size={22} /> : <MenuIcon size={22} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className={`fixed top-[60px] left-0 right-0 z-40 bg-[#0A0A0F]/90 backdrop-blur-xl border-b border-blue-900/20 p-5 flex flex-col gap-3 shadow-2xl transition-all duration-200 ${open ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`} style={{ background: 'linear-gradient(180deg, rgba(10,10,15,0.95) 0%, rgba(13,8,32,0.92) 100%)' }}>
        {links.map((l) => (
          <button key={l.href} onClick={() => nav(l.href)}
            className={`text-left text-base font-bold py-3 px-3 rounded-xl transition-all ${
              active === l.label ? 'text-blue-400 bg-blue-500/10 shadow-[0_0_12px_rgba(59,130,246,0.1)]' : 'text-slate-400 hover:text-white hover:bg-white/[0.03]'
            }`}>{l.label}</button>
        ))}
        <button onClick={() => nav('#cursos')} className="bg-gradient-to-br from-blue-600 to-blue-700 text-white font-bold py-3.5 rounded-xl text-base mt-2 shadow-[0_4px_20px_rgba(37,99,235,0.4)]">Entrar</button>
      </div>

      <style>{`@keyframes navEnter{from{transform:translateY(-80px);opacity:0}to{transform:translateY(0);opacity:1}}`}</style>
    </>
  );
}
