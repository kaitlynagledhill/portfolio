"use client";

import { useEffect, useRef, useState } from "react";

const STYLES = `
@keyframes ic-riseUp {
  from { transform: translateY(28px); opacity: 0; }
  to   { transform: translateY(0);    opacity: 1; }
}
@keyframes ic-fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes ic-winBlink {
  0%,100% { fill: #ffe566; }
  50%     { fill: #ffb700; }
}
@keyframes ic-winLight {
  0%,100% { fill: rgba(255,229,102,0.9); }
  50%     { fill: rgba(255,183,0,0.6);   }
}
@keyframes ic-antennaBlink {
  0%,100% { fill: #ff3f5b; }
  50%     { fill: #ffb700; }
}
@keyframes ic-cloudDrift {
  0%,100% { transform: translateX(0);  }
  50%     { transform: translateX(9px);}
}
@keyframes ic-carMove {
  0%   { transform: translateX(0);   }
  100% { transform: translateX(60px);}
}
@keyframes ic-carMove2 {
  0%   { transform: translateX(0);    }
  100% { transform: translateX(-55px);}
}
@keyframes ic-drawLine {
  from { stroke-dashoffset: 120; }
  to   { stroke-dashoffset: 0;   }
}
@keyframes ic-popDot {
  from { r: 0; opacity: 0; }
  to   { r: 3; opacity: 1; }
}

.ic-b1  { animation: ic-riseUp 0.75s cubic-bezier(0.22,1,0.36,1) both; }
.ic-b2  { animation: ic-riseUp 0.75s cubic-bezier(0.22,1,0.36,1) 0.18s both; }
.ic-b3  { animation: ic-riseUp 0.75s cubic-bezier(0.22,1,0.36,1) 0.36s both; }
.ic-b4  { animation: ic-riseUp 0.75s cubic-bezier(0.22,1,0.36,1) 0.54s both; }
.ic-b5  { animation: ic-riseUp 0.75s cubic-bezier(0.22,1,0.36,1) 0.72s both; }

.ic-roads   { animation: ic-fadeIn 0.5s ease both; }
.ic-trees   { animation: ic-fadeIn 0.5s ease 0.9s both; }
.ic-details { animation: ic-fadeIn 0.5s ease 1.1s both; }
.ic-network { animation: ic-fadeIn 0.6s ease 1.3s both; }
.ic-clouds  { animation: ic-fadeIn 0.8s ease 1.5s both; }

.ic-win-blink { animation: ic-winBlink 2.2s ease-in-out infinite; }
.ic-win-light { animation: ic-winLight 3s   ease-in-out infinite; }
.ic-ant-blink { animation: ic-antennaBlink 1.6s ease-in-out infinite; }
.ic-cloud1    { animation: ic-cloudDrift 6s  ease-in-out infinite; transform-origin: 80px  78px; }
.ic-cloud2    { animation: ic-cloudDrift 8s  ease-in-out infinite 2s; transform-origin: 440px 58px; }
.ic-car1      { animation: ic-carMove  7s  linear infinite 1.5s; }
.ic-car2      { animation: ic-carMove2 9s  linear infinite 2s;   }

.ic-net-line { stroke-dasharray: 120; animation: ic-drawLine 0.8s ease 1.4s both; }
.ic-net-dot  { animation: ic-popDot 0.4s cubic-bezier(0.34,1.56,0.64,1) 1.8s both; }

/* paused until visible */
.ic-paused * { animation-play-state: paused !important; }
.ic-playing * { animation-play-state: running !important; }

.ic-section {
  border-top: 1px solid rgba(13,13,26,0.07);
  border-bottom: 1px solid rgba(13,13,26,0.07);
  background: #fafaff;
  padding: 3rem 2rem 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  overflow: hidden;
}
.ic-eyebrow {
  font-size: 10px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #9895b0;
  font-weight: 700;
  font-family: 'Space Grotesk', sans-serif;
}
.ic-caption {
  font-family: 'Instrument Serif', serif;
  font-size: 1rem;
  font-style: italic;
  color: #4a4760;
  text-align: center;
}
`;

export default function IsometricCity() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{STYLES}</style>
      <div
        ref={ref}
        className="ic-section"
        aria-hidden="true"
      >
        <p className="ic-eyebrow">Systems Thinking</p>

        <svg
          viewBox="0 0 560 340"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "100%", maxWidth: 620, overflow: "visible" }}
          className={visible ? "ic-playing" : "ic-paused"}
        >
          <defs>
            <filter id="ic-shadow">
              <feDropShadow dx="3" dy="5" stdDeviation="4" floodColor="rgba(13,13,26,0.16)" />
            </filter>
          </defs>

          {/* ── GROUND + ROADS ── */}
          <g className="ic-roads">
            <ellipse cx="280" cy="298" rx="230" ry="52" fill="#e8e4f5" opacity="0.45" />
            {/* horizontal road */}
            <line x1="60" y1="282" x2="500" y2="282" stroke="#d4cfea" strokeWidth="18" strokeLinecap="round" />
            {/* vertical road */}
            <line x1="280" y1="200" x2="280" y2="320" stroke="#d4cfea" strokeWidth="14" strokeLinecap="round" />
            {/* road markings */}
            {[150,180,210,340,370,400].map(x => (
              <line key={x} x1={x} y1="282" x2={x+14} y2="282" stroke="#fff" strokeWidth="2" opacity="0.65" />
            ))}
            {[210,235,260,295].map(y => (
              <line key={y} x1="280" y1={y} x2="280" y2={y+12} stroke="#fff" strokeWidth="2" opacity="0.65" />
            ))}
          </g>

          {/* ── BUILDING 1: Cobalt tall tower (centre-left) ── */}
          <g className="ic-b1" filter="url(#ic-shadow)">
            {/* shadow face */}
            <polygon points="170,222 192,235 192,308 170,295" fill="#1e2e8a" />
            {/* front face */}
            <polygon points="148,210 170,222 170,295 148,282" fill="#3d5afe" />
            {/* top face */}
            <polygon points="148,210 170,198 192,210 170,222" fill="#6b84ff" />
            {/* front windows */}
            {[[152,216],[152,232],[152,248],[152,264],[161,216],[161,232],[161,248],[161,264]].map(([x,y],i)=>(
              <rect key={i} x={x} y={y} width="6" height="9" rx="1"
                fill={[0,3,5].includes(i) ? "#ffe566" : "rgba(255,255,255,0.28)"}
                className={[0,3,5].includes(i) ? "ic-win-blink" : ""}
                style={[0,3,5].includes(i) ? { animationDelay: `${2+i*0.35}s` } : {}}
              />
            ))}
            {/* side windows */}
            {[[173,228],[182,234],[173,246],[182,252],[173,262]].map(([x,y],i)=>(
              <rect key={i} x={x} y={y} width="6" height="9" rx="1" fill="rgba(0,0,0,0.18)" />
            ))}
            {/* antenna */}
            <line x1="170" y1="198" x2="170" y2="182" stroke="#3d5afe" strokeWidth="1.5" />
            <circle cx="170" cy="181" r="3.5" className="ic-ant-blink" />
          </g>

          {/* ── BUILDING 2: Pink/coral tower (right) ── */}
          <g className="ic-b2" filter="url(#ic-shadow)">
            <polygon points="348,210 374,224 374,298 348,284" fill="#a01040" />
            <polygon points="322,197 348,210 348,284 322,270" fill="#f72585" />
            <polygon points="322,197 348,184 374,197 348,210" fill="#ff6bb0" />
            {[[326,204],[338,204],[326,220],[338,220],[326,236],[338,236],[326,252],[338,252]].map(([x,y],i)=>(
              <rect key={i} x={x} y={y} width="8" height="10" rx="1"
                fill={[1,2,5,6].includes(i) ? "rgba(255,229,102,0.9)" : "rgba(255,255,255,0.3)"}
                className={[1,2,5,6].includes(i) ? "ic-win-light" : ""}
                style={[1,2,5,6].includes(i) ? { animationDelay: `${2.2+i*0.28}s` } : {}}
              />
            ))}
            {[[351,218],[362,224],[351,236],[362,242],[351,252]].map(([x,y],i)=>(
              <rect key={i} x={x} y={y} width="7" height="10" rx="1" fill="rgba(0,0,0,0.17)" />
            ))}
            {/* rooftop parapet */}
            <rect x="334" y="180" width="28" height="5" rx="1" fill="#ff6bb0" />
            <rect x="342" y="175" width="12" height="6" rx="1" fill="#ff6bb0" />
          </g>

          {/* ── BUILDING 3: Lime squat building (far left) ── */}
          <g className="ic-b3" filter="url(#ic-shadow)">
            <polygon points="108,252 128,263 128,300 108,289" fill="#3d7000" />
            <polygon points="88,241 108,252 108,289 88,278" fill="#aaeb00" />
            <polygon points="88,241 108,230 128,241 108,252" fill="#ccff33" />
            {[[92,247],[103,247],[92,262],[103,262],[92,277],[103,277]].map(([x,y],i)=>(
              <rect key={i} x={x} y={y} width="8" height="10" rx="1"
                fill={[1,4].includes(i) ? "#ffe566" : "rgba(255,255,255,0.38)"}
                className={[1,4].includes(i) ? "ic-win-blink" : ""}
                style={[1,4].includes(i) ? { animationDelay: `${2.6+i*0.4}s` } : {}}
              />
            ))}
            {[[110,256],[110,270],[110,282]].map(([x,y],i)=>(
              <rect key={i} x={x} y={y} width="8" height="10" rx="1" fill="rgba(0,0,0,0.19)" />
            ))}
            {/* rooftop AC units */}
            <rect x="90" y="226" width="12" height="6" rx="1" fill="#8acd00" />
            <rect x="106" y="223" width="10" height="8" rx="1" fill="#8acd00" />
          </g>

          {/* ── BUILDING 4: Violet slender tower (far right) ── */}
          <g className="ic-b4" filter="url(#ic-shadow)">
            <polygon points="418,232 442,245 442,300 418,287" fill="#5b21b6" />
            <polygon points="394,220 418,232 418,287 394,275" fill="#8b5cf6" />
            <polygon points="394,220 418,208 442,220 418,232" fill="#a78bfa" />
            {[[398,226],[408,226],[398,242],[408,242],[398,256],[408,256],[398,270],[408,270]].map(([x,y],i)=>(
              <rect key={i} x={x} y={y} width="7" height="10" rx="1"
                fill={[0,3,5,6].includes(i) ? "rgba(255,229,102,0.9)" : "rgba(255,255,255,0.28)"}
                className={[0,3,5,6].includes(i) ? "ic-win-light" : ""}
                style={[0,3,5,6].includes(i) ? { animationDelay: `${2.1+i*0.32}s` } : {}}
              />
            ))}
            {[[421,238],[431,244],[421,254],[431,260],[421,268]].map(([x,y],i)=>(
              <rect key={i} x={x} y={y} width="7" height="10" rx="1" fill="rgba(0,0,0,0.17)" />
            ))}
            {/* spire */}
            <line x1="418" y1="208" x2="418" y2="190" stroke="#8b5cf6" strokeWidth="2" />
            <polygon points="413,196 418,182 423,196" fill="#a78bfa" />
          </g>

          {/* ── BUILDING 5: Teal mid building (centre) ── */}
          <g className="ic-b5" filter="url(#ic-shadow)">
            <polygon points="244,244 268,257 268,298 244,285" fill="#007a6b" />
            <polygon points="220,232 244,244 244,285 220,273" fill="#00c9b1" />
            <polygon points="220,232 244,220 268,232 244,244" fill="#33ddc7" />
            {[[224,238],[236,238],[224,253],[236,253],[224,266],[236,266]].map(([x,y],i)=>(
              <rect key={i} x={x} y={y} width="8" height="10" rx="1"
                fill={[0,3].includes(i) ? "rgba(255,229,102,0.9)" : "rgba(255,255,255,0.38)"}
                className={[0,3].includes(i) ? "ic-win-light" : ""}
                style={[0,3].includes(i) ? { animationDelay: `${2.4+i*0.3}s` } : {}}
              />
            ))}
            {[[247,248],[258,254],[247,262],[258,268]].map(([x,y],i)=>(
              <rect key={i} x={x} y={y} width="7" height="10" rx="1" fill="rgba(0,0,0,0.17)" />
            ))}
            {/* rooftop */}
            <rect x="230" y="216" width="28" height="5" rx="1" fill="#33ddc7" />
          </g>

          {/* ── TREES ── */}
          <g className="ic-trees">
            <ellipse cx="68" cy="272" rx="13" ry="15" fill="#aaeb00" opacity="0.88" />
            <rect x="66" y="280" width="4" height="10" fill="#5a7a00" />
            <ellipse cx="56" cy="280" rx="10" ry="12" fill="#8acd00" opacity="0.8" />
            <ellipse cx="476" cy="268" rx="12" ry="14" fill="#aaeb00" opacity="0.88" />
            <rect x="474" y="276" width="4" height="10" fill="#5a7a00" />
            <ellipse cx="490" cy="274" rx="10" ry="12" fill="#8acd00" opacity="0.8" />
          </g>

          {/* ── DETAILS: streetlights, cars ── */}
          <g className="ic-details">
            {/* streetlights */}
            {[248,312].map((x,i)=>(
              <g key={i}>
                <line x1={x} y1="263" x2={x} y2="296" stroke="#a899e0" strokeWidth="2" />
                <circle cx={x} cy="261" r="4.5" fill="#ffe566" opacity="0.9" />
              </g>
            ))}
            {/* car 1 — cobalt, moves right */}
            <g className="ic-car1">
              <rect x="128" y="275" width="24" height="11" rx="3" fill="#3d5afe" />
              <rect x="131" y="271" width="18" height="6" rx="2" fill="#6b84ff" />
              <circle cx="132" cy="287" r="3.5" fill="#1a1a2e" />
              <circle cx="148" cy="287" r="3.5" fill="#1a1a2e" />
              <rect x="149" y="277" width="3" height="4" rx="1" fill="#ffe566" opacity="0.9" />
            </g>
            {/* car 2 — pink, moves left */}
            <g className="ic-car2">
              <rect x="330" y="275" width="22" height="11" rx="3" fill="#f72585" />
              <rect x="333" y="271" width="16" height="6" rx="2" fill="#ff6bb0" />
              <circle cx="334" cy="287" r="3.5" fill="#1a1a2e" />
              <circle cx="348" cy="287" r="3.5" fill="#1a1a2e" />
              <rect x="330" y="277" width="3" height="4" rx="1" fill="#ffe566" opacity="0.9" />
            </g>
          </g>

          {/* ── NETWORK LINES (rooftop connections = systems thinking) ── */}
          <g className="ic-network">
            <line x1="170" y1="198" x2="220" y2="232" stroke="#3d5afe" strokeWidth="1.2" strokeDasharray="6,4" className="ic-net-line" />
            <line x1="244" y1="220" x2="322" y2="197" stroke="#00c9b1" strokeWidth="1.2" strokeDasharray="6,4" className="ic-net-line" style={{ animationDelay:"1.55s" }} />
            <line x1="348" y1="184" x2="394" y2="220" stroke="#f72585" strokeWidth="1.2" strokeDasharray="6,4" className="ic-net-line" style={{ animationDelay:"1.7s" }} />
            <line x1="108" y1="230" x2="148" y2="210" stroke="#aaeb00" strokeWidth="1.2" strokeDasharray="6,4" className="ic-net-line" style={{ animationDelay:"1.85s" }} />
            {/* dots at connection points */}
            {[
              [170,198,"#3d5afe"],[220,232,"#3d5afe"],
              [244,220,"#00c9b1"],[322,197,"#00c9b1"],
              [348,184,"#f72585"],[394,220,"#f72585"],
              [108,230,"#aaeb00"],[148,210,"#aaeb00"],
            ].map(([cx,cy,fill],i)=>(
              <circle key={i} cx={cx as number} cy={cy as number} r="3" fill={fill as string}
                className="ic-net-dot"
                style={{ animationDelay: `${1.9+i*0.06}s` }}
              />
            ))}
          </g>

          {/* ── CLOUDS ── */}
          <g className="ic-clouds">
            <g className="ic-cloud1">
              <ellipse cx="80" cy="78" rx="30" ry="15" fill="white" opacity="0.72" />
              <ellipse cx="97" cy="74" rx="22" ry="13" fill="white" opacity="0.72" />
              <ellipse cx="63" cy="76" rx="17" ry="11" fill="white" opacity="0.72" />
            </g>
            <g className="ic-cloud2">
              <ellipse cx="440" cy="58" rx="24" ry="12" fill="white" opacity="0.62" />
              <ellipse cx="456" cy="55" rx="18" ry="10" fill="white" opacity="0.62" />
              <ellipse cx="426" cy="56" rx="15" ry="9" fill="white" opacity="0.62" />
            </g>
          </g>
        </svg>

        <p className="ic-caption">five systems. one city. endlessly connected.</p>
      </div>
    </>
  );
}