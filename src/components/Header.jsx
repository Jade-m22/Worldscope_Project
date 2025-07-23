import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import logo from '../assets/VERT_worldscope.webp';

export default function Header({ search, setSearch }) {
  // SEO dynamique basé sur la recherche
  const pageTitle = search
    ? `Rechercher "${search}" — WorldScope`
    : 'WorldScope — Explorateur d’événements';
  const pageDescription = search
    ? `Affichage des résultats pour "${search}" sur WorldScope.`
    : 'WorldScope : explorez des lieux, monuments et événements historiques sur une carte interactive ou un globe 3D.';

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Helmet>

      <header className="header">
        <div className="header-left">
          <Link to="/" className="logo-link">
            <img src={logo} alt="WorldScope Logo" className="logo" />
          </Link>
        </div>

        <div className="header-right">
          <input
            type="text"
            placeholder="Rechercher un lieu, monument..."
            className="search-input"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

          <Link to="/quiz">
            <button className="quiz-button">Quiz</button>
          </Link>
        </div>
      </header>
    </>
  );
}