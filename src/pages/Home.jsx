import { useState, useEffect } from 'react';
import { collection, getDocs, limit, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';
import './Home.css';

function Home() {
  const [avisos, setAvisos] = useState([]);

  useEffect(() => {
    const cargarAvisos = async () => {
      try {
        const q = query(
          collection(db, 'avisos'),
          orderBy('fecha', 'desc'),
          limit(3)
        );
        const querySnapshot = await getDocs(q);
        const avisosData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setAvisos(avisosData);
      } catch (error) {
        console.error('Error al cargar avisos:', error);
      }
    };

    cargarAvisos();
  }, []);

  return (
    <div className="home">
      <section className="hero">
        <h1>Bienvenido a Ingeniería Eléctrica y Electrónica</h1>
        <p>Formando profesionales de excelencia en el área de electricidad y electrónica</p>
      </section>

      <section className="content-section about-section">
        <h2>Acerca del Departamento</h2>
        <p>
          El departamento de Ingeniería Eléctrica y Electrónica del TecNM Campus Reynosa
          se dedica a la formación integral de profesionales capacitados para enfrentar
          los retos tecnológicos del sector eléctrico y electrónico.
        </p>
      </section>

      <section className="content-section">
        <h2>Últimos Avisos</h2>
        {avisos.length === 0 ? (
          <p>No hay avisos disponibles.</p>
        ) : (
          <div className="avisos-grid">
            {avisos.map((aviso) => (
              <div key={aviso.id} className="aviso-card">
                <h3>{aviso.titulo}</h3>
                <p>{aviso.contenido}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;