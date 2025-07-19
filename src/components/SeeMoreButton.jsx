import React from "react";
import "../styles/components/SeeMoreButton.scss"

export default function SeeMoreButton({
  onClick,
  text = "Voir",
  icon = "+",
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