import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../stilos/Header.css';
import { FaBars, FaTimes } from 'react-icons/fa';

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="header">
      <div className="logo">cirbnb</div>
      
      {/* Menú para desktop */}
      <div className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <Link to="/alojamientos">Alojamientos</Link>
        <Link to="/experiencias">Experiencias</Link>
        <Link to="/host">Pon tu espacio en Airbnb</Link>
      </div>

      {/* Botón de autenticación */}
      <nav className="nav-auth">
        <Link to="/registro" className="nav-button">Inicia Sesión</Link>
      </nav>

      {/* Botón de menú móvil */}
      <button className="mobile-menu-button" onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </button>
    </header>
  );
}

export default Header;