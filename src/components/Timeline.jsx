import "./Timeline.scss";

export default function Timeline({ min=-3000, max=2025, year, onChange }) {
  return (
    <section className="timeline">
      <h3>🕓 Chronologie</h3>
      <input
        type="range"
        min={min}
        max={max}
        value={year}
        onChange={e => onChange(Number(e.target.value))}
        step="1"
      />
      <div className="timeline-year">{year}</div>
    </section>
  );
}