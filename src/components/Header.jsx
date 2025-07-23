import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/VERT_worldscope.webp';

export default function Header({ search, setSearch }) {
  // ↳ état et restauration de la préférence dyslexie
  const [dyslexiaEnabled, setDyslexiaEnabled] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('dyslexia') === 'on') {
      document.body.classList.add('dyslexia');
      setDyslexiaEnabled(true);
    }
  }, []);

  // ↳ fonction pour basculer OpenDyslexic
  const toggleDyslexia = () => {
    const on = !dyslexiaEnabled;
    setDyslexiaEnabled(on);
    document.body.classList.toggle('dyslexia', on);
    localStorage.setItem('dyslexia', on ? 'on' : 'off');
  };

  return (
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

        {/* Bouton toggle OpenDys */}
        <button onClick={toggleDyslexia} className="dyslexia-button">
          {dyslexiaEnabled ? 'Désactiver OpenDys' : 'Activer OpenDys'}
        </button>
      </div>
    </header>
  );
}
