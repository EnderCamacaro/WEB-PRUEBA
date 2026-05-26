import { INSTAGRAM_URL, WHATSAPP_NUMBER, WHATSAPP_MESSAGE } from '../config/videos';
import { MessageCircleIcon } from './icons';

function Svg({ size, children, viewBox = "0 0 24 24" }) {
  return <svg width={size} height={size} viewBox={viewBox} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{children}</svg>;
}

export default function Footer() {
  const year = new Date().getFullYear();
  const nav = (href) => { const el = document.querySelector(href); if (el) el.scrollIntoView({ behavior: 'smooth' }); };
  const socialLinks = [
    { icon: <Svg size={16}><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></Svg>, href: INSTAGRAM_URL, label: 'Instagram' },
    { icon: <span className="text-blue-400"><MessageCircleIcon size={16} /></span>, href: `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`, label: 'WhatsApp' },
  ];
  const navLinks = [
    { label: 'Metodologia', href: '#beneficios' },
    { label: 'Cursos', href: '#cursos' },
    { label: 'Testimonios', href: '#testimonios' },
  ];

  return (
    <footer className="relative pt-10 sm:pt-20 pb-4 sm:pb-8 overflow-hidden" style={{ background: 'linear-gradient(180deg, #0A0A0F 0%, #050812 40%, #020205 70%, #000 100%)' }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.5), transparent)' }} />
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile: compact single row */}
        <div className="flex flex-col md:hidden gap-3 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white font-black text-xs bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.4)]">OB</div>
              <span className="font-bold text-sm text-white">Omar <span className="text-blue-400">Benvenuto</span></span>
            </div>
            <div className="flex items-center gap-2">
              {socialLinks.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  className="w-8 h-8 rounded-lg border border-blue-500/20 bg-slate-800/50 flex items-center justify-center text-slate-400 transition-all duration-200 hover:text-blue-400 hover:bg-blue-900/30 active:scale-90">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {navLinks.map((l) => (
              <button key={l.href} onClick={() => nav(l.href)}
                className="text-xs font-medium text-slate-500 hover:text-blue-400 transition-colors px-2.5 py-1 rounded-md bg-white/[0.03] hover:bg-white/[0.06]">{l.label}</button>
            ))}
          </div>
        </div>

        {/* Desktop: 3-column grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-lg bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.5)]">OB</div>
              <span className="font-bold text-lg text-white">Omar <span className="text-blue-400">Benvenuto</span></span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed max-w-xs">Profesor de ingles online. Metodo inmersivo que transforma tu vida profesional y personal en 90 dias.</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">Navegacion</h4>
            <div className="flex flex-col gap-3">
              {navLinks.map((l) => (
                <button key={l.href} onClick={() => nav(l.href)} className="text-sm font-medium text-slate-500 hover:text-blue-400 transition-colors text-left">{l.label}</button>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">Redes Sociales</h4>
            <div className="flex items-center gap-3">
              {socialLinks.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  className="w-10 h-10 rounded-xl border border-blue-500/20 bg-slate-800/50 flex items-center justify-center text-slate-400 transition-all duration-300 hover:text-blue-400 hover:bg-blue-900/30 hover:scale-[1.15] hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] active:scale-[0.92]">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="h-px w-full mb-3 sm:mb-6" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)' }} />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] sm:text-xs font-medium text-slate-600">
          <p>&copy; {year} Omar Benvenuto. Todos los derechos reservados.</p>
          <p>Hecho con <span className="text-blue-500">&hearts;</span> para transformar vidas.</p>
        </div>
      </div>
    </footer>
  );
}
