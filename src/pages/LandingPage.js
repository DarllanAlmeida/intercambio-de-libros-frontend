import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
  return (
    <div className="landing-container">
      <div className="landing-info">
        <h1>📚 Intercambio de Libros</h1>
        <p>Administra, busca y comparte libros de forma sencilla.</p>
        <ul>
          <li>Organiza tu colección</li>
          <li>Solicita intercambios</li>
          <li>Conecta con otros lectores</li>
        </ul>
      </div>

      <div className="landing-auth">
        <div className="landing-buttons">
          <Link to="/login">
            <button>Iniciar Sesión</button>
          </Link>
          <Link to="/register">
            <button>Registrarse</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;