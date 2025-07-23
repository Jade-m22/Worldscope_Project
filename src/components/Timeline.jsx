import React from "react";
import { Range } from "react-range";
import { Helmet } from "react-helmet";

export default function Timeline({
  min = -3000,
  max = 2025,
  range = [min, max],
  onChange,
}) {
  const STEP = 1;

  // Calcul des pourcentages pour le dégradé
  const percentMin = ((range[0] - min) / (max - min)) * 100;
  const percentMax = ((range[1] - min) / (max - min)) * 100;

  // Background dynamique
  const trackBackground = `linear-gradient(
    to right,
    #17242b 0%,
    #17242b ${percentMin}%,
    #3070e3 ${percentMin}%,
    #23edd6 ${percentMax}%,
    #17242b ${percentMax}%,
    #17242b 100%
  )`;

  // SEO dynamique
  const pageTitle = `WorldScope — Période ${range[0]} à ${range[1]}`;
  const pageDescription = `Affichage des événements de ${range[0]} à ${range[1]}.`;

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Helmet>

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
              // Ici on applique le background dynamique directement sur la track
              const { key, ...rest } = props;
              return (
                <div
                  key={key}
                  {...rest}
                  className="timeline-track"
                  style={{
                    ...props.style,
                    background: trackBackground,
                  }}
                >
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

        <button
          className="timeline-reset"
          onClick={() => onChange([min, max])}
          type="button"
        >
          🔄 Réinitialiser la période
        </button>
      </section>
    </>
  );
}