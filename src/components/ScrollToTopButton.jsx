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
      <span className="arrow">↑</span>
    </button>
  );
};

export default ScrollToTopButton;