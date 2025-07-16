// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/VERT_worldscope.webp';

export default function Header({ search, setSearch }) {
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
      </div>
    </header>
  );
}
