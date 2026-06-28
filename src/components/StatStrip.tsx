import FadeIn from "./FadeIn";

const stats = [
  { num: "5+", label: "Years coding", icon: "ti-code", colorClass: "stat-num-cobalt" },
  { num: "43",  label: "Products built", icon: "ti-rocket", colorClass: "stat-num-coral" },
  { num: "15+",label: "Technologies", icon: "ti-bolt", colorClass: "stat-num-lime" },
  { num: "4.0",label: "Magna Cum Laude", icon: "ti-award", colorClass: "stat-num-pink" },
];

export default function StatStrip() {
  return (
    <div className="stat-strip">
      {stats.map((s, i) => (
        <FadeIn key={s.label} delay={i * 0.08} direction="up">
          <div className="stat-box">
            <div className={`stat-num ${s.colorClass}`}>{s.num}</div>
            <div className="stat-label">{s.label}</div>
            <i className={`ti ${s.icon} stat-icon`} aria-hidden="true" />
          </div>
        </FadeIn>
      ))}
    </div>
  );
}