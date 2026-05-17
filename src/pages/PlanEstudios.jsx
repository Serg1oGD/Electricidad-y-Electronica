import { useState, useEffect } from "react";
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { BookOpen, Award } from 'lucide-react';
import './Home.css';

function PlanEstudios() {
    const [datos, setDatos] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const docRef = doc(db, 'configuracion', 'planEstudios');
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()){
                    setDatos(docSnap.data());
                }
            }catch (error) {
                console.error('Error al cargar datos:', error);
            }
            setLoading(false);
        };
        cargarDatos();
    }, []);

    const materiasPorSemestre = (semestre) => {
        if (!datos || !datos.materias) return [];
        return datos.materias.filter(m => m.semestre === semestre.toString());
    };

    if (loading) {
    return (
      <div className="home">
        <section className="content-section">
          <p>Cargando...</p>
        </section>
      </div>
    );
  }

  if (!datos) {
    return (
      <div className="home">
        <section className="hero">
          <h1>Plan de Estudios</h1>
        </section>
        <section className="content-section">
          <p>Información no disponible.</p>
        </section>
      </div>
    );
  }

  return (
    <div className="home">
      <section className="hero">
        <h1>Plan de Estudios</h1>
        <p>Ingeniería Eléctrica y Electrónica</p>
      </section>

      <section className="content-section">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem'
        }}>
          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            textAlign: 'center'
          }}>
            <BookOpen size={40} color="#3b82f6" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ color: '#1e3a8a', marginBottom: '0.5rem' }}>Duración</h3>
            <p style={{ margin: 0, fontSize: '1.1rem' }}>{datos.duracion || 'N/A'}</p>
          </div>

          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            textAlign: 'center'
          }}>
            <Award size={40} color="#3b82f6" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ color: '#1e3a8a', marginBottom: '0.5rem' }}>Créditos</h3>
            <p style={{ margin: 0, fontSize: '1.1rem' }}>{datos.creditos || 'N/A'}</p>
          </div>

          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#1e3a8a', marginBottom: '0.5rem' }}>Modalidad</h3>
            <p style={{ margin: 0, fontSize: '1.1rem' }}>{datos.modalidad || 'N/A'}</p>
          </div>
        </div>

        {datos.descripcion && (
          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '12px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            marginBottom: '3rem'
          }}>
            <h2 style={{ color: '#1e3a8a', marginBottom: '1rem' }}>Descripción</h2>
            <p style={{ lineHeight: 1.6 }}>{datos.descripcion}</p>
          </div>
        )}

        <h2 style={{ color: '#1e3a8a', marginBottom: '2rem', textAlign: 'center' }}>
          Retícula por Semestre
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(semestre => {
            const materias = materiasPorSemestre(semestre);
            if (materias.length === 0) return null;
            
            return (
              <div key={semestre} style={{
                background: 'white',
                padding: '1.5rem',
                borderRadius: '12px',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                border: '2px solid #e5e7eb'
              }}>
                <h3 style={{
                  color: '#1e3a8a',
                  marginBottom: '1rem',
                  paddingBottom: '0.75rem',
                  borderBottom: '2px solid #3b82f6'
                }}>
                  {semestre}° Semestre
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {materias.map((materia, index) => (
                    <div key={index} style={{
                      padding: '0.75rem',
                      background: '#f9fafb',
                      borderRadius: '6px',
                      borderLeft: '3px solid #3b82f6'
                    }}>
                      <p style={{ margin: 0, fontWeight: 500, color: '#374151' }}>
                        {materia.nombre}
                      </p>
                      <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem', color: '#6b7280' }}>
                        {materia.creditos} créditos
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {datos.materias && datos.materias.length === 0 && (
          <p style={{ textAlign: 'center', color: '#6b7280' }}>
            No hay materias registradas en el plan de estudios.
          </p>
        )}
      </section>
    </div>
  );
}

export default PlanEstudios;