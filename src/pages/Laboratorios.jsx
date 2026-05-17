import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import { MapPin, Clock, User } from 'lucide-react';
import './Home.css';

function Laboratorios() {
    const [laboratorios, setLaboratorios] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const cargarLaboratorios = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'laboratorios'));
                const laboratoriosData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                laboratoriosData.sort((a, b) => a.nombre.localeCompare(b.nombre));
                setLaboratorios(laboratoriosData);
            }catch (error) {
                console.error('Error al cargar laboratorios:', error);
            }
            setLoading(false);
        };
        cargarLaboratorios();
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
        <h1>Laboratorios</h1>
        <p>Instalaciones y equipamiento</p>
      </section>

      <section className="content-section">
        {laboratorios.length === 0 ? (
          <p>No hay laboratorios registrados.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {laboratorios.map((lab) => (
              <div key={lab.id} style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '12px',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
              }}>
                <div style={{ marginBottom: '1rem' }}>
                  <h3 style={{ color: '#1e3a8a', marginBottom: '0.5rem' }}>{lab.nombre}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6b7280' }}>
                    <MapPin size={16} />
                    <span>{lab.ubicacion}</span>
                  </div>
                </div>

                <p style={{ marginBottom: '1.5rem', lineHeight: 1.6 }}>{lab.descripcion}</p>

                <div style={{
                  background: '#f9fafb',
                  padding: '1.5rem',
                  borderRadius: '8px',
                  marginBottom: '1.5rem'
                }}>
                  <h4 style={{ color: '#1e3a8a', marginBottom: '0.75rem' }}>Equipamiento:</h4>
                  <p style={{ margin: 0, whiteSpace: 'pre-line' }}>{lab.equipamiento}</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  {lab.horario && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Clock size={18} color="#3b82f6" />
                      <div>
                        <strong style={{ display: 'block', color: '#1e3a8a', fontSize: '0.9rem' }}>Horario:</strong>
                        <span style={{ color: '#6b7280' }}>{lab.horario}</span>
                      </div>
                    </div>
                  )}
                  
                  {lab.encargado && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <User size={18} color="#3b82f6" />
                      <div>
                        <strong style={{ display: 'block', color: '#1e3a8a', fontSize: '0.9rem' }}>Encargado:</strong>
                        <span style={{ color: '#6b7280' }}>{lab.encargado}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Laboratorios;