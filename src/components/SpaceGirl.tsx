"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ── shared keyframe styles injected once ── */
const STYLES = `
@keyframes sg-float1{0%,100%{transform:translateY(0) rotate(-1.5deg)}50%{transform:translateY(-14px) rotate(1.5deg)}}
@keyframes sg-float2{0%,100%{transform:translateY(0) rotate(1deg)}50%{transform:translateY(-12px) rotate(-2deg)}}
@keyframes sg-float3{0%,100%{transform:translateY(0) rotate(-1deg)}50%{transform:translateY(-10px) rotate(2.5deg)}}
@keyframes sg-blink{0%,88%,100%{transform:scaleY(1)}94%{transform:scaleY(0.08)}}
@keyframes sg-wave{0%,100%{transform:rotate(-12deg)}40%{transform:rotate(24deg)}}
@keyframes sg-sparkle{0%,100%{opacity:0;transform:scale(0.3) rotate(0deg)}50%{opacity:1;transform:scale(1) rotate(180deg)}}
@keyframes sg-orbit{from{transform:rotate(0deg) translateX(56px) rotate(0deg)}to{transform:rotate(360deg) translateX(56px) rotate(-360deg)}}
@keyframes sg-orbit2{from{transform:rotate(180deg) translateX(48px) rotate(-180deg)}to{transform:rotate(540deg) translateX(48px) rotate(-540deg)}}
@keyframes sg-glow{0%,100%{box-shadow:0 0 8px rgba(61,90,254,0.4)}50%{box-shadow:0 0 20px rgba(61,90,254,0.8),0 0 40px rgba(0,201,177,0.3)}}
@keyframes sg-glow2{0%,100%{box-shadow:0 0 8px rgba(247,37,133,0.4)}50%{box-shadow:0 0 20px rgba(247,37,133,0.8),0 0 40px rgba(139,92,246,0.3)}}
@keyframes sg-pop{0%{transform:scale(1)}50%{transform:scale(1.1)}100%{transform:scale(1)}}
@keyframes sg-cursor{0%,100%{opacity:1}50%{opacity:0}}
@keyframes sg-codepop{0%{opacity:0.5}50%{opacity:1}100%{opacity:0.5}}
@keyframes sg-conf{0%,100%{opacity:0;transform:scale(0.4)}50%{opacity:1;transform:scale(1)}}
@keyframes sg-steam{0%,100%{transform:translateY(0) rotate(-5deg);opacity:0.5}50%{transform:translateY(-6px) rotate(5deg);opacity:0.9}}
@keyframes sg-bigwave{0%,100%{transform:rotate(-45deg)}40%{transform:rotate(-10deg)}}

.sg-wrap{display:flex;flex-direction:column;align-items:center;gap:0}
.sg-scene{position:relative;display:flex;flex-direction:column;align-items:center}

/* helmet */
.sg-helmet{position:absolute;border-radius:50%;background:linear-gradient(145deg,#e8e0ff,#c4b8f5 45%,#9d8de0);box-shadow:inset -10px -8px 20px rgba(0,0,0,0.22),0 0 0 3px #7b6cc4}
.sg-visor{position:absolute;border-radius:50%}
.sg-vshine{position:absolute;border-radius:50%;background:rgba(255,255,255,0.5);transform:rotate(-20deg)}
.sg-eye{position:absolute;border-radius:50%;background:#fff;animation:sg-blink 4.5s ease-in-out infinite}
.sg-eye::after{content:'';position:absolute;border-radius:50%;background:#1a0d6b}
.sg-smile{position:absolute;border-bottom:3px solid rgba(255,255,255,0.82);border-radius:0 0 50% 50%}
.sg-stripe{position:absolute;border-radius:3px}

/* body */
.sg-body{position:absolute;background:linear-gradient(180deg,#e8e0ff,#d4c9f5);box-shadow:inset -6px 0 14px rgba(0,0,0,0.12),0 0 0 2.5px #a899e0}
.sg-chest{position:absolute;border-radius:7px}
.sg-cb{position:absolute;border-radius:50%}
.sg-arm{position:absolute;background:linear-gradient(180deg,#d4c9f5,#b8aae0);box-shadow:0 0 0 2px #a899e0}
.sg-glove{position:absolute;bottom:-3px;left:50%;transform:translateX(-50%);border-radius:50%}
.sg-leg{position:absolute;bottom:0;background:linear-gradient(180deg,#d4c9f5,#b8aae0);box-shadow:0 0 0 2px #a899e0}
.sg-boot{position:absolute;bottom:-3px;left:50%;transform:translateX(-50%);border-radius:6px}
.sg-pack{position:absolute;background:linear-gradient(180deg,#c4b8f5,#a899e0);box-shadow:0 0 0 2px #8b7fd0}

/* sparkles */
.sg-sp{position:absolute;animation:sg-sparkle 2.5s ease-in-out infinite;color:#8b5cf6;pointer-events:none}

/* orbit */
.sg-oc{position:absolute;width:0;height:0}
.sg-os{position:absolute}

/* divider strip */
.sg-divider{border-top:1px solid rgba(13,13,26,0.07);border-bottom:1px solid rgba(13,13,26,0.07);padding:2.5rem 2rem;display:flex;align-items:flex-end;justify-content:center;gap:0;background:#fafaff;overflow:hidden;position:relative}
.sg-label{font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:#9895b0;font-weight:700;margin-top:1rem;font-family:'Space Grotesk',sans-serif}

/* scene 2 — laptop */
.sg-laptop{display:flex;flex-direction:column;align-items:center;position:absolute}
.sg-screen{background:#0d0d1a;border-radius:7px 7px 0 0;border:2.5px solid #3d3d5a;position:relative;overflow:hidden}
.sg-screenglow{position:absolute;inset:0;background:radial-gradient(ellipse at 50% 30%,rgba(61,90,254,0.18),transparent 70%)}
.sg-codeline{height:5px;border-radius:3px;margin:5px 7px 0;animation:sg-codepop 2s ease-in-out infinite}
.sg-codecursor{position:absolute;bottom:8px;left:14px;width:2.5px;height:9px;background:#fff;animation:sg-cursor 0.8s step-end infinite;border-radius:1px}
.sg-lbase{background:linear-gradient(180deg,#2d2d4a,#1a1a2e);border-radius:0 0 5px 5px;border:2px solid #3d3d5a}
.sg-lfoot{background:#1a1a2e;border-radius:0 0 4px 4px;margin:0 auto}
.sg-coffee{position:absolute}
.sg-mug{background:#ff7c2a;border-radius:4px 4px 6px 6px;position:relative}
.sg-mug::after{content:'';position:absolute;right:-6px;top:3px;width:7px;height:10px;border:2.5px solid #ff7c2a;border-radius:0 5px 5px 0}
.sg-steam{position:absolute;top:-10px;left:4px;font-size:9px;animation:sg-steam 1.5s ease-in-out infinite;opacity:0.8}

/* scene 3 — bubble + confetti */
.sg-bubble{position:absolute;background:#fff;border-radius:14px 14px 14px 4px;padding:6px 11px;font-size:11px;font-weight:700;color:#f72585;white-space:nowrap;box-shadow:0 4px 14px rgba(0,0,0,0.1);animation:sg-pop 3s ease-in-out infinite;font-family:'Space Grotesk',sans-serif}
.sg-conf{position:absolute;width:7px;height:7px;border-radius:50%;animation:sg-conf 2s ease-in-out infinite}
`;

// ─── SCENE 1: Floating / Hero ───────────────────────────────────────────
function Scene1() {
  return (
    <div style={{ width: 150, height: 190, position: "relative" }}>
      <div style={{ animation: "sg-float1 3.8s ease-in-out infinite", position: "absolute", inset: 0 }}>
        {/* sparkles */}
        {[
          { top: -8, right: 18, delay: "0s", content: "✦" },
          { top: 24, right: -12, delay: "0.9s", content: "✧" },
          { top: -4, left: 14, delay: "1.5s", content: "⋆" },
          { bottom: 70, left: -8, delay: "0.4s", content: "✦" },
        ].map((s, i) => (
          <span key={i} className="sg-sp" style={{ ...s, animationDelay: s.delay, fontSize: 13 }}>{s.content}</span>
        ))}
        {/* orbiting moon */}
        <div className="sg-oc" style={{ top: 46, left: 78 }}>
          <div className="sg-os" style={{ animation: "sg-orbit 6s linear infinite", fontSize: 13, top: -7, left: -7 }}>🌙</div>
        </div>
        {/* helmet */}
        <div className="sg-helmet" style={{ left: 24, top: 0, width: 100, height: 100, boxShadow: "inset -10px -8px 20px rgba(0,0,0,0.22),0 0 0 3px #7b6cc4,0 0 28px rgba(139,92,246,0.35)" }}>
          <div className="sg-visor" style={{ left: 17, top: 17, width: 66, height: 50, background: "linear-gradient(135deg,rgba(61,90,254,0.92),rgba(0,201,177,0.7) 60%,rgba(247,37,133,0.4))", boxShadow: "inset 4px 4px 10px rgba(255,255,255,0.28)" }}>
            <div className="sg-vshine" style={{ left: 9, top: 7, width: 17, height: 10 }} />
            <div className="sg-eye" style={{ top: 11, left: 11, width: 9, height: 9 }}>
              <div style={{ position:"absolute", top:2, left:2, width:5, height:5, borderRadius:"50%", background:"#1a0d6b" }} />
            </div>
            <div className="sg-eye" style={{ top: 11, right: 11, width: 9, height: 9, animationDelay:"0.3s" }}>
              <div style={{ position:"absolute", top:2, left:2, width:5, height:5, borderRadius:"50%", background:"#1a0d6b" }} />
            </div>
            <div className="sg-smile" style={{ bottom: 11, left: 14, width: 18, height: 9 }} />
          </div>
          <div className="sg-stripe" style={{ bottom: 13, left: "50%", transform: "translateX(-50%)", width: 55, height: 5, background: "rgba(255,63,91,0.75)" }} />
        </div>
        {/* body */}
        <div className="sg-body" style={{ left: 32, top: 90, width: 86, height: 74, borderRadius: "18px 18px 22px 22px" }}>
          <div className="sg-pack" style={{ right: -12, top: 6, width: 16, height: 34, borderRadius: 5 }} />
          {/* left arm */}
          <div className="sg-arm" style={{ left: -15, top: 8, width: 19, height: 54, borderRadius: 9, transform: "rotate(10deg)", transformOrigin: "top center" }}>
            <div className="sg-glove" style={{ width: 16, height: 12, background: "linear-gradient(135deg,#3d5afe,#8b5cf6)" }} />
          </div>
          {/* right arm — waving */}
          <div className="sg-arm" style={{ right: -15, top: 8, width: 19, height: 54, borderRadius: 9, transform: "rotate(-10deg)", transformOrigin: "top center", animation: "sg-wave 3.2s ease-in-out infinite 0.8s" }}>
            <div className="sg-glove" style={{ width: 16, height: 12, background: "linear-gradient(135deg,#3d5afe,#8b5cf6)" }} />
          </div>
          {/* chest */}
          <div className="sg-chest" style={{ left: 19, top: 10, width: 48, height: 28, background: "linear-gradient(135deg,#3d5afe,#00c9b1)", animation: "sg-glow 3s ease-in-out infinite" }}>
            {[{ bg: "#ff3f5b", l: 5 }, { bg: "#aaeb00", l: 19 }, { bg: "#f72585", l: 33 }].map((b, i) => (
              <div key={i} className="sg-cb" style={{ top: 7, left: b.l, width: 7, height: 7, background: b.bg, boxShadow: `0 0 5px ${b.bg}` }} />
            ))}
          </div>
          {/* legs */}
          <div style={{ position: "absolute", bottom: -38, left: "50%", transform: "translateX(-50%)", width: 60, height: 40 }}>
            <div className="sg-leg" style={{ left: 3, width: 21, height: 36, borderRadius: "10px 10px 12px 12px" }}>
              <div className="sg-boot" style={{ width: 25, height: 11, background: "linear-gradient(135deg,#3d5afe,#8b5cf6)" }} />
            </div>
            <div className="sg-leg" style={{ right: 3, width: 21, height: 36, borderRadius: "10px 10px 12px 12px" }}>
              <div className="sg-boot" style={{ width: 25, height: 11, background: "linear-gradient(135deg,#3d5afe,#8b5cf6)" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── SCENE 2: At the Laptop ─────────────────────────────────────────────
function Scene2() {
  const codeLines = [
    { w: "70%", bg: "rgba(61,90,254,0.7)", delay: "0s" },
    { w: "50%", bg: "rgba(0,201,177,0.6)", delay: "0.3s" },
    { w: "80%", bg: "rgba(255,255,255,0.1)", delay: "0.6s" },
    { w: "40%", bg: "rgba(247,37,133,0.6)", delay: "0.9s" },
    { w: "60%", bg: "rgba(170,235,0,0.5)", delay: "1.2s" },
  ];

  return (
    <div style={{ width: 220, height: 210, position: "relative" }}>
      {/* character */}
      <div style={{ animation: "sg-float2 4.2s ease-in-out infinite", position: "absolute", left: 48, top: 0, width: 116, height: 190 }}>
        <div className="sg-helmet" style={{ left: 14, top: 0, width: 88, height: 88, boxShadow: "inset -8px -6px 18px rgba(0,0,0,0.22),0 0 0 2.5px #7b6cc4,0 0 22px rgba(139,92,246,0.3)" }}>
          <div className="sg-visor" style={{ left: 13, top: 14, width: 62, height: 48, background: "linear-gradient(135deg,rgba(61,90,254,0.92),rgba(0,201,177,0.7) 60%,rgba(247,37,133,0.35))", boxShadow: "inset 3px 3px 8px rgba(255,255,255,0.25)" }}>
            <div className="sg-vshine" style={{ left: 8, top: 6, width: 14, height: 8 }} />
            {/* slightly squinted focused eyes */}
            <div className="sg-eye" style={{ top: 12, left: 9, width: 8, height: 6 }}>
              <div style={{ position:"absolute", top:1, left:1, width:5, height:4, borderRadius:"50%", background:"#1a0d6b" }} />
            </div>
            <div className="sg-eye" style={{ top: 12, right: 9, width: 8, height: 6, animationDelay:"0.4s" }}>
              <div style={{ position:"absolute", top:1, left:1, width:5, height:4, borderRadius:"50%", background:"#1a0d6b" }} />
            </div>
            <div className="sg-smile" style={{ bottom: 10, left: 12, width: 14, height: 7 }} />
          </div>
          <div className="sg-stripe" style={{ bottom: 11, left: "50%", transform: "translateX(-50%)", width: 50, height: 4, background: "rgba(255,63,91,0.75)" }} />
        </div>
        <div className="sg-body" style={{ left: 26, top: 78, width: 76, height: 68, borderRadius: "16px 16px 20px 20px" }}>
          {/* arms reaching forward */}
          <div className="sg-arm" style={{ left: -13, top: 6, width: 18, height: 52, borderRadius: 9, transform: "rotate(32deg)", transformOrigin: "top center" }}>
            <div className="sg-glove" style={{ width: 15, height: 11, background: "linear-gradient(135deg,#3d5afe,#8b5cf6)" }} />
          </div>
          <div className="sg-arm" style={{ right: -13, top: 6, width: 18, height: 52, borderRadius: 9, transform: "rotate(-32deg)", transformOrigin: "top center" }}>
            <div className="sg-glove" style={{ width: 15, height: 11, background: "linear-gradient(135deg,#3d5afe,#8b5cf6)" }} />
          </div>
          <div className="sg-chest" style={{ left: 15, top: 8, width: 46, height: 28, background: "linear-gradient(135deg,#3d5afe,#00c9b1)", animation: "sg-glow 3s ease-in-out infinite" }}>
            {[{ bg: "#ff3f5b", l: 5 }, { bg: "#aaeb00", l: 18 }, { bg: "#f72585", l: 31 }].map((b, i) => (
              <div key={i} className="sg-cb" style={{ top: 6, left: b.l, width: 6, height: 6, background: b.bg, boxShadow: `0 0 4px ${b.bg}` }} />
            ))}
          </div>
          <div style={{ position: "absolute", bottom: -36, left: "50%", transform: "translateX(-50%)", width: 56, height: 38 }}>
            <div className="sg-leg" style={{ left: 3, width: 20, height: 34, borderRadius: "10px 10px 12px 12px" }}>
              <div className="sg-boot" style={{ width: 24, height: 11, background: "linear-gradient(135deg,#3d5afe,#8b5cf6)" }} />
            </div>
            <div className="sg-leg" style={{ right: 3, width: 20, height: 34, borderRadius: "10px 10px 12px 12px" }}>
              <div className="sg-boot" style={{ width: 24, height: 11, background: "linear-gradient(135deg,#3d5afe,#8b5cf6)" }} />
            </div>
          </div>
        </div>
      </div>
      {/* laptop */}
      <div className="sg-laptop" style={{ bottom: 0, left: 0, right: 0 }}>
        <div className="sg-screen" style={{ width: 160, height: 86 }}>
          <div className="sg-screenglow" />
          {codeLines.map((l, i) => (
            <div key={i} className="sg-codeline" style={{ width: l.w, background: l.bg, animationDelay: l.delay }} />
          ))}
          <div className="sg-codecursor" />
        </div>
        <div className="sg-lbase" style={{ width: 176, height: 9 }} />
        <div className="sg-lfoot" style={{ width: 110, height: 4 }} />
      </div>
      {/* coffee */}
      <div className="sg-coffee" style={{ right: 6, bottom: 14 }}>
        <div className="sg-steam">〰️</div>
        <div className="sg-mug" style={{ width: 22, height: 20 }} />
      </div>
    </div>
  );
}

// ─── SCENE 3: Waving / Contact ──────────────────────────────────────────
function Scene3() {
  const confetti = [
    { bg: "#ff3f5b", top: 10, right: 22, delay: "0s" },
    { bg: "#aaeb00", top: 42, right: 6, delay: "0.5s" },
    { bg: "#3d5afe", top: 6, left: 22, delay: "1s" },
    { bg: "#f72585", bottom: 82, right: 8, delay: "0.7s" },
    { bg: "#00c9b1", bottom: 92, left: 10, delay: "1.3s" },
  ];

  return (
    <div style={{ width: 170, height: 210, position: "relative" }}>
      <div className="sg-bubble" style={{ top: -8, right: -24 }}>let&apos;s talk! 👋</div>
      {confetti.map((c, i) => (
        <div key={i} className="sg-conf" style={{ background: c.bg, top: c.top, right: c.right, left: c.left, bottom: c.bottom, animationDelay: c.delay }} />
      ))}
      {/* dual orbit */}
      <div className="sg-oc" style={{ top: 44, left: 76 }}>
        <div className="sg-os" style={{ animation: "sg-orbit 5s linear infinite", fontSize: 12, top: -6, left: -6 }}>⭐</div>
        <div className="sg-os" style={{ animation: "sg-orbit2 7s linear infinite", fontSize: 10, top: -5, left: -5 }}>💫</div>
      </div>
      <div style={{ animation: "sg-float3 3.5s ease-in-out infinite", position: "absolute", left: 10, top: 0 }}>
        {/* helmet — pink/violet visor */}
        <div className="sg-helmet" style={{ left: 20, top: 0, width: 100, height: 100, boxShadow: "inset -10px -8px 20px rgba(0,0,0,0.22),0 0 0 3px #7b6cc4,0 0 28px rgba(247,37,133,0.4)" }}>
          <div className="sg-visor" style={{ left: 16, top: 16, width: 66, height: 50, background: "linear-gradient(135deg,rgba(247,37,133,0.85),rgba(139,92,246,0.7) 50%,rgba(61,90,254,0.5))", boxShadow: "inset 4px 4px 10px rgba(255,255,255,0.28)" }}>
            <div className="sg-vshine" style={{ left: 10, top: 8, width: 16, height: 9 }} />
            {/* big happy eyes */}
            <div className="sg-eye" style={{ top: 11, left: 10, width: 10, height: 10 }}>
              <div style={{ position:"absolute", top:2, left:2, width:6, height:6, borderRadius:"50%", background:"#1a0d6b" }} />
            </div>
            <div className="sg-eye" style={{ top: 11, right: 10, width: 10, height: 10, animationDelay:"0.2s" }}>
              <div style={{ position:"absolute", top:2, left:2, width:6, height:6, borderRadius:"50%", background:"#1a0d6b" }} />
            </div>
            {/* big smile */}
            <div className="sg-smile" style={{ bottom: 9, left: 12, width: 22, height: 11 }} />
          </div>
          {/* lime stripe */}
          <div className="sg-stripe" style={{ bottom: 13, left: "50%", transform: "translateX(-50%)", width: 54, height: 5, background: "rgba(170,235,0,0.85)" }} />
        </div>
        {/* body */}
        <div className="sg-body" style={{ left: 30, top: 88, width: 84, height: 72, borderRadius: "18px 18px 22px 22px" }}>
          <div className="sg-arm" style={{ left: -15, top: 8, width: 20, height: 56, borderRadius: 10, transform: "rotate(14deg)", transformOrigin: "top center" }}>
            <div className="sg-glove" style={{ width: 17, height: 13, background: "linear-gradient(135deg,#f72585,#8b5cf6)" }} />
          </div>
          {/* big wave arm */}
          <div className="sg-arm" style={{ right: -15, top: 2, width: 20, height: 56, borderRadius: 10, transform: "rotate(-45deg)", transformOrigin: "top center", animation: "sg-bigwave 1.8s ease-in-out infinite" }}>
            <div className="sg-glove" style={{ width: 17, height: 13, background: "linear-gradient(135deg,#f72585,#8b5cf6)" }} />
          </div>
          {/* chest — pink/violet */}
          <div className="sg-chest" style={{ left: 18, top: 10, width: 48, height: 30, background: "linear-gradient(135deg,#f72585,#8b5cf6)", animation: "sg-glow2 2.5s ease-in-out infinite" }}>
            {[{ bg: "#aaeb00", l: 5 }, { bg: "#00c9b1", l: 19 }, { bg: "#ff7c2a", l: 33 }].map((b, i) => (
              <div key={i} className="sg-cb" style={{ top: 7, left: b.l, width: 7, height: 7, background: b.bg, boxShadow: `0 0 5px ${b.bg}` }} />
            ))}
          </div>
          <div style={{ position: "absolute", bottom: -40, left: "50%", transform: "translateX(-50%)", width: 62, height: 42 }}>
            <div className="sg-leg" style={{ left: 3, width: 22, height: 38, borderRadius: "11px 11px 13px 13px" }}>
              <div className="sg-boot" style={{ width: 26, height: 12, background: "linear-gradient(135deg,#f72585,#8b5cf6)" }} />
            </div>
            <div className="sg-leg" style={{ right: 3, width: 22, height: 38, borderRadius: "11px 11px 13px 13px" }}>
              <div className="sg-boot" style={{ width: 26, height: 12, background: "linear-gradient(135deg,#f72585,#8b5cf6)" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── DIVIDER WRAPPER ────────────────────────────────────────────────────
interface SpaceGirlProps {
  scene: 1 | 2 | 3;
}

export default function SpaceGirl({ scene }: SpaceGirlProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <>
      <style>{STYLES}</style>
      <div
        ref={ref}
        className="sg-divider"
        aria-hidden="true"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {scene === 1 && <Scene1 />}
          {scene === 2 && <Scene2 />}
          {scene === 3 && <Scene3 />}
        </motion.div>
      </div>
    </>
  );
}