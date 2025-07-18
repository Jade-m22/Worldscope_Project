import React, { useState, useEffect } from "react";
// import "./ScrollToTopButton.scss"; // <-- SUPPRIMER ou COMMENTER

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Plus fiable, car parfois le scroll est sur documentElement, parfois sur body
      const y = Math.max(
        window.pageYOffset,
        document.documentElement.scrollTop,
        document.body.scrollTop,
        (document.getElementById("main-content")?.scrollTop || 0)
      );
      setVisible(y > 200);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("scroll", onScroll, { passive: true });
    // Ajoute sur le container scrollable s’il existe
    const mainDiv = document.getElementById("main-content");
    if (mainDiv) mainDiv.addEventListener("scroll", onScroll, { passive: true });

    // Test visibilité au montage
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("scroll", onScroll);
      if (mainDiv) mainDiv.removeEventListener("scroll", onScroll);
    };
  }, []);

  const scrollToTop = () => {
    // On tente sur tous les scroll containers possibles !
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.body.scrollTo({ top: 0, behavior: "smooth" });
    document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
    const mainDiv = document.getElementById("main-content");
    if (mainDiv) mainDiv.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      className={`scroll-to-top-btn${visible ? "" : " hidden"}`}
      onClick={scrollToTop}
      aria-label="Remonter en haut"
      tabIndex={visible ? 0 : -1}
    >
      <span className="arrow">↑</span>
    </button>
  );
};

export default ScrollToTopButton;
