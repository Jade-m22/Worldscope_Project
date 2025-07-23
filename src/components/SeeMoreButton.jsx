import React from "react";
import "../styles/components/SeeMoreButton.scss";

const DefaultPlusIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="see-more-svg">
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
  return (
    <button
      className={`see-more-btn ${size} ${className}`}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(e);
      }}
      style={style}
    >
      <span className="text">{text}</span>
      <span className="icon">{icon}</span>
    </button>
  );
}