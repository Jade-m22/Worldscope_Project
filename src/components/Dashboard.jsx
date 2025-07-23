import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import GlobeDashboard from "./GlobeDashboard";
import "../styles/components/dashboard.scss";

export default function Dashboard() {
  const navigate = useNavigate();

  // état et restauration de la préférence dyslexie
  const [dyslexiaEnabled, setDyslexiaEnabled] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("dyslexia") === "on") {
      document.body.classList.add("dyslexia");
      setDyslexiaEnabled(true);
    }
  }, []);

  // fonction pour basculer OpenDyslexic
  const toggleDyslexia = () => {
    const on = !dyslexiaEnabled;
    setDyslexiaEnabled(on);
    document.body.classList.toggle("dyslexia", on);
    localStorage.setItem("dyslexia", on ? "on" : "off");
  };

  // SEO statique pour la page d'accueil
  const pageTitle = "WorldScope - Accueil";
  const pageDescription =
    "Bienvenue sur WorldScope : explorez l'actualite mondiale via une vision planetaïre interactive et decouvrez des lieux historiques, monuments, conflits et merveilles naturelles.";

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Helmet>

      <div className="dashboard-bg">
        <header className="dashboard-header">
          <div className="dashboard-header-left">
            <img
              src="/VERT_worldscope.webp"
              alt="WorldScope logo"
              className="dashboard-logo"
            />
            <div className="dashboard-title-zone">
              <h1>
                Bienvenue sur <span>WorldScope</span>
              </h1>
              <p className="dashboard-slogan">
                Explorez l'actualite mondiale
                <br />
                via une vision planetaïre interactive
              </p>
            </div>
          </div>

          <div className="dashboard-header-right">
            <button
              type="button"
              className="quiz-button"
              onClick={toggleDyslexia}
            >
              {dyslexiaEnabled ? "Desactiver OpenDys" : "Activer OpenDys"}
            </button>
          </div>
        </header>

        <main className="dashboard-content">
          <section className="dashboard-globe">
            <div className="dashboard-globe-wrap">
              <GlobeDashboard />
              <button
                type="button"
                className="dashboard-globe-btn"
                onClick={() => navigate("/app")}
              >
                Explorer la carte interactive
              </button>
            </div>
          </section>

          <section className="dashboard-info">
            <h2>Qu'allez-vous explorer aujourd'hui ?</h2>
            <ul>
              <li>
                <b>Explorer la carte interactive</b> : naviguez sur une carte
                du monde, cliquez sur les points pour tout savoir sur les{" "}
                <span style={{ color: "#45ffd6" }}>sites historiques</span>,{" "}
                <span style={{ color: "#ffae6f" }}>monuments celebres</span>,{" "}
                <span style={{ color: "#ff5b6b" }}>conflits</span>, zones a{" "}
                <span style={{ color: "#ffe65e" }}>eviter</span> et merveilles
                naturelles.
              </li>
              <li>
                <b>Filtrage ultra-flexible</b> : affinez la vue par{" "}
                <span style={{ color: "#42ffb6" }}>categorie</span>,{" "}
                <span style={{ color: "#48aaff" }}>statut</span>,{" "}
                <span style={{ color: "#ffc800" }}>annee</span> ou faites une{" "}
                <span style={{ color: "#aef9ff" }}>recherche instantanee</span>{" "}
                sur tout : lieu, monument, pays, evenement…
              </li>
              <li>
                <b>Detail enrichi</b> : accedez a des fiches completes, images,
                anecdotes, sources Wikipedia, cartes, coordonnees et plus encore
                pour chaque point.
              </li>
              <li>
                <b>Mode Globe 3D</b> : changez de perspective pour une vision
                planetaïre en 3D{" "}
                <span role="img" aria-label="globe">
                  🌐
                </span>
                .
              </li>
              <li>
                <b>Navigation fluide</b> : passez facilement de la vue carte a
                la vue globe, de l'accueil a l'exploration en 1 clic.
              </li>
              <li>
                <b>Accessibilite</b> : interface responsive, recherche en temps
                reel, experience optimisee sur tous supports.
              </li>
              <li>
                <b>Design unique</b> : ambiance neo-futuriste et couleurs
                relaxantes pour decouvrir le monde… sans frontieres.
              </li>
              <li>
                <b>Mises a jour a venir</b> : ajout de nouveaux lieux, stats,
                donnees live, classements, contributions des utilisateurs !
              </li>
            </ul>
          </section>
        </main>

        <footer className="dashboard-footer">
          <small>WorldScope © 2025 - Tous droits reserves.</small>
        </footer>
      </div>
    </>
  );
}