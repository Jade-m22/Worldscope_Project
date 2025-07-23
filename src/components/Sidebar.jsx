import React from "react";
import { Helmet } from "react-helmet";
import Timeline from "./Timeline";
import Filters from "./Filters";

export default function Sidebar({ range, onRangeChange }) {
  // SEO dynamique pour la barre latérale
  const pageTitle = `WorldScope — Période ${range[0]} à ${range[1]} & Filtres`;
  const pageDescription = `Sélection de la période (${range[0]}–${range[1]}) et des filtres d'affichage dans la barre latérale de WorldScope.`;

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Helmet>

      <aside className="sidebar">
        <Timeline
          min={-3000}
          max={2025}
          range={range}
          onChange={onRangeChange}
          labelMode="above"
        />
        <Filters />
      </aside>
    </>
  );
}