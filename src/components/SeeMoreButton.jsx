import React from "react";
import { Helmet } from "react-helmet";
import "../styles/components/SeeMoreButton.scss";

// Icône SVG par défaut (remplace le "+")
const DefaultPlusIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="see-more-svg"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

export default function SeeMoreButton({
  onClick,
  text = "Voir",
  icon = DefaultPlusIcon,
  className = "",
  style = {},
  size = "medium",
}) {
  // SEO statique pour ce bouton
  const pageTitle = "WorldScope — Bouton Voir plus";
  const pageDescription =
    "Bouton permettant d'afficher plus de détails sur un élément dans WorldScope.";

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Helmet>
      <button
        className={`see-more-btn ${size} ${className}`}
        onClick={(e) => {
          e.stopPropagation();
          onClick?.(e);
        }}
        style={style}
        type="button"
      >
        <span className="text">{text}</span>
        <span className="icon">{icon}</span>
      </button>
    </>
  );
}