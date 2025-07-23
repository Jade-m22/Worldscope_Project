import React from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import GlobeDashboard from "./GlobeDashboard";

export default function Dashboard() {
  const navigate = useNavigate();

  // SEO statique pour la page d'accueil
  const pageTitle = "WorldScope — Accueil";
  const pageDescription =
    "Bienvenue sur WorldScope : explorez l'actualité mondiale via une vision planétaire interactive et découvrez des lieux historiques, monuments, conflits et merveilles naturelles.";

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Helmet>

      <div className="dashboard-bg">
        <header className="dashboard-header">
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
              Explorez l'actualité mondiale
              <br />
              via une vision planétaire interactive
            </p>
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
                <b>Explorer la carte interactive</b> : Naviguez sur une carte du
                monde, cliquez sur les points pour tout savoir sur les{" "}
                <span style={{ color: "#45ffd6" }}>sites historiques</span>,{" "}
                <span style={{ color: "#ffae6f" }}>monuments célèbres</span>,{" "}
                <span style={{ color: "#ff5b6b" }}>conflits</span>, zones à{" "}
                <span style={{ color: "#ffe65e" }}>éviter</span> et merveilles
                naturelles.
              </li>
              <li>
                <b>Filtrage ultra-flexible</b> : Affinez la vue par{" "}
                <span style={{ color: "#42ffb6" }}>catégorie</span>,{" "}
                <span style={{ color: "#48aaff" }}>statut</span>,{" "}
                <span style={{ color: "#ffc800" }}>année</span> ou faites une{" "}
                <span style={{ color: "#aef9ff" }}>recherche instantanée</span>{" "}
                sur tout : lieu, monument, pays, événement…
              </li>
              <li>
                <b>Détail enrichi</b> : Accédez à des fiches complètes, images,
                anecdotes, sources Wikipédia, cartes, coordonnées et plus encore
                pour chaque point.
              </li>
              <li>
                <b>Mode Globe 3D</b> : Changez de perspective pour une vision
                planétaire en 3D <span role="img" aria-label="globe">🌐</span>.
              </li>
              <li>
                <b>Navigation fluide</b> : Passez facilement de la vue carte à
                la vue globe, de l'accueil à l'exploration en 1 clic.
              </li>
              <li>
                <b>Accessibilité</b> : Interface responsive, recherche en temps
                réel, expérience optimisée sur tous supports.
              </li>
              <li>
                <b>Design unique</b> inspiré des explorateurs modernes,
                ambiance néo-futuriste et couleurs relaxantes pour découvrir le
                monde… sans frontières.
              </li>
              <li>
                <b>Mises à jour à venir</b> : Ajout de nouveaux lieux, stats,
                données live, classements, et pourquoi pas :{" "}
                <span style={{ color: "#a0c2ff" }}>contributions des utilisateurs</span> !
              </li>
            </ul>
          </section>
        </main>

        <footer className="dashboard-footer">
          <small>WorldScope © 2025 — Tous droits réservés.</small>
        </footer>
      </div>
    </>
  );
}