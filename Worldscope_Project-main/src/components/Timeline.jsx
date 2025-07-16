import React from "react";
import { Range } from "react-range";

export default function Timeline({ min = -3000, max = 2025, range = [min, max], onChange }) {
  const STEP = 1;

  return (
    <section className="timeline" aria-label="Plage temporelle">
      <AnimatedClock />

      <div className="timeline-range-values">
        <span>{range[0]}</span> — <span>{range[1]}</span>
      </div>

      <div className="timeline-slider">
        <Range
          values={range}
          step={STEP}
          min={min}
          max={max}
          onChange={onChange}
          renderTrack={({ props, children }) => {
            // Ici on extrait key (si présent) et on le passe explicitement
            const { key, ...rest } = props;
            return (
              <div key={key} {...rest} className="timeline-track">
                {children}
              </div>
            );
          }}
          renderThumb={({ props }) => {
            const { key, ...rest } = props;
            return <div key={key} {...rest} className="timeline-thumb" />;
          }}
        />
      </div>

      <div className="timeline-labels">
        <span>{min}</span>
        <span>{max}</span>
      </div>

      <button className="timeline-reset" onClick={() => onChange([min, max])}>
        🔄 Réinitialiser la période
      </button>
    </section>
  );
}

function AnimatedClock() {
  return (
    <svg className="timeline-clock" viewBox="0 0 64 64" width="42" height="42">
      <circle cx="32" cy="32" r="30" fill="#37fcd6" />
      <line x1="32" y1="32" x2="32" y2="14" stroke="#0f1b21" strokeWidth="4" strokeLinecap="round">
        <animateTransform attributeName="transform" type="rotate" from="0 32 32" to="360 32 32" dur="10s" repeatCount="indefinite" />
      </line>
    </svg>
  );
}