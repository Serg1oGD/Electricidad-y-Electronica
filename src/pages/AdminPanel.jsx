import { useState } from "react";
import GestionAvisos from './Admin/GestionAvisos';
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
    FileText,
    User,
    BookOpen,
    FlaskConical,
    Megaphone,
    Settings,
    Home,
    Book,
    LogOut,
    Users
} from 'lucide-react';
import './AdminPanel.css';
import GestionCarrera from "./Admin/GestionCarrera";
import GestionProfesores from "./Admin/GestionProfesores";
import GestionPlanEstudios from "./Admin/GestionPlanEstudios";
import GestionLaboratorios from "./Admin/GestionLaboratorios";
import Configuraciones from "./Admin/Configuraciones";

function AdminPanel() {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState('inicio');

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
        } catch (error){
            console.error('Error al cerrar sesion: ', error);
        }
    };
        return (
        <div className="admin-panel">
            {/* Sinderbar */}
            <aside className="admin-sinderbar">
                <div className="admin-header">
                    <h2>Panel de Control</h2>
                    <p className="admin-user">{currentUser?.email}</p>
                </div>

                <nav className="admin-nav">
                    <button className={`admin-nav-item ${activeSection === 'inicio' ? 'active' : ''}`}onClick={() => setActiveSection('inicio')}>
                        <Home size={20}/>
                        Inicio
                    </button>
                    <button 
                    className={`admin-nav-item ${activeSection === 'avisos' ? 'active' : ''}`}onClick={() => setActiveSection('avisos')}
                    >
                        <Megaphone size={20}/>
                        Avisos
                    </button>
                    <button className={`admin-nav-item ${activeSection === 'carrera' ? 'active' : ''}`}onClick={() => setActiveSection('carrera')}
                    >
                        <FileText size={20}/>
                        Acerca de la Carrera
                    </button>
                    <button className={`admin-nav-item ${activeSection === 'plan' ? 'active' : ''}`}onClick={() => setActiveSection('plan')}
                    >
                        <BookOpen size={20}/>
                        Plan de Estudios
                    </button>
                    <button className={`admin-nav-item ${activeSection === 'profesores' ? 'active' : ''}`}onClick={() => setActiveSection('profesores')}
                    >
                        <User size={20}/>
                        Profesores
                    </button>
                    <button className={`admin-nav-item ${activeSection === 'laboratorios' ? 'active' : ''}`}onClick={() => setActiveSection('laboratorios')}
                    >
                        <FlaskConical size={20}/>
                        Laboratorios
                    </button>
                    <button className={`admin-nav-item ${activeSection === 'configuracion' ? 'active' : ''}`}onClick={() => setActiveSection('configuracion')}
                    >
                        <Settings size={20}/>
                        Configuraciones
                    </button>
                </nav>
                    <button className="admin-logout" onClick={handleLogout}>
                        <LogOut size={20}/>
                        Cerrar Sesion
                    </button>
            </aside>

            {/* Contenido Principal */}
            <main className="admin-content">
                {activeSection === 'inicio' && (
                    <div className="admin-section">
                        <h1>Bienvenido al Panel de Administracion</h1>
                        <p>Selecciona una seccion del menu para editar la informacion</p>

                        <div className="stats-grid">
                            <div className="stat-card">
                                <Megaphone size={30} color="#3b82f6"/>
                                <h3>Avisos Activos</h3>
                                <p className="stat-number">5</p>
                            </div>
                            <div className="stat-card">
                                <Users size={30} color="#10b981"/>
                                <h3>Profesores</h3>
                                <p className="stat-number">12</p>
                            </div>
                            <div className="stat-card">
                                <FlaskConical size={30} color="#f59e0b"/>
                                <h3>Laboratorios</h3>
                                <p className="stat-number">3</p>
                            </div>
                        </div>
                    </div>
                )}
                {activeSection === 'avisos' && (
                    <div className="admin-section">
                        <h1>Gestion de Avisos</h1>
                        <p>Aqui podresa crear, editar y eliminar avisos.</p>
                        {activeSection === 'avisos' && <GestionAvisos />}
                    </div>
                )}
                {activeSection === 'carrera' && (
                    <div className="admin-section">
                        <h1>Acerca de la Carrera</h1>
                        <p>Aqui se Edita la informacion sobre el departamento</p>
                        {activeSection === 'carrera' && <GestionCarrera />}
                    </div>
                )}
                {activeSection === 'plan' && (
                    <div className="admin-section">
                        <h1>Plan de Estudio</h1>
                        <p>Actualiza el plan de estudios y material</p>
                        {activeSection === 'plan' && <GestionPlanEstudios />}
                    </div>
                )}
                {activeSection === 'profesores' && (
                    <div className="admin-section">
                        <h1>Profesores</h1>
                        <p>Gestion de los prefiles de los profesores</p>
                        {activeSection === 'profesores' && <GestionProfesores />}
                    </div>
                )}
                {activeSection === 'laboratorios' && (
                    <div className="admin-section">
                        <h1>Laboratorios</h1>
                        <p>Gestion de la informacion de los laboratorios</p>
                        {activeSection === 'laboratorios' && <GestionLaboratorios/>}
                    </div>
                )}
                {activeSection === 'configuracion' && (
                    <div className="admin-section">
                        <h1>Configuraciones</h1>
                        <p>Configuraciones generales del sito</p>
                        {activeSection === 'configuracion' && <Configuraciones/>}
                    </div>
                )}
            </main>
        </div>
    )
};

export default AdminPanel;