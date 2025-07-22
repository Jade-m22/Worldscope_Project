import React, { useState, useEffect } from "react";

const getScrollTop = () =>
  window.pageYOffset ||
  document.documentElement.scrollTop ||
  document.body.scrollTop ||
  0;

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(getScrollTop() > 180);
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    // Double sécurité sur mobiles récalcitrants :
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 80);
  };

  return (
    <button
      className={`scroll-to-top-btn${visible ? "" : " hidden"}`}
      onClick={scrollToTop}
      aria-label="Remonter en haut"
      tabIndex={visible ? 0 : -1}
      type="button"
    >
      {/* Utilisation d'un SVG pour un centrage parfait */}
      <span className="arrow" aria-hidden="true">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none"
          style={{ display: "block", margin: "auto" }}
          xmlns="http://www.w3.org/2000/svg">
          <path d="M14 20V8M14 8L8 14M14 8L20 14" stroke="#003a32" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </span>
    </button>
  );
};

export default ScrollToTopButton;