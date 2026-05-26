import { motion } from 'framer-motion';
import { ChevronRightIcon } from './icons';
import imgEstructuras from '../assets/images/courses/curso-estructuras.webp';
import imgBases from '../assets/images/courses/bases-del-ingles.webp';
import imgIa from '../assets/images/courses/curso-ia.webp';
import imgDet from '../assets/images/courses/curso-det.webp';
import imgNegocios from '../assets/images/courses/ingles-para-negocios.webp';
import imgViajes from '../assets/images/courses/ingles-para-viajes.webp';

function PriceRibbon({ price }) {
  return (
    <div className="absolute text-center font-bold text-base text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] pointer-events-none z-20"
      style={{
        top: '18px', left: '-35px', width: '150px', padding: '8px 0',
        transform: 'rotate(-45deg)',
        background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
        boxShadow: '0 2px 8px rgba(59,130,246,0.4)',
      }}>
      {price}
    </div>
  );
}

const courses = [
  { id: 'estructuras', title: 'Estructuras en ingles', image: imgEstructuras, color: '#3B82F6', price: '$29/mes', desc: 'Aprende a construir oraciones correctamente paso a paso, desde lo mas basico hasta estructuras complejas.', topics: ['Gramatica esencial', 'Tiempos verbales', 'Formacion de oraciones', 'Ejercicios interactivos'] },
  { id: 'bases', title: 'Bases del ingles', image: imgBases, color: '#60A5FA', price: '$39/mes', desc: 'Domina las bases solidas del idioma con pronunciacion americana y vocabulario esencial.', topics: ['Pronunciacion americana', 'Top 500 palabras', 'Conversacion basica fluida'] },
  { id: 'ia', title: 'Curso de IA', image: imgIa, color: '#93C5FD', price: '$49/mes', desc: 'Aprende ingles aprovechando herramientas de Inteligencia Artificial para acelerar tu aprendizaje.', topics: ['Prompts en ingles profesional', 'Vocabulario tech & AI', 'Escritura con IA'] },
  { id: 'det', title: 'Certificacion DET', image: imgDet, color: '#34D399', price: '$59/mes', desc: 'Curso intensivo para aprobar el Duolingo English Test con simulacros y estrategias reales.', topics: ['Simulacros de examen reales', 'Estrategias de cada seccion', 'Garantia de mejora'] },
  { id: 'negocios', title: 'Ingles para negocios', image: imgNegocios, color: '#F59E0B', price: '$49/mes', desc: 'Ingles para cerrar tratos, liderar reuniones y escalar en tu carrera profesional.', topics: ['Negociacion en ingles', 'Email & writing profesional', 'Vocabulario financiero'] },
  { id: 'viajes', title: 'Ingles para viajes', image: imgViajes, color: '#A78BFA', price: '$39/mes', desc: 'Viaja sin miedo. Aprende todo lo que necesitas para moverte por el mundo con confianza.', topics: ['Aeropuerto & migraciones', 'Hoteles & restaurantes', 'Emergencias & transporte'] },
];

function CourseCard({ course, index }) {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className="flex flex-col group w-full max-w-[320px] mx-auto">
      <div className="relative w-full h-[210px] rounded-2xl p-[1px] overflow-hidden cursor-pointer"
        style={{ background: `linear-gradient(135deg, ${course.color}50 0%, rgba(15,23,42,0) 100%)`, boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
        <div className="absolute inset-0 rounded-2xl overflow-hidden">
          <PriceRibbon price={course.price} />
          <img src={course.image} alt={course.title} className="w-full h-full object-cover" loading="lazy" />
        </div>
        <div className="hidden sm:flex absolute inset-0 z-30 flex-col items-center justify-center p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out"
          style={{ background: 'rgba(10,10,15,0.92)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }}>
          <p className="text-white/80 text-xs leading-[1.4] text-center mb-2.5">{course.desc}</p>
          <div className="flex flex-wrap justify-center gap-1.5">{course.topics.map((t, i) => (
            <span key={i} className="text-[10px] font-medium text-slate-400 bg-slate-800/70 px-2 py-1 rounded-full border border-slate-700">{t}</span>
          ))}</div>
          <button className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white shadow-lg hover:scale-110 active:scale-95 transition-transform">
            <ChevronRightIcon size={20} />
          </button>
        </div>
      </div>
      <div className="block sm:hidden mt-3 text-center max-w-[320px] mx-auto space-y-2">
        <p className="text-white/80 text-xs leading-[1.4]">{course.desc}</p>
        <div className="flex flex-wrap justify-center gap-1.5">{course.topics.map((t, i) => (
          <span key={i} className="text-[10px] font-medium text-slate-400 bg-slate-800/70 px-2 py-1 rounded-full border border-slate-700">{t}</span>
        ))}</div>
        <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-bold tracking-wider uppercase px-5 py-3 rounded-xl shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-transform">
          Inscribirme
        </button>
      </div>
      <div className="mt-4 text-center max-w-[320px] mx-auto">
        <h3 className="text-white font-bold text-xl sm:text-2xl leading-tight">{course.title}</h3>
      </div>
    </motion.div>
  );
}

export default function Courses() {
  return (
    <section id="cursos" className="relative py-16 sm:py-20 lg:py-24 overflow-hidden" style={{ background: 'linear-gradient(160deg, #0A0A0F 0%, #0D0820 30%, #050810 60%, #0A0F1A 100%)' }}>
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)', filter: 'blur(70px)' }} />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(147,197,253,0.04) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.05) 0%, transparent 70%)', filter: 'blur(50px)' }} />
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <span className="text-blue-400 text-sm font-bold uppercase tracking-widest">Catalogo de Modalidades</span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mt-3">Elige tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Camino</span></h2>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto text-sm sm:text-base">Selecciona la modalidad de aprendizaje que mejor se adapte a tus objetivos.</p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-[80px]">
          {courses.map((c, i) => <CourseCard key={c.id} course={c} index={i} />)}
        </div>
      </div>
    </section>
  );
}
