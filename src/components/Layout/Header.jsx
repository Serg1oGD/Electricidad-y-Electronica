import { useState } from "react";
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './Header.css';

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="header">
            <div className="header-conteiner">
                <div className="logo-section">
                    <img src="/logo_tec.png" alt="TecNM" className="logo" />
                    <div className="title-section">
                        <h1>Ingenería de Elétricidad y Elctrónica</h1>
                        <p>TecNM Campus Reynosa</p>
                    </div>
                </div>

                <button className="menu-toggle" onClick={toggleMenu}>
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                <nav className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
                    <Link to="/" onClick={() => setIsMenuOpen(false)}>Inicio</Link>
                    <Link to="/carrera" onClick={() => setIsMenuOpen(false)}>Acerca de la Carrera</Link>
                    <Link to="/plan-estucios" onClick={() => setIsMenuOpen(false)}>Plan de Estudios</Link>
                    <Link to="/profesores" onClick={() => setIsMenuOpen(false)}>Profesores</Link>
                    <Link to="/laboratorios" onClick={() => setIsMenuOpen(false)}>Laboratios</Link>
                    <Link to="/avisos" onClick={() => setIsMenuOpen(false)}>Avisos</Link>
                    <Link to="/contactos" onClick={() => setIsMenuOpen(false)}>Contastos</Link>
                </nav>
            </div>
        </header>
    );
}

export default Header;