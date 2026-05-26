const items = [
  { text: 'Aprobé el DET', depth: 0 },
  { text: 'Habla fluido', depth: 1 },
  { text: 'Sin traducir', depth: 2 },
  { text: 'Pienso en inglés', depth: 0 },
  { text: '100% real', depth: 1 },
  { text: 'Business English', depth: 2 },
  { text: 'Pronunciación clara', depth: 0 },
  { text: 'Viajo sin miedo', depth: 1 },
  { text: 'Listening fácil', depth: 2 },
  { text: 'Fluidez total', depth: 0 },
  { text: 'Entrevista en inglés', depth: 1 },
  { text: 'Confianza al hablar', depth: 2 },
  { text: 'Inglés natural', depth: 0 },
  { text: 'Vocabulario real', depth: 1 },
  { text: 'Sin gramática', depth: 2 },
];

const depthCfg = [
  { blur: '0px', speed: 1, opacity: '0.08', tailOff: 20 },
  { blur: '2px', speed: 0.65, opacity: '0.05', tailOff: 14 },
  { blur: '4px', speed: 0.4, opacity: '0.03', tailOff: 10 },
];

export default function AtmosphereBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {items.map((item, i) => {
        const cfg = depthCfg[item.depth];
        const left = 2 + ((i * 13 + 7) % 96);
        const bottom = -100 + ((i * 29 + 11) % 200);
        const dur = 20 + item.depth * 12 + (i % 4) * 2.5;
        const del = -(i * 3.1 + (i % 3) * 1.8);
        const fs = 10 + (1.5 - item.depth * 0.5) * 3;

        return (
          <div
            key={i}
            className="bubble"
            style={{
              left: `${left}%`,
              bottom: `${bottom}px`,
              opacity: cfg.opacity,
              filter: `blur(${cfg.blur})`,
              animation: `rise ${dur}s ${del}s linear infinite`,
            }}
          >
            <span style={{ fontSize: `${fs}px` }}>{item.text}</span>
            <div className="tail" style={{ left: `${cfg.tailOff}px` }} />
          </div>
        );
      })}
      <style>{`
        .bubble {
          position: absolute;
          padding: 5px 11px 6px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.06);
          background: rgba(255,255,255,0.02);
          white-space: nowrap;
          font-weight: 500;
          letter-spacing: 0.02em;
          color: rgba(255,255,255,0.9);
          pointer-events: none;
        }
        .tail {
          position: absolute;
          bottom: -5px;
          width: 8px;
          height: 8px;
          border-right: 1px solid rgba(255,255,255,0.06);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          background: rgba(255,255,255,0.02);
          transform: rotate(45deg);
          border-radius: 0 0 2px 0;
        }
        @keyframes rise {
          0% { transform: translateY(0) translateX(0); }
          15% { transform: translateY(-70px) translateX(6px); }
          30% { transform: translateY(-140px) translateX(-4px); }
          50% { transform: translateY(-210px) translateX(8px); }
          70% { transform: translateY(-280px) translateX(-3px); }
          85% { transform: translateY(-330px) translateX(5px); }
          100% { transform: translateY(-380px) translateX(2px); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
