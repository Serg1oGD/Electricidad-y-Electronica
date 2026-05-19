import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase/config';
import { Mail, Clock } from 'lucide-react';
import './Home.css';

function Profesores() {
    const [profesores, setProfesores] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // eslint-disable-next-line no-unused-vars
        const cargarProfesores = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'profesores'));
                const profesoresData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                profesoresData.sort((a, b) => a.nombre.localeCompare(b.nombre));
                setProfesores(profesoresData);
            }catch (error) {
                console.error('Error al cargar profesores:', error);
            }
            setLoading(false);
        };
        cargarProfesores();
    }, []);
    
     if (loading) {
    return (
      <div className="home">
        <section className="content-section">
          <p>Cargando...</p>
        </section>
      </div>
    );
  }

  return (
    <div className="home">
      <section className="hero">
        <h1>Nuestros Profesores</h1>
        <p>Conoce a nuestro equipo docente</p>
      </section>

      <section className="content-section">
        {profesores.length === 0 ? (
          <p>No hay profesores registrados.</p>
        ) : (
          <div className="avisos-grid">
            {profesores.map((profesor) => (
              <div key={profesor.id} className="aviso-card" style={{ textAlign: 'left' }}>
                <h3 style={{ marginBottom: '0.5rem' }}>{profesor.nombre}</h3>
                <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '1rem' }}>
                  {profesor.grado}
                </p>
                
                <div style={{ marginBottom: '0.75rem' }}>
                  <strong style={{ color: '#1e3a8a' }}>Especialidad:</strong>
                  <p style={{ margin: '0.25rem 0 0 0' }}>{profesor.especialidad}</p>
                </div>

                {profesor.email && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <Mail size={16} color="#6b7280" />
                    <a href={`mailto:${profesor.email}`} style={{ color: '#3b82f6', textDecoration: 'none' }}>
                      {profesor.email}
                    </a>
                  </div>
                )}

                {profesor.horario && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Clock size={16} color="#6b7280" />
                    <span style={{ color: '#6b7280', fontSize: '0.9rem' }}>{profesor.horario}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Profesores;