import React from 'react';
import logo from '../assets/VERT_worldscope.webp';

export default function Header({ search, setSearch }) {
  return (
    <header className="header">
      <div className="header-left">
        <a href="/" className="logo-link">
          <img src={logo} alt="WorldScope Logo" className="logo" />
        </a>
      </div>
      <div className="header-right">
        <input
          type="text"
          placeholder="Rechercher un lieu, monument..."
          className="search-input"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
    </header>
  );
}