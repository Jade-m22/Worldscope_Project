import "./Timeline.scss";

export default function Timeline({ year = 2024, onChange }) {
  return (
    <section className="timeline">
      <h2>🕓 Chronologie</h2>
      <div className="timeline-year">{year}</div>
      <input
        type="range"
        min={-3000}
        max={2024}
        value={year}
        onChange={e => onChange && onChange(Number(e.target.value))}
        className="timeline-slider"
      />
      <div className="timeline-labels">
        <span>-3000</span>
        <span>2024</span>
      </div>
    </section>
  );
}