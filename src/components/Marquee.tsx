const items = [
  { text: "Full-Stack Engineering", color: "#3d5afe" },
  { text: "Embedded Systems", color: "#f72585" },
  { text: "NC State · Magna Cum Laude", color: "#aaeb00" },
  { text: "RESTful APIs", color: "#00c9b1" },
  { text: "Freelance & Founder", color: "#ff7c2a" },
  { text: "Goodnight Scholar", color: "#8b5cf6" },
  { text: "Full-Stack Engineering", color: "#3d5afe" },
  { text: "Embedded Systems", color: "#f72585" },
  { text: "NC State · Magna Cum Laude", color: "#aaeb00" },
  { text: "RESTful APIs", color: "#00c9b1" },
  { text: "Freelance & Founder", color: "#ff7c2a" },
  { text: "Goodnight Scholar", color: "#8b5cf6" },
];

export default function Marquee() {
  return (
    <div className="marquee-wrap" aria-hidden="true">
      <div className="marquee-track">
        {items.map((item, i) => (
          <div key={i} className="marquee-item">
            <span
              className="marquee-dot"
              style={{ background: item.color }}
            />
            <span style={{ color: item.color }}>{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}