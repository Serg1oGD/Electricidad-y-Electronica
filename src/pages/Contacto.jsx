import { useState, useEffect } from "react";
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram} from 'lucide-react';
import './Home.css';

function Contacto() {
    const [datos, setDatos] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const docRef = doc(db, 'configuracion', 'general');
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setDatos(docSnap.data());
                }
            }catch (error){
                console.error('Error al cargar datos:', error);
            }
            setLoading(false);
        };
        cargarDatos();
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
        <h1>Contacto</h1>
        <p>Estamos aquí para ayudarte</p>
      </section>

      <section className="content-section">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {/* Información de Contacto */}
          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '12px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
          }}>
            <h2 style={{ color: '#1e3a8a', marginBottom: '1.5rem' }}>Información de Contacto</h2>
            
            {datos?.telefono && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1.5rem',
                padding: '1rem',
                background: '#f9fafb',
                borderRadius: '8px'
              }}>
                <Phone size={24} color="#3b82f6" />
                <div>
                  <strong style={{ display: 'block', color: '#1e3a8a', marginBottom: '0.25rem' }}>
                    Teléfono
                  </strong>
                  <a href={`tel:${datos.telefono}`} style={{ color: '#374151', textDecoration: 'none' }}>
                    {datos.telefono}
                  </a>
                </div>
              </div>
            )}

            {datos?.email && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1.5rem',
                padding: '1rem',
                background: '#f9fafb',
                borderRadius: '8px'
              }}>
                <Mail size={24} color="#3b82f6" />
                <div>
                  <strong style={{ display: 'block', color: '#1e3a8a', marginBottom: '0.25rem' }}>
                    Correo Electrónico
                  </strong>
                  <a href={`mailto:${datos.email}`} style={{ color: '#374151', textDecoration: 'none' }}>
                    {datos.email}
                  </a>
                </div>
              </div>
            )}

            {datos?.direccion && (
              <div style={{
                display: 'flex',
                alignItems: 'start',
                gap: '1rem',
                padding: '1rem',
                background: '#f9fafb',
                borderRadius: '8px'
              }}>
                <MapPin size={24} color="#3b82f6" style={{ marginTop: '0.25rem' }} />
                <div>
                  <strong style={{ display: 'block', color: '#1e3a8a', marginBottom: '0.25rem' }}>
                    Dirección
                  </strong>
                  <p style={{ margin: 0, color: '#374151', lineHeight: 1.6 }}>
                    {datos.direccion}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Redes Sociales */}
          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '12px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
          }}>
            <h2 style={{ color: '#1e3a8a', marginBottom: '1.5rem' }}>Síguenos en Redes Sociales</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {datos?.facebook && (
                <a 
                  href={datos.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1rem',
                    background: '#f9fafb',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    color: '#374151',
                    transition: 'background 0.3s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.background = '#e5e7eb'}
                  onMouseOut={(e) => e.currentTarget.style.background = '#f9fafb'}
                >
                  <Facebook size={24} color="#1877f2" />
                  <span style={{ fontWeight: 500 }}>Facebook</span>
                </a>
              )}

              {datos?.twitter && (
                <a 
                  href={datos.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1rem',
                    background: '#f9fafb',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    color: '#374151',
                    transition: 'background 0.3s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.background = '#e5e7eb'}
                  onMouseOut={(e) => e.currentTarget.style.background = '#f9fafb'}
                >
                  <Twitter size={24} color="#1da1f2" />
                  <span style={{ fontWeight: 500 }}>Twitter</span>
                </a>
              )}

              {datos?.instagram && (
                <a 
                  href={datos.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1rem',
                    background: '#f9fafb',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    color: '#374151',
                    transition: 'background 0.3s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.background = '#e5e7eb'}
                  onMouseOut={(e) => e.currentTarget.style.background = '#f9fafb'}
                >
                  <Instagram size={24} color="#e4405f" />
                  <span style={{ fontWeight: 500 }}>Instagram</span>
                </a>
              )}

              {!datos?.facebook && !datos?.twitter && !datos?.instagram && (
                <p style={{ color: '#6b7280', textAlign: 'center' }}>
                  No hay redes sociales configuradas.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Información del Departamento */}
        {datos?.nombreDepartamento && (
          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '12px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            marginTop: '2rem',
            textAlign: 'center'
          }}>
            <h2 style={{ color: '#1e3a8a', marginBottom: '0.5rem' }}>
              {datos.nombreDepartamento}
            </h2>
            {datos.institucion && (
              <p style={{ color: '#6b7280', margin: 0 }}>
                {datos.institucion}
              </p>
            )}
          </div>
        )}
      </section>
    </div>
  );
}

export default Contacto;