import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogIn, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './Header.css';

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const handleLogout = async () => {
        try {
            await logout();
            setIsMenuOpen(false);
            navigate('/');
        } catch (err) {
            console.error('Error al cerrar sesion:', err);
        }
    };

    return (
        <header className="header">
            <div className="header-conteiner">
                <div className="logo-section">
                    <img src="/tec_.png" alt="TecNM" className="logo" />
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
                    <Link to="/plan-estudios" onClick={() => setIsMenuOpen(false)}>Plan de Estudios</Link>
                    <Link to="/profesores" onClick={() => setIsMenuOpen(false)}>Profesores</Link>
                    <Link to="/laboratorios" onClick={() => setIsMenuOpen(false)}>Laboratios</Link>
                    <Link to="/avisos" onClick={() => setIsMenuOpen(false)}>Avisos</Link>
                    <Link to="/contacto" onClick={() => setIsMenuOpen(false)}>Contastos</Link>

                    {currentUser ? (
                        <>
                            <Link 
                            to="/admin"
                            onClick={() => setIsMenuOpen(false)}
                            className="admin-btn"
                            >
                            <Settings size={18} />
                                Admin
                            </Link>
                            <button onClick={handleLogout} className="logout-btn">
                                <LogOut size={18} />
                                    Cerrar Sesion
                            </button>
                        </>
                    ) : (
                        <Link to="/login" onClick={() => setIsMenuOpen(false)} className="login-link">
                            <LogIn size={18} />
                                Maestros
                        </Link>
                    )}
                </nav>
            </div>
        </header>
    );
}

export default Header;