import React from "react";
import { Range } from "react-range";

export default function Timeline({ min = -3000, max = 2025, range = [min, max], onChange }) {
  const STEP = 1;

  return (
    <section className="timeline" aria-label="Plage temporelle">

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