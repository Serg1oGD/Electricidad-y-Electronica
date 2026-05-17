import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase/config';
import { Calendar } from "lucide-react";
import './Home.css';

function Avisos() {
    const [avisos, setAvisos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const cargarAvisos = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'avisos'));
                const avisosData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                avisosData.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
                setAvisos(avisosData);
            }catch (error) {
                console.error('Error al cargar avisos:', error);
            }
            setLoading(false);
        };
        cargarAvisos();
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
        <h1>Avisos y Noticias</h1>
        <p>Mantente informado</p>
      </section>

      <section className="content-section">
        {avisos.length === 0 ? (
          <p>No hay avisos publicados.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {avisos.map((aviso) => (
              <div key={aviso.id} className="aviso-card" style={{ textAlign: 'left' }}>
                <h3 style={{ marginBottom: '0.75rem' }}>{aviso.titulo}</h3>
                <p style={{ marginBottom: '1rem', lineHeight: 1.6 }}>{aviso.contenido}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6b7280', fontSize: '0.9rem' }}>
                  <Calendar size={16} />
                  <span>{new Date(aviso.fecha).toLocaleDateString('es-MX', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Avisos;