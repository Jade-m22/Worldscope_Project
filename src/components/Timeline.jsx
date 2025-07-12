import React from 'react';

export default function Timeline({ min = -3000, max = 2025, year, onChange }) {
  // Sécurité : year ne sera jamais null/undefined, fallback sur min
  const value = (typeof year === "number" && !isNaN(year)) ? year : min;

  return (
    <section className="timeline">
      <h3>🕓 Chronologie</h3>
      <div className="timeline-year">{value}</div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        step="1"
        className="timeline-slider"
      />
      <div className="timeline-labels">
        <span style={{ marginRight: 10 }}>{min}</span>
        <span style={{ marginLeft: 10 }}>{max}</span>
      </div>
    </section>
  );
}